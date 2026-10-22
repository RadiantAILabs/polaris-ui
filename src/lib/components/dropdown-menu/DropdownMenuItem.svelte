<script lang="ts">
	import './DropdownMenu.scss';
	import { Icon, type IconName } from '../icon';
	import { DropdownMenu as Menu } from 'bits-ui';
	import { cn } from '../../utils';
	let {
		ref = $bindable(null),
		class: className,
		children,
		child,
		icon,
		...props
	}: Menu.ItemProps & { icon?: IconName } = $props();
</script>

<Menu.Item bind:ref class={cn('polaris-menu-item', className)} {child} {...props}
	>{#if icon}<Icon name={icon} size="base" />{/if}<span class="polaris-menu-text"
		>{@render children?.()}</span
	></Menu.Item
>

<style lang="scss">
	@use '../../styles/floating';

	.polaris-menu-text {
		@include floating.text;
	}
</style>
