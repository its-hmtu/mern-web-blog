import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./firebase.config.js";
import { getStorage, ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
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
