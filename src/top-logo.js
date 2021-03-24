customElements.define(
  "top-logo",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/top-logo.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
