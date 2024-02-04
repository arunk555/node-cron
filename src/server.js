import app from "./app.js";
import mdbconnet from "./utils/mdbconnect.js";

const port = 4000;
app.listen(port, function () {
  mdbconnet();
  console.log(`listening on port ${port}`);
});
