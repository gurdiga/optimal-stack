customElements.define(
  'top-navigation',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/top-navigation.html';

    async connectedCallback() {
      console.time(`top-navigation`);
      await loadTemplate(this.shadowRoot, this.template);
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`top-navigation`);
    }
  }
);
