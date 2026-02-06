<script lang="ts" module>
	import { cn } from '../../utils';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';

	export type NavButtonProps = {
		icon: IconName;
		label: string;
		active?: boolean;
		expanded?: boolean;
		href?: string;
		disabled?: boolean;
		class?: string;
		ref?: HTMLElement | null;
		onclick?: (event: MouseEvent) => void;
	};
</script>

<script lang="ts">
	let {
		class: className,
		icon,
		label,
		active = false,
		expanded = true,
		href,
		disabled,
		onclick,
		ref = $bindable(null)
	}: NavButtonProps = $props();
</script>

{#if href}
	<!-- eslint-disable svelte/no-navigation-without-resolve -->
	<a
		bind:this={ref}
		class={cn('nav-btn', active && 'nav-btn--active', !expanded && 'nav-btn--collapsed', className)}
		href={disabled ? undefined : href}
		aria-disabled={disabled}
		aria-current={active ? 'page' : undefined}
		aria-label={!expanded ? label : undefined}
		tabindex={disabled ? -1 : undefined}
		{onclick}
	>
		<Icon variant="primary" {disabled} name={icon} size="1rem" />
		<span class="nav-btn__label" class:nav-btn__label--hidden={!expanded}>{label}</span>
	</a>
{:else}
	<button
		bind:this={ref}
		class={cn('nav-btn', active && 'nav-btn--active', !expanded && 'nav-btn--collapsed', className)}
		type="button"
		{disabled}
		aria-current={active ? 'page' : undefined}
		aria-label={!expanded ? label : undefined}
		{onclick}
	>
		<Icon variant="primary" {disabled} name={icon} size="1rem" />
		<span class="nav-btn__label" class:nav-btn__label--hidden={!expanded}>{label}</span>
	</button>
{/if}

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.nav-btn {
  position: relative;
  box-sizing: border-box;
  display: inline-flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: left;
  width: 100%;
  height: 2rem;
  padding: calc(0.5rem - 1px);
  color: var(--color-text-primary);
  white-space: nowrap;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  outline: none;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 2px;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (prefers-reduced-motion: no-preference) {
  .nav-btn {
    transition: all 150ms ease-in-out;
  }
}
.nav-btn:disabled, .nav-btn[aria-disabled=true] {
  color: var(--color-text-disabled);
  pointer-events: none;
  cursor: not-allowed;
}
.nav-btn:hover:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-sidebar-button-background-hover);
}

.nav-btn--active {
  background-color: var(--color-sidebar-button-background-active);
}
.nav-btn--active:hover:not(:disabled, [aria-disabled=true]) {
  background-color: var(--color-sidebar-button-background-active);
}

.nav-btn--collapsed {
  gap: 0;
  width: fit-content;
}

.nav-btn__label {
  flex: 1;
  max-width: 200px;
  overflow: hidden;
  text-align: left;
  white-space: nowrap;
  opacity: 1;
  transition: opacity 200ms cubic-bezier(0.65, 0, 0.35, 1), max-width 200ms cubic-bezier(0.65, 0, 0.35, 1);
}

.nav-btn__label--hidden {
  max-width: 0;
  opacity: 0;
}</style>
