<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Icon } from '../icon';
	import { Tooltip } from '../tooltip';
	import { cn } from '../../utils';

	export interface TreeElementDetailsProps {
		/** Time duration to display */
		time?: string;
		/** Token count to display */
		tokens?: string;
		/** Optional content shown in a tooltip on the token value. */
		tokensTooltip?: Snippet;
		/** Estimated USD cost to display (already formatted, e.g. `$0.0125`) */
		cost?: string;
		/** Optional content shown in a tooltip on the cost value. */
		costTooltip?: Snippet;
		/** Status of the element */
		status?: 'completed' | 'processing' | 'failed';
		/** Additional CSS class */
		class?: string;
	}

	let {
		time,
		tokens,
		tokensTooltip,
		cost,
		costTooltip,
		status,
		class: className
	}: TreeElementDetailsProps = $props();

	const ariaLabel = $derived.by(() => {
		if (status === 'processing') return time ? `Processing, ${time} elapsed` : 'Processing';
		if (status === 'failed') {
			const parts = ['Failed'];
			if (time) parts.push(time);
			if (tokens) parts.push(`${tokens} tokens`);
			if (cost) parts.push(`${cost} cost`);
			return parts.join(', ');
		}
		const parts: string[] = [];
		if (time) parts.push(time);
		if (tokens) parts.push(`${tokens} tokens`);
		if (cost) parts.push(`${cost} cost`);
		return parts.length > 0 ? parts.join(', ') : undefined;
	});
</script>

<div class={cn('tree-element-details', className)} role="status" aria-label={ariaLabel}>
	{#if status === 'processing'}
		<Icon name="loader" size="0.75rem" variant="secondary" animation="spin" />
		{#if time}
			<span class="tree-element-details__value">{time}</span>
		{/if}
	{:else if status === 'failed'}
		<div class="tree-element-details__item">
			<Icon name="alert-circle" size="0.75rem" variant="error" />
			{#if time}
				<span class="tree-element-details__value tree-element-details__error">{time}</span>
			{/if}
		</div>
		{@render tokensItem()}
		{@render costItem()}
	{:else}
		{#if time}
			<div class="tree-element-details__item">
				<span class="tree-element-details__value">{time}</span>
			</div>
		{/if}

		{@render tokensItem()}
		{@render costItem()}
	{/if}
</div>

<!-- A value that opens a tooltip on hover when `tip` is supplied, otherwise plain text. -->
{#snippet value(text: string, tip?: Snippet)}
	{#if tip}
		<Tooltip align="end">
			{#snippet content()}
				{@render tip()}
			{/snippet}
			<span class="tree-element-details__value">{text}</span>
		</Tooltip>
	{:else}
		<span class="tree-element-details__value">{text}</span>
	{/if}
{/snippet}

{#snippet tokensItem()}
	{#if tokens}
		<div class="tree-element-details__item">
			<Icon name="tokens" size="0.75rem" variant="secondary" />
			{@render value(tokens, tokensTooltip)}
		</div>
	{/if}
{/snippet}

{#snippet costItem()}
	{#if cost}
		<div class="tree-element-details__item">
			{@render value(cost, costTooltip)}
		</div>
	{/if}
{/snippet}

<style lang="scss">
	@use '../../styles/tokens' as *;

	.tree-element-details {
		display: inline-flex;
		gap: $space-2;
		align-items: center;

		// -- Item container --
		&__item {
			display: flex;
			gap: $space-0-5;
			align-items: center;
		}

		// -- Value text --
		&__value {
			color: var(--color-text-tertiary);
			white-space: nowrap;

			@include typography('body-small-regular');
		}

		&__error {
			color: var(--color-text-error);
		}
	}
</style>
