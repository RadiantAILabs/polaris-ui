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

<style lang="scss">
	@use './ConfigTabHeader';
</style>
