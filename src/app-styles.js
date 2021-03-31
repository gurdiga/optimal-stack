customElements.define(
  'app-styles',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-styles.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
