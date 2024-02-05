import express from "express";
import streamBuffers from "stream-buffers";
import File from "./models/files.model.js";
import path from "path";
import fs from "fs";

const app = express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.get("/api/delete/:id", async function (req, res) {
  let result;
  try {
    await File.deleteFile(req.params.id);
    res.statusCode = 200;
    result = "success";
  } catch (error) {
    console.log("ERR =>" + error);
    res.statusCode = 500;
    result = error;
  }
  res.send(result);
});
app.get("/api/upload/", async function (req, res) {
  var origname = "./package.json";
  let myReadableStreamBuffer = fs.createReadStream("./package.json");
  let options = {
    filename: origname,
    contentType: "application/json",
  };
  let result;
  try {
    const file = File.writeFile(options, myReadableStreamBuffer);
    result = "success";
    res.statusCode = 201;
  } catch (error) {
    console.log("ERR =>" + error);
    res.statusCode = 500;
    result = error;
  }

  res.send(result);
});

app.get("/api/health/", function (req, res) {
  res.status(200).json({
    status: true,
    statusText: "application running successfully!",
    url: req.url,
  });
});

export default app;
