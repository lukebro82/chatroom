import { initHeaderComp } from "./components/header";
import { initButtonComp } from "./components/button";
import "./pages/bienvenidos.ts";
import "./pages/chat.ts";
import "./pages/signup.ts";
import "./router";

export const API_BASE_URL =
  process.env.ENVIRONMENT == "DEV"
    ? "http://localhost:3000"
    : "https://chatroom-m2pt.onrender.com";

(function () {
  initButtonComp();
  initHeaderComp();
})();
