import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your service account key file
const KEY_PATH = path.join(__dirname, 'cred.json');

// Authorize with the service account
async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_PATH,
    scopes: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
  });
  const authClient = await auth.getClient();
  return authClient;
}

// Check Google Drive storage usage
async function checkStorage() {
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  // Get storage quota information
  const response = await drive.about.get({ fields: 'storageQuota' });
  const quota = response.data.storageQuota;

  console.log('Storage Quota:');
  console.log(`  Limit: ${quota.limit}`);
  console.log(`  Usage: ${quota.usage}`);
  console.log(`  Usage In Drive: ${quota.usageInDrive}`);
  console.log(`  Usage In Drive Trash: ${quota.usageInDriveTrash}`);
}

checkStorage().catch(console.error);

async function listFiles() {
  const auth = await authorize();
  const drive = google.drive({ version: 'v3', auth });

  // Retrieve list of files
  const response = await drive.files.list({
    pageSize: 10, // Adjust the page size as needed
    fields: 'files(id, name)',
  });

  const files = response.data.files;

  if (files.length === 0) {
    console.log('No files found.');
  } else {
    console.log('Files:');
    files.map((file) => {
      console.log(`- ${file.name} (${file.id})`);
    });
  }
}

listFiles().catch(console.error);

export { checkStorage, listFiles };
