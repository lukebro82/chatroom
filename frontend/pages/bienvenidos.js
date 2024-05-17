"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Home = void 0;
const state_1 = require("../state");
const router_1 = require("@vaadin/router");
const sweetalert2_1 = require("sweetalert2");
class Home extends HTMLElement {
    connectedCallback() {
        this.render();
        const selectRoom = this.querySelector(".form-select");
        const divSelectRoom = this.querySelector(".div-select-rooms");
        selectRoom.addEventListener("change", function (e) {
            const target = e.target;
            if (target.value == "room-existente") {
                divSelectRoom.style.display = "flex";
            }
            if (target.value == "nuevo-room") {
                divSelectRoom.style.display = "none";
            }
        });
        const form = this.querySelector(".form-bienvenidos");
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const myName = e.target["nombre"].value;
            const myEmail = e.target["email"].value;
            const myRoomId = e.target["roomid"].value;
            const mySelectRoom = e.target["room-choice"].value;
            state_1.state.setName(myName);
            state_1.state.setEmail(myEmail);
            state_1.state.setRoomId(myRoomId);
            state_1.state.auth(myEmail).then((data) => {
                if (data.message == "not found") {
                    router_1.Router.go("/signup");
                }
                else if (mySelectRoom == "nuevo-room") {
                    state_1.state.setUserId(data.id);
                    state_1.state.createRoom(state_1.state.data.userId).then((res) => {
                        state_1.state.setRoomId(res.id);
                        state_1.state.joinRoom(res.id, state_1.state.data.userId).then((res) => {
                            state_1.state.init(res.rtdbRoomId);
                            router_1.Router.go("/chat");
                        });
                    });
                }
                else if (mySelectRoom == "room-existente") {
                    state_1.state.setUserId(data.id);
                    state_1.state.setRoomId(myRoomId);
                    state_1.state
                        .joinRoom(myRoomId, data.id)
                        .then((res) => {
                        state_1.state.init(res.rtdbRoomId);
                        router_1.Router.go("/chat");
                    })
                        .catch(() => sweetalert2_1.default.fire({
                        icon: "error",
                        title: "El Room NO existe!",
                        confirmButtonColor: "#9CBBE9",
                    }));
                }
            });
        });
    }
    render() {
        this.innerHTML = `
  <header-el></header-el>
  
  <div class="bienvendios-div">
  
  <h1 class="bienvenidos-h1">Bienvenidos</h1>
  
  <form class="form-bienvenidos">
  <label class="form-label">Email:</label>
  <input class="form-input" type="email" name="email"></input>
  <label class="form-label">Nombre:</label>
  <input class="form-input" type="text" name="nombre"></input>
  <label class="form-label">Room:</label>
  <select class="form-select" name="room-choice">
    <option value="nuevo-room">Nuevo room</option>
    <option value="room-existente">Room existente</option>
 </select>
 <div class="div-select-rooms">  <label class="form-label">Room ID:</label>
  <input class="form-input" type="text" name="roomid"></input> </div>

   <custom-button class="form-button">Comenzar</custom-button>
  </form>
  
  </div>
  
  `;
    }
}
exports.Home = Home;
customElements.define("home-page", Home);
