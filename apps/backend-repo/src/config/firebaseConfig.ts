import { cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import * as admin from "firebase-admin";

const serviceAccount = require("../../firebase-service-account.json");

admin.initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

export { db };
