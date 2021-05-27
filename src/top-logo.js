customElements.define(
  'top-logo',

  class extends AppHTMLElement {
    template = '/src/top-logo.html';
    childAppElements = ['app-logo'];
  }
);
