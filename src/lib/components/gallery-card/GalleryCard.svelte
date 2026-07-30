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
				<Icon name={icon} variant="secondary" size="base" />
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

<style lang="scss">
	@use './GalleryCard';
</style>
