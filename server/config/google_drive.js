import { google } from "googleapis";
import multer from "multer";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import sizeOf from "image-size";
import { listFiles } from "./checkStorage.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const upload = multer({ dest: "uploads/"})

const KEY = path.join(__dirname, 'cred.json')

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY,
    scopes: ['https://www.googleapis.com/auth/drive.file']
  });

  const authClient = await auth.getClient();

  return authClient;
}

async function uploadFile(auth, filePath) {
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: path.basename(filePath),
  };

  const media = {
    // mimeType accepts all type of images
    mimeType: 'image/*',
    body: fs.createReadStream(filePath),
  }

  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id, webViewLink',
  })

  await drive.permissions.create({
    fileId: res.data.id,
    requestBody: {
      role: 'reader',
      type: 'anyone',
    }
  })

  console.log(res.data)

  const dimensions = sizeOf(filePath);
  // return the webViewLink to display the image
  return {
    data: res.data,
    height: dimensions.height,
    width: dimensions.width,
  }
}

// delete main_image and content_images from google drive when a post is deleted
export const deleteFile = async (auth, fileId) => {
  const drive = google.drive({ version: 'v3', auth });

  await drive.files.delete({
    fileId,
  })

  console.log(`File with id ${fileId} deleted`)
  await listFiles();
}

export { authorize, uploadFile, upload }