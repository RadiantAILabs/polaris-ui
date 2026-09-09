<script lang="ts">
	import type { ButtonProps } from '../button/Button.svelte';
	import { Button } from '../button';
	import { cn } from '../../utils';

	type Props = {
		title: string;
		description?: string;
		descriptionId?: string;
		actionButton?: Omit<ButtonProps, 'size'>;
		class?: string;
	};

	let { title, description, descriptionId, actionButton, class: className }: Props = $props();
</script>

<legend class={cn('form-section-legend', className)}>
	<span class="form-section-legend__content">
		<span class="form-section-legend__heading">{title}</span>
		{#if description}
			<span id={descriptionId} class="form-section-legend__description">{description}</span>
		{/if}
	</span>

	{#if actionButton}
		<div class="form-section-legend__actions">
			<Button {...actionButton} size="base" />
		</div>
	{/if}
</legend>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.form-section-legend {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: 0;
		margin: 0 0 $space-1-5;
	}

	.form-section-legend__content {
		display: flex;
		flex: 1;
		flex-direction: column;
		min-width: 0;
	}

	.form-section-legend__heading {
		@include typography('heading-small');

		display: flex;
		align-items: center;
		margin: 0;
		color: var(--color-text-primary);
	}

	.form-section-legend__description {
		@include typography('body-base-regular');

		color: var(--color-text-tertiary);
	}

	.form-section-legend__actions {
		display: flex;
		flex-shrink: 0;
		gap: $space-1;
		align-items: flex-start;
		align-self: flex-start;
	}
</style>
