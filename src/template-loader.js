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

/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {string} src
 */
function loadScript(container, src) {
  const script = appendElement(container, 'script', { src });

  script.onabort = () => console.error(new Error(`Script onabort: ${src}`));
  script.onerror = () => console.error(new Error(`Script onerror: ${src}`));
}

/**
 *
 * @param {ShadowRoot | HTMLElement} shadowRoot
 * @param {string} template
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function loadTemplate(shadowRoot, template) {
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
        loadScript(shadowRoot, src);
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
 * @param {string[]} tagNames
 * @param {ShadowRoot} shadowRoot
 * @returns {Promise<void[]>}
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function whenReady(tagNames, shadowRoot) {
  return Promise.all(
    tagNames.map(tagName => {
      const element = /** @type {Element} */ (shadowRoot.querySelector(tagName));

      return new Promise(resolve => element.addEventListener('ready', resolve));
    })
  );
}
