// Preloaded by `bun test` (see bunfig.toml). Bun's own test runner has no
// DOM by default, unlike `vitest` (configured for `environment: 'jsdom'` in
// vitest.config.ts). Components/tests that need `window`, `document`, or
// `DOMParser` - e.g. DOMPurify, which requires a real DOM to sanitize - need
// one installed here so `bun test` (what CI's "Run tests" step actually
// runs) exercises the same code paths as `vitest`.
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!doctype html><html><body></body></html>', {
	url: 'http://localhost/'
});

// jsdom's `window` self-references (`window.window === window`), so this
// also defines `globalThis.window`.
Object.defineProperties(globalThis, Object.getOwnPropertyDescriptors(dom.window));
