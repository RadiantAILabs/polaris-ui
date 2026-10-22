<script lang="ts" module>
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';
	export interface FilterChipProps extends Omit<HTMLButtonAttributes, 'children'> {
		children: Snippet;
		ref?: HTMLButtonElement | null;
		tone?: 'neutral' | 'blue';
		onDelete?: () => void;
		deleteLabel?: string;
	}
</script>

<script lang="ts">
	import { Icon } from '../icon';
	import { cn } from '../../utils';
	let {
		ref = $bindable(null),
		children,
		tone = 'blue',
		onDelete,
		deleteLabel,
		disabled,
		class: className,
		...props
	}: FilterChipProps = $props();
	const contentId = $props.id();
</script>

<span
	class={cn('filter-chip', `filter-chip--${tone}`, className)}
	data-disabled={disabled || undefined}
>
	<button bind:this={ref} type="button" class="filter-chip__edit" {disabled} {...props}
		><span class="filter-chip__content" id={contentId}>{@render children()}</span></button
	>
	{#if onDelete}
		<button
			type="button"
			class="filter-chip__delete"
			aria-label={deleteLabel ?? 'Delete filter'}
			aria-describedby={deleteLabel ? undefined : contentId}
			{disabled}
			onclick={onDelete}><Icon name="cross" size="small" /></button
		>
	{/if}
</span>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.filter-chip {
		display: inline-flex;
		flex: 0 1 auto;
		align-items: stretch;
		min-width: 0;
		height: 24px;
		overflow: hidden;
		color: var(--color-text-primary);
		background: var(--color-background-raised);
		border: 1px solid var(--color-border-base);
		border-radius: $border-radius-base;
	}

	.filter-chip--blue {
		color: var(--color-filter-chip-blue-text);
		background: var(--color-filter-chip-blue-background);
		border-color: var(--color-filter-chip-blue-border);
	}

	.filter-chip:has(button:enabled:hover) {
		background: var(--color-button-background-hover);
	}

	.filter-chip--blue:has(button:enabled:hover) {
		background: var(--color-filter-chip-blue-background-hover);
	}

	.filter-chip[data-disabled] {
		opacity: 0.5;
	}

	.filter-chip__content {
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.filter-chip__edit {
		padding: 0 6px;
	}

	.filter-chip__delete {
		flex: none;
		padding: 0 4px;
	}

	.filter-chip__edit,
	.filter-chip__delete {
		display: inline-flex;
		gap: 4px;
		align-items: center;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		font: inherit;
		font-size: 13px;
		font-weight: 400;
		line-height: 18px;
		color: inherit;
		white-space: nowrap;
		cursor: pointer;
		background: transparent;
		border: 0;

		&:focus-visible {
			outline: 2px solid currentcolor;
			outline-offset: -2px;
		}

		&:disabled {
			cursor: default;
		}
	}
</style>
