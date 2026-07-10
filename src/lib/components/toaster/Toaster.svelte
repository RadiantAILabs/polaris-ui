<script lang="ts">
	import { Toaster } from 'svelte-sonner';
	import { Icon } from '../icon';

	export interface ToasterProps {
		position?:
			| 'top-left'
			| 'top-center'
			| 'top-right'
			| 'bottom-left'
			| 'bottom-center'
			| 'bottom-right';
		duration?: number;
		visibleToasts?: number;
		closeButton?: boolean;
		expand?: boolean;
		offset?: string;
		class?: string;
	}

	let {
		position = 'bottom-right',
		duration = 4000,
		visibleToasts = 3,
		closeButton = false,
		expand = false,
		offset = '16px',
		...restProps
	}: ToasterProps = $props();

	const isBrowser = typeof window !== 'undefined';
	let theme = $state<'light' | 'dark'>('light');

	// Initialize theme from data-theme attribute or system preference
	if (isBrowser) {
		const dataTheme = document.documentElement.getAttribute('data-theme');
		if (dataTheme === 'dark' || dataTheme === 'light') {
			theme = dataTheme;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
	}

	// Watch for theme changes using MutationObserver
	$effect(() => {
		if (!isBrowser) return;

		const observer = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				if (mutation.attributeName === 'data-theme') {
					const newTheme = document.documentElement.getAttribute('data-theme');
					if (newTheme === 'dark' || newTheme === 'light') {
						theme = newTheme;
					}
				}
			});
		});

		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ['data-theme']
		});

		return () => observer.disconnect();
	});
</script>

<Toaster
	{theme}
	{position}
	{duration}
	{visibleToasts}
	{closeButton}
	{expand}
	{offset}
	style="
	
		--z-index: 100;
		--normal-bg: var(--color-background-raised);
		--normal-border: var(--color-toaster-border);
		--normal-text: var(--color-text-primary);
		--success-bg: var(--color-background-raised);
		--success-border: var(--color-toaster-border);
		--success-text: var(--color-text-success);
		--error-bg: var(--color-background-error);
		--error-border: var(--color-border-error);
		--error-text: var(--color-text-error);
		--warning-bg: var(--color-background-raised);
		--warning-border: var(--color-toaster-border);
		--warning-text: var(--color-text-warning);
		--info-bg: var(--color-background-raised);
		--info-border: var(--color-toaster-border);
		--info-text: var(--color-text-primary);
		--border-radius: 2px;
		--toast-gap: 0.5rem;
		--box-shadow: 0 10px 30px 0 rgb(38 128 134 / 6%);
	"
	{...restProps}
>
	{#snippet successIcon()}
		<Icon name="check-circle" variant="success" size="1.25rem" />
	{/snippet}

	{#snippet errorIcon()}
		<Icon name="crosscircle" variant="error" size="1.25rem" />
	{/snippet}

	{#snippet warningIcon()}
		<Icon name="alert-circle" variant="warning" size="1.25rem" />
	{/snippet}

	{#snippet infoIcon()}
		<Icon name="alert-circle" variant="primary" size="1.25rem" />
	{/snippet}

	{#snippet loadingIcon()}
		<Icon name="loader" variant="primary" size="1.25rem" animation="spin" />
	{/snippet}
</Toaster>

<style lang="scss">
	@use '../../styles/tokens' as *;

	:global([data-sonner-toast][data-styled='true'] [data-title][data-title]) {
		@include typography('body-base-semibold');
	}

	:global([data-sonner-toast][data-styled='true'] [data-description][data-description]) {
		@include typography('body-small-regular');

		color: var(--color-text-secondary);
	}

	:global([data-sonner-toast][data-styled='true'] [data-button][data-button]) {
		@include typography('button-base');

		gap: $space-0-5;
		height: $space-3;
		padding: calc($space-0-5 - $border-width-base) calc($space-1 - $border-width-base);
		color: var(--color-text-primary);
		cursor: pointer;
		background-color: var(--color-button-background-rest);
		border: $border-width-base solid var(--color-button-border-base);
		border-radius: $border-radius-base;
	}

	:global([data-sonner-toast][data-styled='true'] [data-button][data-button]:hover:not(:disabled)),
	:global(
		[data-sonner-toast][data-styled='true'] [data-button][data-button]:focus-visible:not(:disabled)
	) {
		background-color: var(--color-button-background-hover);
	}

	:global(
		[data-sonner-toast][data-styled='true'] [data-button][data-button]:active:not(:disabled)
	) {
		background-color: var(--color-button-background-active);
	}
</style>
