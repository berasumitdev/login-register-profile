// cronJob.js
const cron = require("cron");
const https = require("https");

const job = new cron.CronJob("* * * * *", function () {
  const url = process.env.API_URL;

  if (!url) {
    console.error("API_URL not set in environment variables.");
    return;
  }

  https
    .get(url, (res) => {
      if (res.statusCode === 200)
        console.log("GET request sent successfully");
      else
        console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) =>
      console.error("Error while sending request", e)
    );
});

module.exports = job;
