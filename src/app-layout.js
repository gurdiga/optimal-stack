customElements.define(
  'app-layout',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-layout.html';

    async connectedCallback() {
      console.time(`app-layout`);
      await loadTemplate(this.shadowRoot, this.template);
      await whenReady(['app-styles', 'top-bar'], this.shadowRoot);
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`app-layout`);
    }
  }
);
