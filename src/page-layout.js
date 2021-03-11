customElements.define(
  "page-layout",

  class extends HTMLBodyElement {
    shadowRoot = this.attachShadow({ mode: "open" });

    template = "src/page-layout.html";
    stylesheet = "src/page-layout.css";

    connectedCallback() {
      loadTemplateAndStylesheet(this.shadowRoot, this.template, this.stylesheet).then(() => {
        this.shadowRoot.querySelector("main").innerHTML = this.innerHTML;
      });
    }
  },

  { extends: "body" }
);
