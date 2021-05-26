customElements.define(
  'app-layout',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-layout.html';

    async connectedCallback() {
      await loadTemplate(this.shadowRoot, this.template);
      this.dispatchEvent(new CustomEvent('ready'));
      console.log('ready', this.shadowRoot.innerHTML, this.offsetHeight);
    }
  }
);
