<script lang="ts" generics="T extends Record<string, unknown>">
	import type { Snippet } from 'svelte';
	import { Icon } from '../icon';
	import type { FormInstance } from './createForm.svelte.js';

	type Props = {
		form?: FormInstance<T>;
		name: keyof T;
		label?: string;
		size?: 'base' | 'large';
		description?: string;
		descriptionType?: 'default' | 'info';
		required?: boolean;
		error?: string;
		children: Snippet<[{ props: Record<string, unknown> }]>;
	};

	let {
		form,
		name,
		size = 'base',
		label,
		description,
		descriptionType = 'default',
		required = false,
		error,
		children: childrenSnippet
	}: Props = $props();

	// Generate IDs for accessibility
	const uid = $props.id();
	const labelId = `${uid}-label`;
	const descriptionId = `${uid}-desc`;
	const errorId = `${uid}-error`;

	// Get current error for this field - prefer explicit error prop, fallback to form errors
	const currentError = $derived(error || form?.errors[name] || null);

	// Get save state for this field
	const saveState = $derived(form?.fieldSaveStates[name] || 'idle');

	// Only show save indicators if form has that option enabled
	const shouldShowSaveIndicators = $derived(form?.showSaveIndicators ?? false);
</script>

<div class="form-field-container">
	<div class="form-field form-field--size-{size}">
		<div class="form-field__header">
			{#if label}
				<div id={labelId} class="form-field__label">
					{label}
					{#if required}<span class="form-field__required">*</span>{/if}
					{#if shouldShowSaveIndicators && saveState === 'unsaved'}
						<span
							class="form-field__save-indicator form-field__save-indicator--unsaved"
							aria-label="Unsaved changes"
						></span>
					{:else if shouldShowSaveIndicators && saveState === 'saved'}
						<Icon name="check" variant="tertiary" size="small" aria-label="Saved" />
					{/if}
				</div>
			{/if}
			{#if description}
				<div class="form-field__description form-field__description--{descriptionType}">
					{#if descriptionType === 'info'}
						<div class="form-field__icon">
							<Icon name="alert-circle" variant="warning" size="0.875rem" />
						</div>
					{/if}
					<span id={descriptionId}>{description}</span>
				</div>
			{/if}
		</div>
		{@render childrenSnippet({
			props: {
				name,
				'aria-labelledby': label ? labelId : undefined,
				'aria-describedby': description ? descriptionId : undefined,
				'aria-errormessage': currentError ? errorId : undefined,
				'aria-invalid': currentError ? 'true' : undefined,
				'aria-required': required ? 'true' : undefined,
				'aria-busy': form?.submitting ? 'true' : undefined
			}
		})}
	</div>
	{#if currentError}
		<div id={errorId} class="form-field-container__error" aria-live="polite">
			<div>{currentError}</div>
		</div>
	{/if}
</div>

<style lang="scss">
	@use './FormField';
</style>
