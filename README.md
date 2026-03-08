# @polaris/ui

`@polaris/ui` is an open source Svelte 5 component library for building Polaris web apps such as `polaris-dashboard`.

The package is released under the Apache 2.0 license.

## Installation

```bash
bun add @polaris/ui
```

## Usage

Import the package styles once in your application shell:

```svelte
<script>
  import '@polaris/ui/styles/index.css';
</script>
```

Then import components from the package:

```svelte
<script>
  import { Button, Icon, Input } from '@polaris/ui';
</script>

<Button variant="primary" label="Save" icon="check" />
<Button variant="invisible" size="small" icon="moon" />
<Input placeholder="Search..." />
```

Tree-shakeable imports are also available:

```ts
import { Button } from '@polaris/ui/components/button';
```

## SCSS Tokens

Consumers do not need custom Sass `additionalData` injection to use the component library.

If your app wants direct access to Polaris design tokens in its own styles, import them explicitly:

```scss
@use '@polaris/ui/styles/tokens' as *;
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

## License

`@polaris/ui` is open source under the Apache 2.0 license. See [LICENSE](LICENSE).
