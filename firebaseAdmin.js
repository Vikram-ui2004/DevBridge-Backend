// firebaseAdmin.js
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      type: process.env.FB_TYPE,
      projectId: process.env.FB_PROJECT_ID,
      privateKey: process.env.FB_PRIVATE_KEY.replace(/\\n/g, "\n"),
      clientEmail: process.env.FB_CLIENT_EMAIL,
      clientId: process.env.FB_CLIENT_ID,
      authUri: process.env.FB_AUTH_URI,
      tokenUri: process.env.FB_TOKEN_URI,
      authProviderX509CertUrl: process.env.FB_AUTH_PROVIDER_X509_CERT_URL,
      clientC509CertUrl: process.env.FB_CLIENT_X509_CERT_URL,
    }),
  });
}


export const adminDB = admin.firestore();
