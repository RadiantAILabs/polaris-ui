<script lang="ts" module>
	import type { HTMLAttributes } from 'svelte/elements';
	import { type WithElementRef } from '../../utils';

	export type RadioButtonProps = WithElementRef<HTMLAttributes<HTMLButtonElement>> & {
		checked?: boolean;
		disabled?: boolean;
	};
</script>

<script lang="ts">
	let {
		checked = false,
		disabled = false,
		ref = $bindable(null),
		...restProps
	}: RadioButtonProps = $props();
</script>

<button
	bind:this={ref}
	class="radio-button"
	type="button"
	role="radio"
	aria-checked={checked}
	{disabled}
	{...restProps}
>
	{#if checked}
		<div class="radio-button__fill"></div>
	{/if}
</button>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.radio-button {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  width: 1rem;
  height: 1rem;
  padding: calc(0.25rem - 1px);
  cursor: pointer;
  background-color: transparent;
  border: 1px solid var(--color-checkbox-border-rest);
  border-radius: 3px;
}
@media (prefers-reduced-motion: no-preference) {
  .radio-button {
    transition: border-color 150ms ease-in-out;
  }
}
.radio-button__fill {
  width: 100%;
  height: 100%;
  background-color: var(--color-radiobutton-fill-active);
  border-radius: 2px;
}

.radio-button[aria-checked=true] {
  border-color: var(--color-border-strong);
}

.radio-button:is(:hover, :focus-visible):not([data-disabled]) {
  border-color: var(--color-checkbox-border-hover);
}

.radio-button[data-disabled] {
  pointer-events: none;
  background-color: var(--color-background-disabled);
  border-color: var(--color-checkbox-border-rest);
}
.radio-button[data-disabled] .radio-button__fill {
  background-color: var(--color-radiobutton-fill-disabled);
}</style>
