customElements.define(
  'app-logo',

  class extends AppHTMLElement {
    template = '/src/app-logo.html';

    async init() {
      this.readWidth(this.getAttribute('width'));
    }

    /**
     *
     * @param {string | null} width
     */
    readWidth(width) {
      if (width) {
        this.shadowRoot.firstElementChild?.setAttribute('width', width);
      }
    }
  }
);
