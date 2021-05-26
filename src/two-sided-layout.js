customElements.define(
  'two-sided-layout',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/two-sided-layout.html';

    async connectedCallback() {
      console.time(`two-sided-layout`);
      await loadTemplate(this.shadowRoot, this.template);
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`two-sided-layout`);
    }
  }
);
