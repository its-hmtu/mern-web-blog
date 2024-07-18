import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable, deleteObject } from "firebase/storage";
import path from "path";
import { fileURLToPath } from 'url';
import fs from "fs";
import sizeOf from "image-size";
import multer from "multer";

initializeApp(firebaseConfig);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const upload = multer({ dest: "uploads/" })

const storage = getStorage();

export const uploadFile = async (filePath) => {
  return new Promise((resolve, reject) => {
    const file = fs.readFileSync(filePath);
    const storageRef = ref(storage, `images/${path.basename(filePath)}`);
    const metadata = {
      contentType: 'image/*',
    };

    const uploadTask = uploadBytesResumable(storageRef, file, metadata);

    uploadTask.on('state_changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
      }, 
      (error) => {
        console.log(error);
        reject(error);
      }, 
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          resolve(downloadURL); // Resolve the promise with the download URL
        });
      }
    );
  });
}

// delete file from firebase storage base on the download url
export const deleteFileByUrl = async (downloadUrl) => {
  try {
    // Example URL: https://firebasestorage.googleapis.com/v0/b/mern-blog-1dda8.appspot.com/o/images%2F34d0e532fbe01cc144f749612748607a?alt=media&token=4fb6363b-b93b-42ad-a480-ed1f7beffc94

    // Extract the relevant parts from the download URL
    const baseUrl = "https://firebasestorage.googleapis.com/v0/b/";
    const [bucket, fullPath] = downloadUrl.replace(baseUrl, "").split("/o/");
    const filePath = decodeURIComponent(fullPath.split("?alt=media")[0]);

    // Create a reference to the file to delete
    const fileRef = ref(storage, filePath);

    // Delete the file
    await deleteObject(fileRef);
    console.log("File deleted successfully.");
  } catch (error) {
    console.error("Error deleting file:", error);
  }
};
