const Field=require('../models/Field');
const Farmer = require('../models/Farmer');

// create new Field
exports.createField = async (req, res) => {
 try {

    const { name, farmerId, coordinates, area } = req.body;

     // Validate farmer exists and belongs to the user
  const farmer = await Farmer.findOne({
    _id: farmerId,
    enrolledBy: req.user.id
  });
  if (!farmer) {
    res.status(404);
    throw new Error('Farmer not found');
  }
   if (!coordinates || coordinates.length < 3) {
    res.status(400);
    throw new Error('A field must have at least 3 coordinates');
  }

  const field = await Field.create({
    name,
    farmer: farmerId,
    coordinates,
    area,
    createdBy: req.user.id
  });
// Fetch the newly created field with farmer name populated
const populatedField = await Field.findById(field._id).populate({
  path: 'farmer',
  select: 'name' // Only get farmer's name
});
  res.status(201).json(populatedField);
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// get fields for a farmer
exports.getFieldsByFarmer = async (req, res) => {
  try {

 console.log('Requested farmerId:', req.params.farmerId);
    console.log('Current user id:', req.user.id);
    console.log('User id type:', typeof req.user.id);

      const farmer = await Farmer.findOne({
    _id: req.params.farmerId,
    enrolledBy: req.user.id
  });

  if (!farmer) {
    res.status(404);
    throw new Error('Farmer not found');
  }

   const fields = await Field.find({ farmer: req.params.farmerId })
    .select('-__v')
    .populate('farmer', 'name phone');

  res.json(fields);
   
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// get all fields 
exports.getAllFields = async (req, res) => {
  try {
     // Get all fields created by the current user
    const fields = await Field.find({ createdBy: req.user.id })
      .select('name coordinates farmer createdAt')
      .populate('farmer', 'name phone village');

  // Format the data for map display
    const fieldsForMap = fields.map(field => ({
      id: field._id,
      name: field.name,
      coordinates: field.coordinates,
      farmer: field.farmer,
      area: field.area,
      createdAt: field.createdAt
    }));


      res.status(200).json({
      success: true,
      count: fields.length,
      data: fieldsForMap
    });
  }  
  catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false, 
      message: 'Server Error',
      error: err.message 
    });
  }
};