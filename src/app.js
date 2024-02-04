import express from "express";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/api/health/", function (req, res) {
  res
    .status(200)
    .json({
      status: true,
      statusText: "application running successfully!",
      url: req.url,
    });
});

export default app;
