export function initButtonComp() {
  customElements.define(
    "custom-button",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const button = document.createElement("button");
        const style = document.createElement("style");
        button.className = "root";

        style.innerHTML = `      
          .root{
              font-size: 18px;
              border: solid 2px;
              border-radius: 5px;
              padding:17px 13px;
              background-color:#9CBBE9;
              width:100%;
              min-width: 200px;
              max-width: 350px;
            }
            `;

        button.textContent = this.textContent;
        button.addEventListener("click", (event) => {
          event.preventDefault(); // Evitar el comportamiento predeterminado de un clic en un botón
          const form = this.closest("form"); // Buscar el formulario más cercano al botón
          if (form) {
            form.dispatchEvent(
              new Event("submit", { bubbles: true, cancelable: true })
            ); // Disparar manualmente el evento de envío del formulario
          }
        });
        shadow.appendChild(button);
        shadow.appendChild(style);
      }
    }
  );
}
