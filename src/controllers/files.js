import File from "../models/files.model";

export async function uploadfile(req, res) {
  let options = {
    filename: "../../package.json",
    contentType: "application/json",
  };
  File.writeFile();
}
