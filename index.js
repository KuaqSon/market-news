require("dotenv").config();

const { alertMarketNews } = require("./utils/alertMarketNews");

const CronJob = require("cron").CronJob;

const main = () => {
  const job = new CronJob(
    "0 8 * * *",
    function () {
      alertMarketNews();
    },
    null,
    true,
    process.env.TIME_ZONE
  );
  job.start();
  console.log(`Start cron job for alert market news to telegram at 8:00 AM every day`);
};

main();
