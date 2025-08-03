const Farmer=require('../models/Farmer');


// Register a new farmer
exports.registerFarmer = async (req, res) => {
  try {

    const { name, phone, village } = req.body;
    const farmerExists = await Farmer.findOne({ phone });
  if (farmerExists) {
    res.status(400);
    throw new Error('Farmer already exists');
  }


  const farmer = await Farmer.create({
    name,
    phone,
    village,
    enrolledBy: req.user.id
  });

res.status(201).json({
      _id: farmer._id,
      name: farmer.name,
      phone: farmer.phone,
      village: farmer.village,
      enrolledBy: farmer.enrolledBy
    });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// get all farmers
exports.getFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({ enrolledBy: req.user.id })
    .select('-__v')
    .populate('enrolledBy', 'name email');

      res.status(200).json(farmers);
  }catch(err){
 console.error(err);
    res.status(500).json({ success: false, message: 'Server Error' });
  }};