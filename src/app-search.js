customElements.define(
  'app-search',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-search.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
