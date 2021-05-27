const expect = chai.expect;

/**

Describe the UI in general terms, as one would tell someone else what’s
there. For example:

- There’s a top bar, with a logo, a nav bar, and a sign in button.
- There is a content area that had a search field, etc,

This does not seem to work for layout components because their structure
is hidden in the shadow-DOM, …which is intended - that’s the very goal
of the blackbox abstraction.

Ideally, a component like this should emit “ready” when all of its
children have emitted “ready”. Which means that each and every component
should emit this event. But then there is this nuance when a coponent
could be ready later conditionally, or maybe that case is not relevant
here because I need the initial UI render.

One other question is: Why do I need to know this? This is not only
about measuring the component’s size, it’s also about knowing when to
interact with it and poke at it in various ways to see it working. OK,
so what does this leave me? -- Yes, every component should be able to
announce its readiness.

*/

describe('app-layout', () => {
  // TODO: Consider loadin the fixtures in an iframe so that potential
  // navigations inside the element doesn not nagivate away from the
  // test runner. Is this relevant.
  before(async () => {
    await AppHTMLElement.loadTemplate(testScreen, '/src/app-layout.fixture.html');
    await AppHTMLElement.whenChildAppElementsReady(testScreen, ['app-layout']);
  });

  it('has the expected height', async () => {
    const appLayout = /** @type {HTMLElement} */ (testScreen.querySelector('app-layout'));
    const expectedHeight = 92;

    expect(appLayout.offsetHeight).to.equal(expectedHeight);
  });
});
