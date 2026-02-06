<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.GridProps = $props();
</script>

<CalendarPrimitive.Grid bind:ref {...restProps}>
	{#snippet child({ props })}
		<table {...props} class={cn('calendar-grid', className)}>
			{@render children?.()}
		</table>
	{/snippet}
</CalendarPrimitive.Grid>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.calendar-grid {
		display: flex;
		flex-direction: column;
		gap: $space-1;
		width: 100%;
		border-collapse: collapse;
	}
</style>
