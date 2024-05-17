"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = void 0;
const router_1 = require("@vaadin/router");
const state_1 = require("../state");
const sweetalert2_1 = require("sweetalert2");
class SignUp extends HTMLElement {
    connectedCallback() {
        this.render();
        const volverButton = this.querySelector(".form-volver");
        volverButton.addEventListener("click", () => {
            router_1.Router.go("/");
        });
        const formSignUp = this.querySelector(".form-signup");
        formSignUp.addEventListener("submit", (e) => {
            e.preventDefault();
            state_1.state
                .signUp(e.target["email"].value, e.target["nombre"].value)
                .then((data) => {
                if (data.message) {
                    sweetalert2_1.default.fire({
                        icon: "error",
                        title: "El usuario ya existe!",
                        confirmButtonColor: "#9CBBE9",
                    });
                }
                else {
                    sweetalert2_1.default.fire({
                        title: "Se creo el usuario!",
                        icon: "success",
                        confirmButtonColor: "#9CBBE9",
                    });
                    router_1.Router.go("/");
                }
            });
        });
    }
    render() {
        this.innerHTML = `
  
  <header-el></header-el>
    
  <h1 class="signup-h1">Registrate</h1>

  <form class="form-signup">
  <label class="form-label">Email:</label>
  <input class="form-input" type="email" name="email"></input>
  <label class="form-label">Nombre:</label>
  <input class="form-input" type="text" name="nombre"></input>
  </div>

   <custom-button class="form-button">Enviar</custom-button> 
 
  </form>

  <div class="form-volver"> <custom-button class="form-volver">Volver</custom-button> </div>
  
    
    `;
    }
}
exports.SignUp = SignUp;
customElements.define("signup-page", SignUp);
