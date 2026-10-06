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
		/** Error tooltip and optional action, independent of the element’s own status. */
		error?: { message: string; onClick?: () => void };
		/** Metrics to display after the time, in order. */
		metrics?: TreeElementMetric[];
		/** Status of the element. */
		status?: 'completed' | 'processing' | 'failed';
		/** Additional CSS class. */
		class?: string;
	}

	let { time, error, metrics = [], status, class: className }: TreeElementDetailsProps = $props();

	const ariaLabel = $derived.by(() => {
		if (status === 'processing')
			return [time ? `Processing, ${time} elapsed` : 'Processing', error?.message]
				.filter(Boolean)
				.join(', ');
		const parts: string[] = [];
		if (error) parts.push(error.message);
		else if (status === 'failed') parts.push('Failed');
		if (time) parts.push(time);
		for (const metric of metrics) parts.push(metric.ariaLabel);
		return parts.length > 0 ? parts.join(', ') : undefined;
	});
</script>

<div
	class={cn(
		'tree-element-details',
		{ 'tree-element-details--error': status === 'failed' || !!error },
		className
	)}
	role="status"
	aria-label={ariaLabel}
>
	{#if status === 'processing'}
		<Icon name="loader" size="small" variant="secondary" animation="spin" />
		{#if error}{@render errorIndicator()}{/if}
		{#if time}
			<span class="tree-element-details__value">{time}</span>
		{/if}
	{:else if status === 'failed' || error}
		<div class="tree-element-details__item">
			{@render errorIndicator()}
			{#if time}
				<span class="tree-element-details__value">{time}</span>
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

{#snippet errorIndicator()}
	{#if error}
		<Tooltip text={error.message} align="end">
			{#snippet trigger({ props })}
				{#if error.onClick}
					<button
						{...props}
						type="button"
						class="tree-element-details__error"
						aria-label={error.message}
						onclick={(event) => {
							event.stopPropagation();
							error?.onClick?.();
						}}
						onkeydown={(event) => event.stopPropagation()}
					>
						<Icon name="alert-circle" size="small" variant="error" />
					</button>
				{:else}
					<span {...props} class="tree-element-details__error" aria-label={error.message}>
						<Icon name="alert-circle" size="small" variant="error" />
					</span>
				{/if}
			{/snippet}
		</Tooltip>
	{:else}
		<Icon name="alert-circle" size="small" variant="error" />
	{/if}
{/snippet}

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
				<Icon
					name={metric.icon}
					size="small"
					variant={status === 'failed' || error ? 'error' : 'secondary'}
				/>
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

		&__error {
			display: inline-flex;
			align-items: center;
			padding: 0;
			color: var(--color-text-error);
			background: transparent;
			border: 0;
		}

		button.tree-element-details__error {
			cursor: pointer;
		}

		&__error:focus-visible {
			outline: 2px solid currentcolor;
			outline-offset: 2px;
		}

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

		&--error &__value {
			color: var(--color-text-error);
		}
	}
</style>
