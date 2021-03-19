customElements.define(
  "app-logo",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/app-logo.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
