<script lang="ts">
	import { cn, type WithElementRef } from '../../utils';
	import type { HTMLAttributes } from 'svelte/elements';
	import ChartStyle from './chart-style.svelte';
	import { setChartContext, type ChartConfig } from './chart-utils.js';

	const uid = $props.id();

	let {
		ref = $bindable(null),
		id = uid,
		class: className,
		children,
		config,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLElement>> & {
		config: ChartConfig;
	} = $props();

	const chartId = $derived(`chart-${id || uid.replace(/:/g, '')}`);

	setChartContext({
		get config() {
			return config;
		}
	});
</script>

<div
	bind:this={ref}
	data-chart={chartId}
	data-slot="chart"
	class={cn('chart', className)}
	{...restProps}
>
	<ChartStyle id={chartId} {config} />
	{@render children?.()}
</div>

<style lang="scss">
	@use './chart';
</style>
