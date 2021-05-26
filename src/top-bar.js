customElements.define(
  'top-bar',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/top-bar.html';

    async connectedCallback() {
      console.time(`top-bar`);
      await loadTemplate(this.shadowRoot, this.template);
      await whenReady(['two-sided-layout', 'top-logo', 'top-navigation', 'sign-in-button'], this.shadowRoot);
      await customElements.whenDefined('top-navigation');
      this.dispatchEvent(new CustomEvent('ready'));
      console.timeEnd(`top-bar`);
    }
  }
);
