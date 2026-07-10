<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { AreaChart, BarChart, LineChart } from 'layerchart';
	import { ChartContainer, ChartTooltip, type ChartConfig } from './index.js';

	const { Story } = defineMeta({
		title: 'Components/Chart',
		component: ChartContainer,
		parameters: {
			layout: 'padded'
		}
	});

	// Canonical shadcn-svelte sample dataset.
	const chartData = [
		{ month: 'January', desktop: 186, mobile: 80 },
		{ month: 'February', desktop: 305, mobile: 200 },
		{ month: 'March', desktop: 237, mobile: 120 },
		{ month: 'April', desktop: 73, mobile: 190 },
		{ month: 'May', desktop: 209, mobile: 130 },
		{ month: 'June', desktop: 214, mobile: 140 }
	];

	const chartConfig = {
		desktop: { label: 'Desktop', color: 'var(--color-charts-series-1)' },
		mobile: { label: 'Mobile', color: 'var(--color-charts-series-2)' }
	} satisfies ChartConfig;

	const series = [
		{ key: 'desktop', label: chartConfig.desktop.label, color: chartConfig.desktop.color },
		{ key: 'mobile', label: chartConfig.mobile.label, color: chartConfig.mobile.color }
	];

	// Shorten the month labels on the x-axis (e.g. "January" -> "Jan").
	const shortMonth = { xAxis: { format: (d: string) => d.slice(0, 3) } };

	// Demonstrate color palette.
	const paletteData = [
		{ day: 'Mon', opus: 320, sonnet: 610, haiku: 880, gpt: 240, llama: 150, gemini: 470 },
		{ day: 'Tue', opus: 400, sonnet: 560, haiku: 810, gpt: 300, llama: 210, gemini: 520 },
		{ day: 'Wed', opus: 380, sonnet: 700, haiku: 950, gpt: 280, llama: 260, gemini: 430 },
		{ day: 'Thu', opus: 450, sonnet: 640, haiku: 1020, gpt: 360, llama: 300, gemini: 560 },
		{ day: 'Fri', opus: 520, sonnet: 720, haiku: 1120, gpt: 410, llama: 340, gemini: 610 },
		{ day: 'Sat', opus: 300, sonnet: 480, haiku: 760, gpt: 220, llama: 180, gemini: 390 },
		{ day: 'Sun', opus: 280, sonnet: 450, haiku: 700, gpt: 200, llama: 160, gemini: 360 }
	];

	const paletteConfig = {
		opus: { label: 'Opus', color: 'var(--color-charts-series-1)' },
		sonnet: { label: 'Sonnet', color: 'var(--color-charts-series-2)' },
		haiku: { label: 'Haiku', color: 'var(--color-charts-series-3)' },
		gpt: { label: 'GPT-4o', color: 'var(--color-charts-series-4)' },
		llama: { label: 'Llama 3', color: 'var(--color-charts-series-5)' },
		gemini: { label: 'Gemini', color: 'var(--color-charts-series-6)' }
	} satisfies ChartConfig;

	const paletteSeries = [
		{ key: 'opus', label: paletteConfig.opus.label, color: paletteConfig.opus.color },
		{ key: 'sonnet', label: paletteConfig.sonnet.label, color: paletteConfig.sonnet.color },
		{ key: 'haiku', label: paletteConfig.haiku.label, color: paletteConfig.haiku.color },
		{ key: 'gpt', label: paletteConfig.gpt.label, color: paletteConfig.gpt.color },
		{ key: 'llama', label: paletteConfig.llama.label, color: paletteConfig.llama.color },
		{ key: 'gemini', label: paletteConfig.gemini.label, color: paletteConfig.gemini.color }
	];
</script>

<Story name="Bar">
	{#snippet template()}
		<div style="max-width: 640px;">
			<ChartContainer config={chartConfig}>
				<BarChart
					data={chartData}
					x="month"
					axis="x"
					legend
					seriesLayout="group"
					bandPadding={0.25}
					{series}
					props={shortMonth}
				>
					{#snippet tooltip()}
						<ChartTooltip />
					{/snippet}
				</BarChart>
			</ChartContainer>
		</div>
	{/snippet}
</Story>

<Story name="Stacked bar">
	{#snippet template()}
		<div style="max-width: 640px;">
			<ChartContainer config={chartConfig}>
				<BarChart
					data={chartData}
					x="month"
					axis="x"
					legend
					seriesLayout="stack"
					bandPadding={0.25}
					{series}
					props={shortMonth}
				>
					{#snippet tooltip()}
						<ChartTooltip />
					{/snippet}
				</BarChart>
			</ChartContainer>
		</div>
	{/snippet}
</Story>

<Story name="Area">
	{#snippet template()}
		<div style="max-width: 640px;">
			<ChartContainer config={chartConfig}>
				<AreaChart
					data={chartData}
					x="month"
					axis="x"
					legend
					seriesLayout="stack"
					tooltipContext={{ mode: 'band' }}
					{series}
					props={shortMonth}
				>
					{#snippet tooltip()}
						<ChartTooltip indicator="line" />
					{/snippet}
				</AreaChart>
			</ChartContainer>
		</div>
	{/snippet}
</Story>

<Story name="Line">
	{#snippet template()}
		<div style="max-width: 640px;">
			<ChartContainer config={chartConfig}>
				<LineChart
					data={chartData}
					x="month"
					axis="x"
					legend
					tooltipContext={{ mode: 'band' }}
					{series}
					props={shortMonth}
				>
					{#snippet tooltip()}
						<ChartTooltip indicator="dot" />
					{/snippet}
				</LineChart>
			</ChartContainer>
		</div>
	{/snippet}
</Story>

<Story name="Palette">
	{#snippet template()}
		<div style="max-width: 640px;">
			<ChartContainer config={paletteConfig}>
				<LineChart
					data={paletteData}
					x="day"
					axis="x"
					legend
					points
					tooltipContext={{ mode: 'band' }}
					series={paletteSeries}
				>
					{#snippet tooltip()}
						<ChartTooltip indicator="dot" />
					{/snippet}
				</LineChart>
			</ChartContainer>
		</div>
	{/snippet}
</Story>
