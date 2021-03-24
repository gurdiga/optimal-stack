customElements.define(
  "two-sided-layout",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/two-sided-layout.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
