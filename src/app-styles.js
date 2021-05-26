customElements.define(
  'app-styles',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-styles.html';

    async connectedCallback() {
      console.time(`app-styles`);
      await loadTemplate(this.shadowRoot, this.template);
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`app-styles`);
    }
  }
);
