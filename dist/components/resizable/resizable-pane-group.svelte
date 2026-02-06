<script lang="ts">
	import { cn } from '../../utils';
	import * as ResizablePrimitive from 'paneforge';
	import './resizable.scss';

	let {
		ref = $bindable(null),
		this: paneGroup = $bindable(),
		class: className,
		...restProps
	}: ResizablePrimitive.PaneGroupProps & {
		this?: ResizablePrimitive.PaneGroup;
	} = $props();
</script>

<ResizablePrimitive.PaneGroup
	bind:this={paneGroup}
	data-slot="resizable-pane-group"
	class={cn('resizable-pane-group', className)}
	{...restProps}
/>
