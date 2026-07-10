<script lang="ts">
	import { cn, type WithElementRef, type WithoutChildren } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import { getPayloadConfigFromPayload, useChart, type TooltipPayload } from './chart-utils.js';
	import { getChartContext, Tooltip as TooltipPrimitive } from 'layerchart';
	import type { Snippet } from 'svelte';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	function defaultFormatter(value: any) {
		return `${value}`;
	}

	let {
		ref = $bindable(null),
		class: className,
		hideLabel = false,
		indicator = 'dot',
		hideIndicator = false,
		labelKey,
		label,
		labelFormatter = defaultFormatter,
		labelClassName,
		formatter,
		nameKey,
		color,
		...restProps
	}: WithoutChildren<WithElementRef<HTMLAttributes<HTMLDivElement>>> & {
		hideLabel?: boolean;
		label?: string;
		indicator?: 'line' | 'dot' | 'dashed';
		nameKey?: string;
		labelKey?: string;
		hideIndicator?: boolean;
		labelClassName?: string;
		labelFormatter?: // eslint-disable-next-line @typescript-eslint/no-explicit-any
			((value: any, payload: TooltipPayload[]) => string | number | Snippet) | null;
		formatter?: Snippet<
			[
				{
					value: unknown;
					name: string;
					item: TooltipPayload;
					index: number;
					payload: TooltipPayload[];
				}
			]
		>;
	} = $props();

	const chart = useChart();
	const chartCtx = getChartContext();

	// Filter to series with defined values (important for item-based charts like Pie/Arc
	// where only the hovered item has a value)
	const visibleSeries = $derived(
		chartCtx.tooltip.series.filter((s: TooltipPayload) => s.value !== undefined)
	);

	const formattedLabel = $derived.by(() => {
		if (hideLabel || !visibleSeries?.length) return null;
		const [item] = visibleSeries;
		if (!item) return null;
		const tooltipData = chartCtx.tooltip.data;
		// Get the x-axis label value from the raw tooltip data (e.g. a Date or month string)
		const dataLabel = tooltipData != null ? chartCtx.x(tooltipData) : undefined;
		const key = labelKey ?? item?.label ?? item?.key ?? 'value';
		const itemConfig = getPayloadConfigFromPayload(
			chart.config,
			item,
			key,
			tooltipData as Record<string, unknown> | null
		);
		let value: unknown;
		if (!labelKey && typeof label === 'string') {
			value = chart.config[label as keyof typeof chart.config]?.label ?? label;
		} else if (labelKey) {
			value = itemConfig?.label ?? dataLabel;
		} else {
			value = dataLabel;
		}
		if (value === undefined) return null;
		if (!labelFormatter) return value;
		return labelFormatter(value, visibleSeries);
	});

	const nestLabel = $derived(visibleSeries.length === 1 && indicator !== 'dot');
</script>

{#snippet TooltipLabel()}
	{#if formattedLabel}
		<div class={cn('chart-tooltip__label', labelClassName)}>
			{#if typeof formattedLabel === 'function'}
				{@render formattedLabel()}
			{:else}
				{formattedLabel}
			{/if}
		</div>
	{/if}
{/snippet}

<TooltipPrimitive.Root variant="none">
	<div bind:this={ref} class={cn('chart-tooltip', className)} {...restProps}>
		{#if !nestLabel}
			{@render TooltipLabel()}
		{/if}
		<div class="chart-tooltip__items">
			{#each visibleSeries as item, i (item.key + i)}
				{@const key = `${nameKey || item.key || item.label || 'value'}`}
				{@const itemConfig = getPayloadConfigFromPayload(
					chart.config,
					item,
					key,
					chartCtx.tooltip.data
				)}
				{@const indicatorColor = color || item.config?.color || item.color}
				<div
					class={cn('chart-tooltip__item', {
						'chart-tooltip__item--dot': indicator === 'dot'
					})}
				>
					{#if formatter && item.value !== undefined && item.label}
						{@render formatter({
							value: item.value,
							name: item.label,
							item,
							index: i,
							payload: visibleSeries
						})}
					{:else}
						{#if itemConfig?.icon}
							<itemConfig.icon />
						{:else if !hideIndicator}
							<div
								style="

--color-bg: {indicatorColor}; --color-border: {indicatorColor};"
								class={cn('chart-tooltip__indicator', {
									'chart-tooltip__indicator--dot': indicator === 'dot',
									'chart-tooltip__indicator--line': indicator === 'line',
									'chart-tooltip__indicator--dashed': indicator === 'dashed',
									'chart-tooltip__indicator--nested': nestLabel && indicator === 'dashed'
								})}
							></div>
						{/if}
						<div
							class={cn('chart-tooltip__content', {
								'chart-tooltip__content--nested': nestLabel
							})}
						>
							<div class="chart-tooltip__label-group">
								{#if nestLabel}
									{@render TooltipLabel()}
								{/if}
								<span class="chart-tooltip__name">
									{itemConfig?.label || item.label}
								</span>
							</div>
							{#if item.value !== undefined}
								<span class="chart-tooltip__value">
									{item.value.toLocaleString()}
								</span>
							{/if}
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</TooltipPrimitive.Root>

<style lang="scss">
	@use './chart-tooltip';
</style>
