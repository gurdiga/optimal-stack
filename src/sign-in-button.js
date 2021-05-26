customElements.define(
  'sign-in-button',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/sign-in-button.html';

    async connectedCallback() {
      console.time(`sign-in-button`);
      await loadTemplate(this.shadowRoot, this.template);
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`sign-in-button`);
    }
  }
);
