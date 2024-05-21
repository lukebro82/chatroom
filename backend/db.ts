import * as admin from "firebase-admin";

const serviceAccount =
  process.env.ENVIRONMENT == "DEV"
    ? require("./key.json")
    : require("/etc/secrets/key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as any),
  databaseURL: "https://m6-firebase-default-rtdb.firebaseio.com",
});

const firestore = admin.firestore();
const rtdb = admin.database();

export { firestore, rtdb };
