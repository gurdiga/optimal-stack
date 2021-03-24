customElements.define(
  "sign-in-button",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/sign-in-button.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
