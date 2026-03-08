<script lang="ts" module>
	export type { GraphViewProps, GraphSpec, GraphNodeData, GraphEdgeData } from './types';
</script>

<script lang="ts">
	import {
		SvelteFlow,
		Controls,
		Background,
		MiniMap,
		type Node,
		type Edge,
		type NodeTypes,
		type EdgeTypes
	} from '@xyflow/svelte';
	import '@xyflow/svelte/dist/base.css';
	import { cn } from '../../utils';
	import { computeLayout } from './layout';
	import GraphNode from './graph-node.svelte';
	import GraphEdge from './graph-edge.svelte';
	import type { GraphViewProps, GraphSpec } from './types';

	let {
		spec,
		activeNodeId,
		onNodeClick,
		class: className
	}: GraphViewProps = $props();

	const nodeTypes: NodeTypes = { custom: GraphNode } as unknown as NodeTypes;
	const edgeTypes: EdgeTypes = { custom: GraphEdge } as unknown as EdgeTypes;

	/**
	 * Convert GraphSpec to xyflow nodes and edges, then run dagre layout.
	 */
	function buildFlowData(graphSpec: GraphSpec, activeId?: string) {
		const rawNodes: Node[] = graphSpec.nodes.map((node) => ({
			id: node.id,
			type: 'custom',
			position: { x: 0, y: 0 },
			data: {
				...node,
				isActive: node.id === activeId,
				isEntry: node.id === graphSpec.entry
			}
		}));

		const edges: Edge[] = graphSpec.edges.map((edge, i) => ({
			id: `e-${edge.from}-${edge.to}-${i}`,
			source: edge.from,
			target: edge.to,
			type: 'custom',
			data: { edgeType: edge.edgeType, label: edge.label },
			label: edge.label || undefined,
			animated: edge.edgeType === 'loop_back'
		}));

		const nodes = computeLayout(rawNodes, edges);
		return { nodes, edges };
	}

	const flowData = $derived(buildFlowData(spec, activeNodeId));

	let nodes = $derived(flowData.nodes);
	let edges = $derived(flowData.edges);

	function handleNodeClick(_event: MouseEvent | TouchEvent, node: Node) {
		onNodeClick?.(node.id);
	}
</script>

<div class={cn('graph-view', className)}>
	<SvelteFlow
		bind:nodes
		bind:edges
		{nodeTypes}
		{edgeTypes}
		fitView
		nodesDraggable={false}
		nodesConnectable={false}
		elementsSelectable={true}
		onnodeclick={handleNodeClick}
	>
		<Controls />
		<Background />
		<MiniMap />
	</SvelteFlow>
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
