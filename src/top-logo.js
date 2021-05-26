customElements.define(
  'top-logo',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/top-logo.html';

    async connectedCallback() {
      console.time(`top-logo`);
      await loadTemplate(this.shadowRoot, this.template);
      await whenReady(['app-logo'], this.shadowRoot);
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`top-logo`);
    }
  }
);
