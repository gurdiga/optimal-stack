customElements.define(
  'app-layout',

  class extends AppHTMLElement {
    template = '/src/app-layout.html';
    childAppElements = ['app-styles', 'top-bar'];
  }
);
