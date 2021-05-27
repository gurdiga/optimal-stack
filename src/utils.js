// eslint-disable-next-line @typescript-eslint/no-unused-vars
class AppHTMLElement extends HTMLElement {
  shadowRoot = this.attachShadow({ mode: 'open' });

  /** Full URL path to the template */
  template = '';

  /**
   * Tag names of the child elements. It’s used to wait for them to be
   * ready before accnouncing readinsess of this element.
   *
   * @type {string[]}
   **/
  childAppElements = [];

  /**
   * A block of code to do element initialization if any. Can be omitted.
   *
   * @returns {Promise<void>}
   **/
  init() {
    return Promise.resolve();
  }

  /**
   * The standard custom element’s lifecycle callback.
   *
   * Invoked each time the custom element is appended into a
   * document-connected element. This will happen each time the node is
   * moved, and may happen before the element's contents have been fully
   * parsed.
   *
   * {@link https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements}
   */
  async connectedCallback() {
    const tagName = this.getTagName();

    this.time(tagName, async () => {
      await this.loadTemplate(this.shadowRoot, this.template);
      await this.whenChildAppElementsReady(this.shadowRoot, this.childAppElements);
      await this.init();
      this.dispatchEvent(new CustomEvent('ready'));
    });
  }

  /**
   * Measures the execution time of the given block. `label` is
   * displayed in the console before the time.
   *
   * @param {string} label
   * @param {() => Promise<void>} code
   */
  async time(label, code) {
    console.time(`${label}`);
    await code();
    console.timeEnd(`${label}`);
  }

  /**
   * Extracts the tag name from the template URL path. It takes the file
   * base-name without the `.html` extension.
   *
   * For example: '/src/app-layout.html' -> 'app-layout'
   *
   * @returns {string}
   **/
  getTagName() {
    const tagName = this.template.match(/\/([^/]+).html$/)?.[1];

    if (!tagName) {
      throw new Error(`Cant determine tagName from template: ${this.template}`);
    }

    return tagName;
  }

  /**
   * Waits for the givem elements to announce their readiness.
   *
   * @param {ShadowRoot | HTMLElement} container
   * @param {string[]} childAppElements
   *
   * @returns {Promise<void[]>}
   */
  static whenChildAppElementsReady(container, childAppElements) {
    return Promise.all(
      childAppElements.map(tagName => {
        const element = /** @type {Element} */ (container.querySelector(tagName));

        return new Promise(resolve => element.addEventListener('ready', resolve));
      })
    );
  }

  /**
   * Just a convenience reference for use inside AppHTMLElement.
   */
  whenChildAppElementsReady = AppHTMLElement.whenChildAppElementsReady;

  /**
   *
   * @param {ShadowRoot | HTMLElement} shadowRoot
   * @param {string} template
   * @returns {Promise<void>}
   */
  static async loadTemplate(shadowRoot, template) {
    return fetch(template)
      .then(response => response.text())
      .then(html => {
        shadowRoot.innerHTML = html;

        loadScripts();
        loadStylesheets();
      });

    function loadScripts() {
      const selector = 'script[src]';
      const attribute = 'src';

      for (const element of shadowRoot.querySelectorAll(selector)) {
        const src = element.getAttribute(attribute)?.trim();

        if (src) {
          AppHTMLElement.loadScript(shadowRoot, src);
        } else {
          console.warn(`Skipping a ${selector} tag with empty "${src}" attribute in ${template}`);
        }
      }
    }

    async function loadStylesheets() {
      const selector = 'link[rel="stylesheet"]';
      const attribute = 'href';

      for (const element of shadowRoot.querySelectorAll(selector)) {
        const href = element.getAttribute(attribute)?.trim();
        const scope = element.getAttribute('data-scope');
        const container = scope === 'global' ? document.head : shadowRoot;

        if (href) {
          const link = appendElement(container, 'link', { rel: 'stylesheet', href });

          link.onabort = () => console.error(`Stylesheet link onabort: ${href}`);
          link.onerror = () => console.error(`Stylesheet link onerror: ${href}`);

          const commentedOutStylesheetLink = document.createComment(element.outerHTML);

          shadowRoot.replaceChild(commentedOutStylesheetLink, element);
        } else {
          console.warn(`Skipping a ${selector} tag with empty "${href}" attribute in ${template}`);
        }
      }
    }
  }

  /**
   * Just a convenience reference for use inside AppHTMLElement.
   */
  loadTemplate = AppHTMLElement.loadTemplate;

  /**
   *
   * @param {HTMLElement | ShadowRoot} container
   * @param {string} src
   */
  static loadScript(container, src) {
    const script = appendElement(container, 'script', { src });

    script.onabort = () => console.error(new Error(`Script onabort: ${src}`));
    script.onerror = () => console.error(new Error(`Script onerror: ${src}`));
  }
}

/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {string} tagName
 * @param {Record<string, string>} attrs
 */
function appendElement(container, tagName, attrs) {
  const element = document.createElement(tagName);

  for (const attr in attrs) {
    element.setAttribute(attr, attrs[attr]);
  }

  container.appendChild(element);

  return element;
}
