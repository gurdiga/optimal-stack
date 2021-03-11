customElements.define(
  "top-navigation",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/top-navigation.html";
    stylesheet = "/src/top-navigation.css";

    connectedCallback() {
      loadTemplateAndStylesheet(this.shadowRoot, this.template, this.stylesheet);
    }
  }
);
