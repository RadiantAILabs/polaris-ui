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

<style lang="scss">
	@use './graph-view';
</style>
