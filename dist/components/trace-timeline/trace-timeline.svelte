<script lang="ts">
	import { cn } from '../../utils';

	export interface TraceTimelineBar {
		/** Start time in milliseconds */
		startTime: number;
		/** Duration in milliseconds */
		duration: number;
		/** Optional label or identifier for the bar */
		label?: string;
	}

	export interface TraceTimelineProps {
		/** Array of bars to display in the timeline (null for empty rows) */
		bars: (TraceTimelineBar | null)[];
		/** Optional CSS class name */
		class?: string;
		/** Minimum pixels between grid lines (default: 80) */
		minGridSpacing?: number;
	}

	let { bars = [], class: className, minGridSpacing = 80 }: TraceTimelineProps = $props();

	let containerRef = $state<HTMLDivElement | null>(null);
	let containerWidth = $state(0);

	const DEFAULT_DURATION = 1000; // Default timeline duration (for empty state) in ms
	const DEFAULT_GRID_LINES_COUNT = 4; // Fallback grid line count
	const MIN_GRID_LINES_COUNT = 4; // Minimum grid lines for readability
	const TICK_LABEL_DECIMAL_PLACES = 2; // Time tick label precision

	interface TimeLabel {
		/** Formatted time value (e.g., "1.50s") */
		value: string;
		/** Horizontal position as percentage (0-100) */
		position: number;
	}

	interface BarStyle {
		/** Left offset as percentage (0-100) */
		left: number;
		/** Width as percentage (0-100) */
		width: number;
		/** Optional label for the bar */
		label?: string;
	}

	/**
	 * Calculate the total duration of the timeline based on the furthest data point
	 */
	const totalDuration = $derived.by(() => {
		if (bars.length === 0) return DEFAULT_DURATION;

		const maxEndTime = bars.reduce(
			(max, bar) => (bar ? Math.max(max, bar.startTime + bar.duration) : max),
			0
		);

		return maxEndTime || DEFAULT_DURATION;
	});

	/**
	 * Calculate the number of grid lines to be used, based on the container width.
	 *
	 * Ensures a minimum number of grid lines for small screens while respecting spacing on larger screens
	 */
	const gridLinesCount = $derived.by(() => {
		if (containerWidth === 0) return DEFAULT_GRID_LINES_COUNT;

		const spacingBasedGridLines = Math.floor(containerWidth / minGridSpacing);
		return Math.max(MIN_GRID_LINES_COUNT, spacingBasedGridLines);
	});

	/**
	 * Calculate the time interval between grid lines, in milliseconds.
	 *
	 * Rounds the interval to readable values: 1×, 2×, 5×, or 10× the magnitude
	 */
	function calculateGridLineTimeInterval(totalDurationMs: number, gridLinesCount: number): number {
		// Guard against invalid input, returning total duration as fallback
		if (gridLinesCount <= 0) return totalDurationMs;

		const calculatedInterval = totalDurationMs / gridLinesCount;

		const magnitude = Math.pow(10, Math.floor(Math.log10(calculatedInterval)));

		// Normalize the calculated interval to a value between 1 and 10
		const normalized = calculatedInterval / magnitude;

		let multiplier: number;
		if (normalized <= 1) multiplier = 1;
		else if (normalized <= 2) multiplier = 2;
		else if (normalized <= 5) multiplier = 5;
		else multiplier = 10;

		return multiplier * magnitude;
	}

	/**
	 * Calculate the time interval for grid lines, in milliseconds.
	 */
	const gridInterval = $derived.by(() => {
		return calculateGridLineTimeInterval(totalDuration, gridLinesCount);
	});

	/**
	 * Calculate the display scale for the timeline, ensuring at least one grid
	 * line appears after the last data point.
	 */
	const displayScale = $derived.by(() => {
		const total = totalDuration;
		const interval = gridInterval;

		// Round up to next interval boundary, adding extra interval if already aligned
		const ceiledTotal = Math.ceil(total / interval) * interval;
		return ceiledTotal === total ? total + interval : ceiledTotal;
	});

	/**
	 * Generate axis labels, in seconds, with positions as percentages
	 * Positions are rounded to whole pixels to prevent subpixel rendering inconsistencies
	 */
	const axisLabels = $derived.by((): TimeLabel[] => {
		const interval = gridInterval;
		const maxValue = displayScale;
		const width = containerWidth;

		const labels: TimeLabel[] = [];

		for (let timeMs = 0; timeMs <= maxValue; timeMs += interval) {
			const timeSec = timeMs / 1000;
			const positionPercent = (timeMs / maxValue) * 100;

			// Round to nearest pixel to prevent subpixel rendering thickness variations
			const positionPx = (positionPercent / 100) * width;
			const roundedPx = Math.round(positionPx);
			const roundedPercent = width > 0 ? (roundedPx / width) * 100 : positionPercent;

			labels.push({
				value: `${timeSec.toFixed(TICK_LABEL_DECIMAL_PLACES)} s`,
				position: roundedPercent
			});
		}

		return labels;
	});

	/**
	 * Calculate position and width for each bar as percentages
	 * Returns null for empty rows
	 */
	const barStyles = $derived.by((): (BarStyle | null)[] => {
		const scale = displayScale;

		return bars.map((bar) => {
			if (!bar) return null;
			return {
				left: (bar.startTime / scale) * 100,
				width: (bar.duration / scale) * 100,
				label: bar.label
			};
		});
	});

	/**
	 * Observe container width changes using ResizeObserver
	 * Captures initial width and responds to resize events
	 */
	$effect(() => {
		if (!containerRef) return;

		// Set initial width immediately
		containerWidth = containerRef.offsetWidth;

		const observer = new ResizeObserver((entries) => {
			const entry = entries[0];
			if (entry) {
				containerWidth = entry.contentRect.width;
			}
		});

		observer.observe(containerRef);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class={cn('tree-trace-timeline', className)} bind:this={containerRef}>
	<!-- SVG Grid and Labels -->
	<svg class="tree-trace-timeline__svg" role="presentation" aria-label="Time axis">
		{#each axisLabels as label, index (index)}
			<!-- Grid line -->
			<line
				class="tree-trace-timeline__grid-line"
				x1="{label.position}%"
				y1="0"
				x2="{label.position}%"
				y2="100%"
				aria-hidden="true"
			/>
			<!-- Axis label (skip the last one) -->
			{#if index < axisLabels.length - 1}
				<text
					class="tree-trace-timeline__axis-label"
					x="{label.position}%"
					y="0"
					dy="-1"
					dx="2"
					aria-label="Time marker {label.value}"
				>
					{label.value}
				</text>
			{/if}
		{/each}
	</svg>

	<!-- Timeline Bars -->
	<div class="tree-trace-timeline__bars" role="list" aria-label="Trace timeline visualization">
		{#each barStyles as bar, index (index)}
			{#if bar}
				<div
					class="tree-trace-timeline__bar"
					style:margin-left="{bar.left}%"
					style:width="{bar.width}%"
					role="listitem"
					aria-label={bar.label || `Trace span ${index + 1}`}
				>
					<div class="tree-trace-timeline__bar-start" aria-hidden="true"></div>
					<div class="tree-trace-timeline__bar-line" aria-hidden="true"></div>
					<div class="tree-trace-timeline__bar-end" aria-hidden="true"></div>
				</div>
			{:else}
				<div
					class="tree-trace-timeline__bar-empty"
					role="listitem"
					aria-label="No timeline data"
				></div>
			{/if}
		{/each}
	</div>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.tree-trace-timeline {
  position: relative;
  width: 100%;
  min-width: 160px;
  height: 100%;
}
.tree-trace-timeline__svg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}
.tree-trace-timeline__axis-label {
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.75rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  dominant-baseline: hanging;
  fill: var(--color-text-tertiary);
}
.tree-trace-timeline__grid-line {
  stroke: var(--color-charts-axes);
  stroke-width: 1;
}
.tree-trace-timeline__bars {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 0;
}
.tree-trace-timeline__bar {
  display: flex;
  align-items: center;
  min-width: 0;
  height: 2rem;
}
@media (prefers-reduced-motion: no-preference) {
  .tree-trace-timeline__bar {
    transition: all 150ms ease-in-out;
  }
}
.tree-trace-timeline__bar-start, .tree-trace-timeline__bar-end {
  flex-shrink: 0;
  width: 1px;
  height: 8px;
  background-color: var(--color-charts-primary);
}
.tree-trace-timeline__bar-line {
  flex: 1;
  min-width: 0;
  height: 4px;
  background-color: var(--color-charts-primary);
}
.tree-trace-timeline__bar-empty {
  height: 2rem;
}</style>
