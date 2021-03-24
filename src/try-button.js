customElements.define(
  "try-button",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/try-button.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
