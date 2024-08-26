import dotenv from 'dotenv'

dotenv.config();

const config = {
  port: parseInt(process.env.PORT || '8080', 10),
  firebase: {
    projectId: process.env.FIREBASE_PROJECT_ID || 'your-project-id',
    privateKey: process.env.FIREBASE_PRIVATE_KEY || '-----BEGIN PRIVATE KEY-----\nYourPrivateKey\n-----END PRIVATE KEY-----\n',
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL || 'your-client-email',
  },
};

export default config