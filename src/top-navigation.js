customElements.define(
  "top-navigation",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/top-navigation.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
