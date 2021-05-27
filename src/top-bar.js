customElements.define(
  'top-bar',

  class extends AppHTMLElement {
    template = '/src/top-bar.html';
    childAppElements = ['two-sided-layout', 'top-logo', 'top-navigation', 'sign-in-button'];
  }
);
