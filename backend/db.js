"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = exports.firestore = void 0;
const admin = require("firebase-admin");
const serviceAccount = process.env.ENVIRONMENT == "DEV"
    ? require("./key.json")
    : require("/etc/secrets/key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://m6-firebase-default-rtdb.firebaseio.com",
});
const firestore = admin.firestore();
exports.firestore = firestore;
const rtdb = admin.database();
exports.rtdb = rtdb;
