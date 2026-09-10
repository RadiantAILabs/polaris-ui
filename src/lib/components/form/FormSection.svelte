<script lang="ts">
	import type { ButtonProps } from '../button/Button.svelte';
	import { Alert, AlertDescription } from '../alert';
	import { Icon } from '../icon';
	import FormSectionLegend from './FormSectionLegend.svelte';
	import { cn } from '../../utils';

	type Props = {
		title: string;
		description?: string;
		error?: string;
		actionButton?: Omit<ButtonProps, 'size'>;
		children?: import('svelte').Snippet;
		class?: string;
	};

	let { title, description, error, actionButton, children, class: className }: Props = $props();
	const uid = $props.id();
	const descriptionId = `${uid}-description`;
	const errorId = `${uid}-error`;
	const describedBy = $derived(
		[description ? descriptionId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined
	);
</script>

<fieldset class={cn('form-section', className)} aria-describedby={describedBy}>
	<FormSectionLegend {title} {description} {descriptionId} {actionButton} />

	{#if error}
		<div class="form-section__error">
			<Alert id={errorId} variant="error" aria-live="polite">
				<Icon name="alert-circle" size="base" variant="error" aria-hidden="true" />
				<AlertDescription>{error}</AlertDescription>
			</Alert>
		</div>
	{/if}

	{#if children}
		<div class="form-section__content">
			{@render children()}
		</div>
	{/if}
</fieldset>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.form-section {
		display: flex;
		flex-direction: column;
		gap: 0;
		width: 100%;
		padding: 0;
		margin: 0;
		border: none;
	}

	.form-section__content {
		display: flex;
		flex-direction: column;
		gap: $space-2;
		width: 100%;
	}

	.form-section__error {
		margin-bottom: $space-2;
	}
</style>
