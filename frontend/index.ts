import { initHeaderComp } from "./components/header";
import { initButtonComp } from "./components/button";
import "./pages/bienvenidos.ts";
import "./pages/chat.ts";
import "./pages/signup.ts";
import "./router";

export const API_BASE_URL = "http://localhost:3000";

(function () {
  initButtonComp();
  initHeaderComp();
})();
