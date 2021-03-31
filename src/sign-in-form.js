customElements.define(
  'sign-in-form',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/sign-in-form.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template);
    }
  }
);
