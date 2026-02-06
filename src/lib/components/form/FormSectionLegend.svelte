<script lang="ts">
	import type { ButtonProps } from '../button/Button.svelte';
	import { Button } from '../button';
	import { cn } from '../../utils';

	type Props = {
		title: string;
		actionButton?: Omit<ButtonProps, 'size'>;
		class?: string;
	};

	let { title, actionButton, class: className }: Props = $props();
</script>

<legend class={cn('form-section-legend', className)}>
	<span class="form-section-legend__heading">{title}</span>

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
		margin: 0 0 $space-1;

		&__heading {
			@include typography('heading-small');

			display: flex;
			flex: 1;
			align-items: center;
			height: $space-4;
			margin: 0;
			color: var(--color-text-primary);
		}

		&__actions {
			display: flex;
			flex-shrink: 0;
			gap: $space-1;
			align-items: flex-start;
			align-self: flex-start;
		}
	}
</style>
