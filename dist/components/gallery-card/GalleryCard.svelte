<script lang="ts">
	import { Icon, type IconName } from '../icon';
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { Button } from '../button';

	export type GalleryCardProps = WithElementRef<HTMLButtonAttributes> & {
		title: string;
		caption?: string;
		icon?: IconName;
		onclick?: () => void;
		size?: 'base' | 'small';
	};
	let {
		title,
		caption,
		icon,
		onclick,
		size = 'base',
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: GalleryCardProps = $props();

	function handleClick() {
		onclick?.();
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			onclick?.();
		}
	}

	const isInteractive = $derived(!!onclick);
</script>

{#snippet content()}
	<header class="gallery-card__header">
		<div class="gallery-card__header-left">
			{#if icon}
				<Icon name={icon} variant="secondary" size="1rem" />
			{/if}
			<h3 class="gallery-card__title">{title}</h3>
		</div>
		<div class="gallery-card__header-right">
			{#if caption}
				<div class="gallery-card__caption">{caption}</div>
			{/if}
			{#if isInteractive}
				<Button icon="chevron-right" variant="invisible" onclick={handleClick} />
			{/if}
		</div>
	</header>
	<div class="gallery-card__content">
		{@render children?.()}
	</div>
{/snippet}

{#if isInteractive}
	<button
		bind:this={ref}
		class={cn('gallery-card', 'gallery-card--interactive', `gallery-card--size-${size}`, className)}
		type="button"
		{...restProps}
		onclick={handleClick}
		onkeydown={handleKeyDown}
	>
		{@render content()}
	</button>
{:else}
	<div bind:this={ref} class={cn('gallery-card', `gallery-card--size-${size}`, className)}>
		{@render content()}
	</div>
{/if}

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.gallery-card {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
  width: 100%;
  padding: 1rem;
  text-align: left;
  background-color: var(--color-background-raised);
  border: 1.5px solid var(--color-control-border-rest);
  border-radius: 2px;
}
.gallery-card--size-small {
  gap: 0.5rem;
}
.gallery-card--interactive {
  cursor: pointer;
}
@media (prefers-reduced-motion: no-preference) {
  .gallery-card--interactive {
    transition: all 150ms ease-in-out;
  }
}
.gallery-card--interactive:hover, .gallery-card--interactive:focus-visible {
  background-color: var(--color-control-background-hover);
  border-color: var(--color-control-border-hover);
}
.gallery-card--interactive:active {
  background-color: var(--color-control-background-active);
  border-color: var(--color-control-border-active);
}
.gallery-card__header {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 0;
}
.gallery-card__header-left {
  display: flex;
  flex: 2;
  gap: 0.5rem;
  align-items: center;
  min-width: 0;
}
.gallery-card__header-right {
  display: flex;
  flex: 1;
  gap: 0.25rem;
  align-items: center;
  justify-content: flex-end;
  min-width: 0;
}
.gallery-card__title {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1rem;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-primary);
  white-space: nowrap;
}
.gallery-card--size-small .gallery-card__title {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.gallery-card__caption {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-text-tertiary);
  white-space: nowrap;
}
.gallery-card--size-small .gallery-card__caption {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.gallery-card__content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  align-self: stretch;
}</style>
