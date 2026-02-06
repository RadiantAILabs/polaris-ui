<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import type { IconName } from '../icon/icon-registry';
	import { Icon } from '../icon';

	export interface IconAndTextProps extends HTMLAttributes<HTMLDivElement> {
		icon?: IconName;
		text: string;
		size?: 'base' | 'large';
		variant?: 'default' | 'error';
	}

	let {
		icon,
		text,
		size = 'base',
		variant = 'default',
		class: className = '',
		...restProps
	}: IconAndTextProps = $props();

	const iconSize = $derived(size === 'large' ? '1rem' : '0.75rem');
	const iconVariant = $derived(variant === 'error' ? 'error' : 'primary');
</script>

<div class="icon-and-text icon-and-text--{size} {className}" {...restProps}>
	{#if icon}
		<Icon name={icon} variant={iconVariant} size={iconSize} />
	{/if}
	<span class="icon-and-text__text icon-and-text__text--{variant}">{text}</span>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.icon-and-text {
  display: inline-flex;
  gap: 0.25rem;
  align-items: center;
  justify-content: center;
}
.icon-and-text__text {
  flex-shrink: 0;
  color: var(--color-text-secondary);
  white-space: nowrap;
}
@media (prefers-reduced-motion: no-preference) {
  .icon-and-text__text {
    transition: all 150ms ease-in-out;
  }
}
.icon-and-text__text--error {
  color: var(--color-text-error);
}
.icon-and-text--base .icon-and-text__text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-and-text--large .icon-and-text__text {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}</style>
