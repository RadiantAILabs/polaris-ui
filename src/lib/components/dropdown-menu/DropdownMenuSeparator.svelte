<script lang="ts">
	import './DropdownMenu.scss';
	import { DropdownMenu as Menu } from 'bits-ui';
	import { cn } from '../../utils';
	let { class: className, ...props }: Menu.SeparatorProps = $props();
</script>

<Menu.Separator class={cn('polaris-menu-separator', className)} {...props} />
