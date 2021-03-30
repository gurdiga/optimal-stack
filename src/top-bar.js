customElements.define(
  'top-bar',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/top-bar.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
