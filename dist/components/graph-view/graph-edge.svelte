<script lang="ts">
	import {
		BaseEdge,
		getBezierPath,
		getSmoothStepPath,
		type EdgeProps
	} from '@xyflow/svelte';

	let {
		id,
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
		data,
		label,
		markerEnd,
		markerStart
	}: EdgeProps = $props();

	type EdgeData = { edgeType: string; label?: string };

	const edgeData = $derived(data as unknown as EdgeData | undefined);
	const edgeType = $derived(edgeData?.edgeType ?? 'sequential');

	/** Use smoothstep for loop_back edges, bezier for everything else. */
	const pathResult = $derived.by(() => {
		if (edgeType === 'loop_back') {
			return getSmoothStepPath({
				sourceX,
				sourceY,
				sourcePosition,
				targetX,
				targetY,
				targetPosition,
				borderRadius: 16
			});
		}

		return getBezierPath({
			sourceX,
			sourceY,
			sourcePosition,
			targetX,
			targetY,
			targetPosition
		});
	});

	const edgePath = $derived(pathResult[0]);
	const labelX = $derived(pathResult[1]);
	const labelY = $derived(pathResult[2]);

	/** Map edge types to CSS classes for styling. */
	const edgeClassMap: Record<string, string> = {
		sequential: 'graph-edge--sequential',
		conditional: 'graph-edge--conditional',
		parallel: 'graph-edge--parallel',
		loop_back: 'graph-edge--loop-back',
		error: 'graph-edge--error',
		timeout: 'graph-edge--timeout'
	};

	const edgeClass = $derived(edgeClassMap[edgeType] ?? 'graph-edge--sequential');
</script>

<g class="graph-edge {edgeClass}">
	<BaseEdge
		{id}
		path={edgePath}
		{markerEnd}
		{markerStart}
	/>
	{#if label}
		<foreignObject
			x={labelX - 40}
			y={labelY - 10}
			width="80"
			height="20"
			class="graph-edge__label-container"
		>
			<div class="graph-edge__label">
				{label}
			</div>
		</foreignObject>
	{/if}
</g>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.graph-edge :global(.svelte-flow__edge-path) {
  stroke: var(--color-text-tertiary);
  stroke-width: 1.5;
}
.graph-edge--conditional :global(.svelte-flow__edge-path) {
  stroke-dasharray: 6 3;
}
.graph-edge--parallel :global(.svelte-flow__edge-path) {
  stroke: var(--color-charts-primary);
  stroke-width: 2;
}
.graph-edge--loop-back :global(.svelte-flow__edge-path) {
  stroke: var(--color-text-warning);
  stroke-width: 1.5;
}
.graph-edge--error :global(.svelte-flow__edge-path) {
  stroke: var(--color-text-error);
  stroke-dasharray: 6 3;
}
.graph-edge--timeout :global(.svelte-flow__edge-path) {
  stroke: var(--color-text-warning);
  stroke-dasharray: 6 3;
}

.graph-edge__label-container {
  overflow: visible;
}

.graph-edge__label {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1px 0.25rem;
  border-radius: 2px;
  background: var(--color-background-raised);
  color: var(--color-text-tertiary);
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  pointer-events: none;
  text-align: center;
}</style>
