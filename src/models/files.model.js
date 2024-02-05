import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import path from "path";

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const FileSchema = new Schema({
  length: Number,
  chunkSize: Number,
  uploadedDate: Date,
  filename: String,
  contentType: String,
});

FileSchema.static("writeFile", function (options, streamBuffer) {
  return new Promise((resolve, reject) => {
    const bucket = new GridFSBucket(mongoose.connection.db, {
      bucketName: "files",
    });
    console.log(options.filename);
    const writeStream = bucket.openUploadStream(options.filename, {
      chunkSizeBytes: 261120,
      metadata: options,
      contentType: options.contentType,
    });
    const res = streamBuffer.pipe(writeStream);

    const extension = path.extname(options.filename).slice(1);
    const filename = options.filename.slice(0, extension.length + 1);

    writeStream.on("finish", () => {
      resolve({
        _id: res.id.toString(),
        file: {
          filename: filename,
          extension: extension,
        },
      });
    });
    writeStream.on("error", (err) => {
      reject(err);
    });
  });
});

FileSchema.static("readFile", function (fileId) {
  if (typeof fileId === "string") {
    fileId = new ObjectId(fileId);
  }
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });
  return bucket.openDownloadStream(fileId);
});

FileSchema.static("deleteFile", function (fileId) {
  if (typeof fileId === "string") {
    fileId = new ObjectId(fileId);
  }
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });
  return bucket.delete(fileId);
});

FileSchema.static("findFile", async function (fileId) {
  if (typeof fileId === "string") {
    fileId = new ObjectId(fileId);
  }
  const bucket = new GridFSBucket(mongoose.connection.db, {
    bucketName: "files",
  });
  const cursor = bucket.find(
    {
      _id: fileId,
    },
    { limit: 1 }
  );
  return cursor.next();
});

const File = mongoose.model("File", FileSchema, "files.files");
export default File;
