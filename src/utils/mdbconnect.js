import mongoose from "mongoose";
const MONGODB_URL =
  "mongodb+srv://lifestyle:mjTZcpVZRzVVe0rj@cluster0.owoytrq.mongodb.net/buket";

const mdbconnet = async function () {
  try {
    await mongoose.connect(MONGODB_URL, {
      useUnifiedTopology: true,
    });
  } catch (error) {
    console.error(`Unable to connect: Error: ${error.name} - ${error.message}`);
    process.exit(1);
  }
};
mongoose.connection.on("connecting", function () {
  console.log("connecting to MongoDB...");
});
mongoose.connection.on("connected", function () {
  console.log(`Mongoose default connection opened:`);
});

mongoose.connection.on("error", function (err) {
  console.error(`Mongoose default connection error: ${err}`);
  mongoose.disconnect();
});
mongoose.connection.once("open", function () {
  console.log("MongoDB connection opened!");
});
mongoose.connection.on("reconnected", function () {
  console.log("MongoDB reconnected!");
});
mongoose.connection.on("disconnected", function () {
  console.error(`Mongoose default connection disconnected!`);
});

// If the Node process ends, close the Mongoose connection
process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log(
      "Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

export default mdbconnet;
