customElements.define(
  'app-logo',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-logo.html';

    async connectedCallback() {
      console.time(`app-logo`);
      await loadTemplate(this.shadowRoot, this.template);
      this.readWidth(this.getAttribute('width'));
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`app-logo`);
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
