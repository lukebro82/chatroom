export function initHeaderComp() {
  customElements.define(
    "header-el",
    class extends HTMLElement {
      constructor() {
        super();
        this.render();
      }
      render() {
        const shadow = this.attachShadow({ mode: "open" });
        const header = document.createElement("header");
        const style = document.createElement("style");
        header.className = "header-el";
        style.innerHTML = ` 
            *{
              box-sizing: border-box;
            }
            .header-el{
              background-color:#FF8282;
              width:100%;
              text-align:center;
            }
            .header-el h1{
              padding:0;
              margin:0;
          }
            `;

        header.innerHTML = `
              <header>
              <h1>Header</h1>
              </header>
            `;

        shadow.appendChild(header);
        shadow.appendChild(style);
      }
    }
  );
}
