import { state } from "../state";
import { Router } from "@vaadin/router";
import Swal from "sweetalert2";

export class Home extends HTMLElement {
  connectedCallback() {
    this.render();

    const selectRoom = this.querySelector(".form-select");
    const divSelectRoom = this.querySelector(
      ".div-select-rooms"
    ) as HTMLElement;

    selectRoom.addEventListener("change", function (e) {
      const target = e.target as any;

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

      state.setName(myName);
      state.setEmail(myEmail);
      state.setRoomId(myRoomId);

      state.auth(myEmail).then((data) => {
        if (data.message == "not found") {
          Router.go("/signup");
        } else if (mySelectRoom == "nuevo-room") {
          state.setUserId(data.id);
          state.createRoom(state.data.userId).then((res) => {
            state.setRoomId(res.id);
            state.joinRoom(res.id, state.data.userId).then((res) => {
              state.init(res.rtdbRoomId);
              Router.go("/chat");
            });
          });
        } else if (mySelectRoom == "room-existente") {
          state.setUserId(data.id);
          state.setRoomId(myRoomId);
          state
            .joinRoom(myRoomId, data.id)
            .then((res) => {
              state.init(res.rtdbRoomId);
              Router.go("/chat");
            })
            .catch(() =>
              Swal.fire({
                icon: "error",
                title: "El Room NO existe!",
                confirmButtonColor: "#9CBBE9",
              })
            );
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

customElements.define("home-page", Home);
