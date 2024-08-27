import * as admin from 'firebase-admin';
import config from '../config'
import { initializeApp } from "firebase/app";

const serviceAccount: admin.ServiceAccount = {
  projectId: config.firebase.projectId,
  privateKey: config.firebase.privateKey,
  clientEmail: config.firebase.clientEmail
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

export default admin;