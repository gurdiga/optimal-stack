/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {[string, Record<string, string>][]} elementTuple
 */
function appendElement(container, elementTuple) {
  elementTuple.forEach(([tagName, attrs]) => {
    const element = document.createElement(tagName);

    for (const attr in attrs) {
      element.setAttribute(attr, attrs[attr]);
    }

    container.appendChild(element);
  });
}

/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {string} src
 */
function loadScript(container, src) {
  appendElement(container, [["script", { src }]]);
}

/**
 *
 * @param {HTMLElement | ShadowRoot} container
 * @param {string} href
 */
function loadStylesheet(container, href) {
  appendElement(container, [["link", { href, rel: "stylesheet" }]]);
}

/**
 *
 * @param {ShadowRoot} shadowRoot
 * @param {string} template
 * @returns Promise<void>
 */
function loadTemplate(shadowRoot, template) {
  return fetch(template)
    .then((response) => response.text())
    .then((html) => {
      shadowRoot.innerHTML = html;

      shadowRoot.querySelectorAll("script[src]").forEach((script) => {
        const src = script.getAttribute("src")?.trim();

        if (src) {
          loadScript(shadowRoot, src);
        } else {
          console.warn(`Sckipping a <script> tag with empty "src" attribute in ${template}`);
        }
      });

      shadowRoot.querySelectorAll(`link[rel="stylesheet"]`).forEach((link) => {
        const href = link.getAttribute("href")?.trim();

        if (href) {
          loadStylesheet(shadowRoot, href);
        } else {
          console.warn(`Sckipping a <link[rel="stylesheet"]> tag with empty "href" attribute in ${template}`);
        }
      });
    });
}
