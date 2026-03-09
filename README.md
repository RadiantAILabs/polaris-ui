# @radiantailabs/polaris-ui

`@radiantailabs/polaris-ui` is an open source Svelte 5 component library for building Polaris web apps such as `polaris-dashboard`.

The package is released under the Apache 2.0 license.

## Installation

```bash
bun add @radiantailabs/polaris-ui
```

Install published versions from the package registry. Do not consume the library from a git dependency in normal application development.

## Usage

Import the package styles once in your application shell:

```svelte
<script>
  import '@radiantailabs/polaris-ui/styles/index.css';
</script>
```

Then import components from the package:

```svelte
<script>
  import { Button, Icon, Input } from '@radiantailabs/polaris-ui';
</script>

<Button variant="primary" label="Save" icon="check" />
<Button variant="invisible" size="small" icon="moon" />
<Input placeholder="Search..." />
```

Tree-shakeable imports are also available:

```ts
import { Button } from '@radiantailabs/polaris-ui/components/button';
```

## SCSS Tokens

Consumers do not need custom Sass `additionalData` injection to use the component library.

If your app wants direct access to Polaris design tokens in its own styles, import them explicitly:

```scss
@use '@radiantailabs/polaris-ui/styles/tokens' as *;
```

That keeps token imports local to the stylesheet that needs them and avoids duplicate global Sass imports.

## Theming

Light and dark mode are controlled by the `data-theme` attribute on `<html>`. If unset, the browser preference is used.

```ts
document.documentElement.setAttribute('data-theme', 'dark');
```

## Development

```bash
bun install
bun run dev
bun run package
bun run check
bun run lint
```

`bun run package` generates `dist/` locally for packaging and release workflows. `dist/` is not intended to be committed to git.

## Publishing

Releases should publish from CI or a dedicated release environment after building from source. The git repository is source-first; package artifacts are produced during the release process.

## License

`@radiantailabs/polaris-ui` is open source under the Apache 2.0 license. See [LICENSE](LICENSE).
