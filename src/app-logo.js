customElements.define(
  "app-logo",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    stylesheet = "/src/app-logo.css";

    connectedCallback() {
      this.shadowRoot.innerHTML = `
        <a href="/">SINGLE<b>SIGHT</b></a>
      `;

      loadStylesheet(this.shadowRoot, this.stylesheet);
    }
  }
);
