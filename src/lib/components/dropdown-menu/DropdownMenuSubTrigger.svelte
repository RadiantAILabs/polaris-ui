<script lang="ts">
	import './DropdownMenu.scss';
	import { DropdownMenu as Menu, type WithoutChild } from 'bits-ui';
	import { Icon } from '../icon';
	import { cn } from '../../utils';
	let {
		ref = $bindable(null),
		class: className,
		children,
		...props
	}: WithoutChild<Menu.SubTriggerProps> = $props();
</script>

<Menu.SubTrigger bind:ref class={cn('polaris-menu-item', className)} {...props}
	><span class="polaris-menu-text">{@render children?.()}</span><Icon
		name="chevron-right"
		size="small"
	/></Menu.SubTrigger
>

<style lang="scss">
	@use '../../styles/floating';

	.polaris-menu-text {
		@include floating.text;
	}
</style>
