import { state } from "../state";
import { Router } from "@vaadin/router";

export class Chat extends HTMLElement {
  connectedCallback() {
    this.render();
    state.subscribe(() => {
      this.render();
    });
  }

  render() {
    const messages = state.data.messages;
    let myName = state.data.myName;

    this.innerHTML = `

<header-el></header-el>
  
 <div class="chat-div">
  
 <h1 class="chat-h1">Chat</h1>
 <h2 class="chat-h2">Room ID: ${state.data.roommId}</h2>
  
 <div class="chat">
 ${messages
   .map((message) => {
     if (message.nombre == myName) {
       return `<div class="chat-divright"><p class="chat-myName">${message.mensaje}</p></div> `;
     } else
       return `<div><p class="chat-otherName"><strong>${message.nombre}</strong>: ${message.mensaje}</p></div> `;
   })
   .join("")}
 </div>

  <form class="chat-chat">
  
  <input class="chat-input" type="text" name="elmensaje"></input>
  <custom-button class="chat-button">Enviar</custom-button>
  </form>
  <custom-button class="form-volver">Inicio</custom-button>
  
  </div>
  
  `;

    const chatChat = this.querySelector(".chat-chat");
    chatChat.addEventListener("submit", function (e) {
      e.preventDefault();

      state.sendMessage(e.target["elmensaje"].value);
    });

    const volverButton = this.querySelector(".form-volver");
    volverButton.addEventListener("click", () => {
      Router.go("/");
    });
  }
}

customElements.define("chat-page", Chat);
