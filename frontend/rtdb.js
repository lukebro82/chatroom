"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rtdb = void 0;
const firebase_1 = require("firebase");
const app = firebase_1.default.initializeApp({
    apiKey: "AIzaSyBvVclzjrwR7rknBBtmmjOck9fVQdu-g48",
    authDomain: "m6-firebase.firebaseapp.com",
    databaseURL: "https://m6-firebase-default-rtdb.firebaseio.com",
});
const rtdb = firebase_1.default.database();
exports.rtdb = rtdb;
