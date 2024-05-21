"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_BASE_URL = void 0;
const header_1 = require("./components/header");
const button_1 = require("./components/button");
require("./pages/bienvenidos.ts");
require("./pages/chat.ts");
require("./pages/signup.ts");
require("./router");
exports.API_BASE_URL = process.env.ENVIRONMENT == "DEV"
    ? "http://localhost:3000"
    : "https://chatroom-xi4g.onrender.com";
(function () {
    (0, button_1.initButtonComp)();
    (0, header_1.initHeaderComp)();
})();
