customElements.define(
  "app-logo",

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: "open" });
    template = "/src/app-logo.html";

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template).then(() => {
        this.readWidth(this.getAttribute("width"));
      });
    }

    /**
     *
     * @param {string | null} width
     */
    readWidth(width) {
      if (width) {
        this.shadowRoot.firstElementChild?.setAttribute("width", width);
      }
    }
  }
);
