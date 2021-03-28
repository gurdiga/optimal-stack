# Optimal Stack™

Here I’m playing with the idea of having the simplest working frontend stack:

- No transpilation;
- Web Components handle the abstraction;
- Type-checking is done with TypeScript (see `jsconfig.json`).

## Web Components Guidelines

- The component class + its template as a separate HTML file;
- The component loads its subcomponents with a `<script>` tag in its template.

## TODO

- Add HTML linting ([tidy](https://www.html-tidy.org/documentation/)).
- Add linting for other things?
- Figure out the unit testing.
