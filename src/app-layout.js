customElements.define(
  'app-layout',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-layout.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
