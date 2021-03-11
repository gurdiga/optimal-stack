customElements.define(
  "hello-world",

  class extends HTMLElement {
    static get observedAttributes() {
      return ["color"];
    }

    constructor() {
      super();

      this.attachShadow({ mode: "open" });
      this.buildRoot();
    }

    buildRoot() {
      const element = document.createElement("div");
      const style = {
        color: "green",
      };

      element.className = "root";
      Object.assign(element.style, style, {
        display: "none",
      });
      element.innerHTML = this.innerHTML;

      this.root = element;
    }

    attributeChangedCallback(name, oldValue, newValue) {
      // console.log("attributeChangedCallback", name, oldValue, newValue);
    }

    connectedCallback() {
      this.shadowRoot.appendChild(this.root);
      this.root.style.display = "";
    }
  }
);
