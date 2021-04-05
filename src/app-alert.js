customElements.define(
  'app-alert',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-alert.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
