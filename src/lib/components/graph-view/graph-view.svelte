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

<style lang="scss">
	@use './graph-view';
</style>
