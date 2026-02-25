<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { GraphView } from '.';
	import type { GraphSpec } from './types';

	const { Story } = defineMeta({
		title: 'Components/GraphView',
		component: GraphView,
		parameters: {
			layout: 'padded'
		},
		tags: ['autodocs'],
		argTypes: {
			spec: {
				control: { type: 'object' },
				description: 'Graph specification to render'
			},
			activeNodeId: {
				control: { type: 'text' },
				description: 'ID of the currently active/executing node'
			}
		}
	});

	/** Sample ReAct agent graph specification. */
	const reactGraph: GraphSpec = {
		nodes: [
			{ id: 'n0', name: 'receive_input', nodeType: 'system' },
			{ id: 'n1', name: 'init_llm', nodeType: 'system' },
			{ id: 'n2', name: 'init_loop', nodeType: 'system' },
			{ id: 'n3', name: 'react_loop', nodeType: 'loop' },
			{ id: 'n4', name: 'reason', nodeType: 'system' },
			{ id: 'n5', name: 'action_decision', nodeType: 'decision' },
			{ id: 'n6', name: 'call_tool', nodeType: 'system' },
			{ id: 'n7', name: 'respond', nodeType: 'system' }
		],
		edges: [
			{ from: 'n0', to: 'n1', edgeType: 'sequential' },
			{ from: 'n1', to: 'n2', edgeType: 'sequential' },
			{ from: 'n2', to: 'n3', edgeType: 'sequential' },
			{ from: 'n3', to: 'n4', edgeType: 'sequential' },
			{ from: 'n4', to: 'n5', edgeType: 'sequential' },
			{ from: 'n5', to: 'n6', edgeType: 'conditional', label: 'use_tool' },
			{ from: 'n5', to: 'n7', edgeType: 'conditional', label: 'respond' },
			{ from: 'n6', to: 'n4', edgeType: 'loop_back' },
			{ from: 'n7', to: 'n3', edgeType: 'loop_back' }
		],
		entry: 'n0'
	};

	/** Simple linear graph with 3 nodes. */
	const linearGraph: GraphSpec = {
		nodes: [
			{ id: 'a', name: 'start', nodeType: 'system' },
			{ id: 'b', name: 'process', nodeType: 'system' },
			{ id: 'c', name: 'end', nodeType: 'system' }
		],
		edges: [
			{ from: 'a', to: 'b', edgeType: 'sequential' },
			{ from: 'b', to: 'c', edgeType: 'sequential' }
		],
		entry: 'a'
	};

	/** Graph with parallel branches. */
	const parallelGraph: GraphSpec = {
		nodes: [
			{ id: 'p0', name: 'start', nodeType: 'system' },
			{ id: 'p1', name: 'fork', nodeType: 'parallel' },
			{ id: 'p2', name: 'branch_a', nodeType: 'system' },
			{ id: 'p3', name: 'branch_b', nodeType: 'system' },
			{ id: 'p4', name: 'branch_c', nodeType: 'system' },
			{ id: 'p5', name: 'join', nodeType: 'join' },
			{ id: 'p6', name: 'finalize', nodeType: 'system' }
		],
		edges: [
			{ from: 'p0', to: 'p1', edgeType: 'sequential' },
			{ from: 'p1', to: 'p2', edgeType: 'parallel' },
			{ from: 'p1', to: 'p3', edgeType: 'parallel' },
			{ from: 'p1', to: 'p4', edgeType: 'parallel' },
			{ from: 'p2', to: 'p5', edgeType: 'sequential' },
			{ from: 'p3', to: 'p5', edgeType: 'sequential' },
			{ from: 'p4', to: 'p5', edgeType: 'sequential' },
			{ from: 'p5', to: 'p6', edgeType: 'sequential' }
		],
		entry: 'p0'
	};
</script>

<Story name="ReAct Agent Graph">
	{#snippet template()}
		<div style="height: 600px; width: 100%;">
			<GraphView
				spec={reactGraph}
				onNodeClick={(nodeId) => console.log('Clicked node:', nodeId)}
			/>
		</div>
	{/snippet}
</Story>

<Story name="With Active Node">
	{#snippet template()}
		<div style="height: 600px; width: 100%;">
			<GraphView
				spec={reactGraph}
				activeNodeId="n4"
				onNodeClick={(nodeId) => console.log('Clicked node:', nodeId)}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Simple Linear Graph">
	{#snippet template()}
		<div style="height: 400px; width: 100%;">
			<GraphView
				spec={linearGraph}
				onNodeClick={(nodeId) => console.log('Clicked node:', nodeId)}
			/>
		</div>
	{/snippet}
</Story>

<Story name="Parallel Branches">
	{#snippet template()}
		<div style="height: 600px; width: 100%;">
			<GraphView
				spec={parallelGraph}
				onNodeClick={(nodeId) => console.log('Clicked node:', nodeId)}
			/>
		</div>
	{/snippet}
</Story>
