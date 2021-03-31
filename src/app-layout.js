customElements.define(
  'app-layout',

  class extends HTMLElement {
    shadowRoot = this.attachShadow({ mode: 'open' });
    template = '/src/app-layout.html';

    connectedCallback() {
      loadTemplate(this.shadowRoot, this.template).then(() => {
        this.setPageTitle(this.getAttribute('title'));
      });
    }

    /**
     *
     * @param {string | null} title
     */
    setPageTitle(title) {
      if (title) {
        document.title = title;
      }
    }
  }
);
