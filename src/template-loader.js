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
 * @returns { Promise<void> }
 */
async function loadScript(container, src) {
  const script = appendElement(container, 'script', { src });

  return new Promise((resolve, reject) => {
    script.onabort = () => reject(new Error('Script onabort'));
    script.onerror = () => reject(new Error('Script onerror'));
    script.onload = () => resolve();
  });
}

/**
 *
 * @param {ShadowRoot | HTMLElement} shadowRoot
 * @param {string} template
 * @returns Promise<void>
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function loadTemplate(shadowRoot, template) {
  return fetch(template)
    .then(response => response.text())
    .then(async html => {
      shadowRoot.innerHTML = html;

      await loadScripts();
      await loadStylesheets();
    });

  async function loadScripts() {
    const selector = 'script[src]';
    const attribute = 'src';

    shadowRoot.querySelectorAll(selector).forEach(async element => {
      const src = element.getAttribute(attribute)?.trim();

      if (src) {
        await loadScript(shadowRoot, src);
      } else {
        console.warn(`Skipping a ${selector} tag with empty "${src}" attribute in ${template}`);
      }
    });
  }

  async function loadStylesheets() {
    const selector = 'link[rel="stylesheet"]';
    const attribute = 'href';

    shadowRoot.querySelectorAll(selector).forEach(async element => {
      const src = element.getAttribute(attribute)?.trim();

      if (src) {
        const link = appendElement(document.head, 'link', { rel: 'stylesheet', href: src });

        await /** @type {Promise<void>} */ (new Promise((resolve, reject) => {
          link.onabort = () => reject('Stylesheet link onabort');
          link.onerror = () => reject('Stylesheet link onerror');
          link.onload = () => resolve();
        }));

        const commentedOutStylesheetLink = document.createComment(element.outerHTML);

        shadowRoot.replaceChild(commentedOutStylesheetLink, element);
      } else {
        console.warn(`Skipping a ${selector} tag with empty "${src}" attribute in ${template}`);
      }
    });
  }
}
