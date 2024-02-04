import cron from "node-cron";
console.log(
  "Schdule start: " 
);
cron.schedule("* * * * *", function () {
  console.log(
    "Schdule completed: " + Date.now() + " -- " + new Date().toLocaleString()
  );
});
