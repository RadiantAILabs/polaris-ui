<script lang="ts">
	import { Handle, Position, type NodeProps } from '@xyflow/svelte';
	import { cn } from '../../utils';
	import type { GraphNodeData } from './types';

	type GraphNodeInternalData = GraphNodeData & { isActive?: boolean; isEntry?: boolean };

	let { data }: NodeProps = $props();

	const nodeData = $derived(data as unknown as GraphNodeInternalData);

	const typeStyles: Record<string, string> = {
		system: 'graph-node--system',
		decision: 'graph-node--decision',
		switch: 'graph-node--switch',
		loop: 'graph-node--loop',
		parallel: 'graph-node--parallel',
		join: 'graph-node--join'
	};

	const typeLabels: Record<string, string> = {
		system: 'SYS',
		decision: 'DEC',
		switch: 'SWI',
		loop: 'LOOP',
		parallel: 'PAR',
		join: 'JOIN'
	};
</script>

<div
	class={cn(
		'graph-node',
		typeStyles[nodeData.nodeType],
		nodeData.isActive && 'graph-node--active',
		nodeData.isEntry && 'graph-node--entry'
	)}
>
	<span class="graph-node__type">{typeLabels[nodeData.nodeType]}</span>
	<span class="graph-node__name">{nodeData.name}</span>
	<Handle type="target" position={Position.Top} />
	<Handle type="source" position={Position.Bottom} />
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.graph-view {
  width: 100%;
  height: 100%;
  min-height: 400px;
}

.graph-node {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid var(--color-border-base);
  border-radius: 2px;
  background: var(--color-background-raised);
  font-family: var(--font-family-base);
  cursor: pointer;
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
@media (prefers-reduced-motion: no-preference) {
  .graph-node {
    transition: all 150ms ease-in-out;
  }
}
.graph-node--active {
  border-color: var(--color-charts-primary);
  box-shadow: 0 0 0 2px var(--color-charts-primary);
}
.graph-node--entry {
  border-left: 3px solid var(--color-charts-primary);
}
.graph-node__type {
  color: var(--color-text-tertiary);
  font-family: var(--font-family-code);
  font-family: "Hanken Grotesk", system-ui, sans-serif;
  font-size: 0.6875rem;
  font-weight: 500;
  line-height: 16px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.graph-node__name {
  color: var(--color-text-primary);
}
.graph-node--decision, .graph-node--switch {
  border-style: dashed;
}
.graph-node--loop {
  border-color: var(--color-text-warning);
}
.graph-node--parallel {
  border-left: 3px double var(--color-charts-primary);
}</style>
