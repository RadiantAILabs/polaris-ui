<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Icon, type IconName } from '../icon';
	import { Tooltip } from '../tooltip';
	import { cn } from '../../utils';

	/** A metric shown beside a tree element, such as token count or cost. */
	export interface TreeElementMetric {
		/** Leading icon. Omit for a self-describing value such as a `$` cost. */
		icon?: IconName;
		/** Pre-formatted display value, e.g. `1.88k` or `$0.0125`. */
		value: string;
		/** Screen-reader label for the value, e.g. `1.88k tokens`. */
		ariaLabel: string;
		/** Tooltip content shown on hover. */
		tooltip?: Snippet;
	}

	export interface TreeElementDetailsProps {
		/** Time duration to display. */
		time?: string;
		/** Metrics to display after the time, in order. */
		metrics?: TreeElementMetric[];
		/** Status of the element. */
		status?: 'completed' | 'processing' | 'failed';
		/** Additional CSS class. */
		class?: string;
	}

	let { time, metrics = [], status, class: className }: TreeElementDetailsProps = $props();

	const ariaLabel = $derived.by(() => {
		if (status === 'processing') return time ? `Processing, ${time} elapsed` : 'Processing';
		const parts: string[] = [];
		if (status === 'failed') parts.push('Failed');
		if (time) parts.push(time);
		for (const metric of metrics) parts.push(metric.ariaLabel);
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
		{@render metricItems()}
	{:else}
		{#if time}
			<div class="tree-element-details__item">
				<span class="tree-element-details__value">{time}</span>
			</div>
		{/if}

		{@render metricItems()}
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

{#snippet metricItems()}
	{#each metrics as metric (metric.ariaLabel)}
		<div class="tree-element-details__item">
			{#if metric.icon}
				<Icon name={metric.icon} size="0.75rem" variant="secondary" />
			{/if}
			{@render value(metric.value, metric.tooltip)}
		</div>
	{/each}
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
