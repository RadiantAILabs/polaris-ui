<script lang="ts" module>
	import type { ButtonProps } from '../button/Button.svelte';

	export interface ConfigTabHeaderProps {
		title: string;
		backTo?: string;
		onBack?: () => void;
		detail?: string;
		actionButton?: Omit<ButtonProps, 'size'>;
	}
</script>

<script lang="ts">
	import { Button } from '../button';
	import { Icon } from '../icon';

	let { title, backTo, onBack, detail, actionButton }: ConfigTabHeaderProps = $props();

	// Show back button if backTo is provided
	const showBackLink = $derived(!!backTo);

	function handleBackClick() {
		onBack?.();
	}
</script>

<div class="config-tab-header">
	{#if showBackLink}
		<button class="config-tab-header__back-link" onclick={handleBackClick}>
			<Icon name="arrow-left" variant="primary" size="1rem" />
			Back to {backTo}
		</button>
	{/if}

	<header class="config-tab-header__header">
		<div class="config-tab-header__text">
			<h1 class="config-tab-header__title">{title}</h1>
			{#if detail}
				<p class="config-tab-header__detail">{detail}</p>
			{/if}
		</div>

		{#if actionButton}
			<div class="config-tab-header__actions">
				<Button {...actionButton} size="base" />
			</div>
		{/if}
	</header>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.config-tab-header {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
}
.config-tab-header__back-link {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  gap: 0.25rem;
  align-items: center;
  padding: 0;
  color: var(--color-text-primary);
  text-decoration: none;
  cursor: pointer;
  background: transparent;
  border: none;
  opacity: 0.6;
}
@media (prefers-reduced-motion: no-preference) {
  .config-tab-header__back-link {
    transition: all 150ms ease-in-out;
  }
}
.config-tab-header__back-link:hover {
  opacity: 1;
}
.config-tab-header__header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  align-self: stretch;
  justify-content: space-between;
}
.config-tab-header__text {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}
.config-tab-header__title {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 1.25rem;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: var(--color-text-primary);
}
.config-tab-header__detail {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: var(--color-text-secondary);
}
.config-tab-header__actions {
  display: flex;
  flex-shrink: 0;
  align-items: center;
}</style>
