"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@vaadin/router");
const router = new router_1.Router(document.querySelector(".root"));
router.setRoutes([
    { path: "/", component: "home-page" },
    { path: "/chat", component: "chat-page" },
    { path: "/signup", component: "signup-page" },
    { path: "(.*)", redirect: "/" },
]);
