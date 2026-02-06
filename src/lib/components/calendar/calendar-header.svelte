<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { cn } from '../../utils';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: CalendarPrimitive.HeaderProps = $props();
</script>

<CalendarPrimitive.Header bind:ref {...restProps}>
	{#snippet child({ props })}
		<div {...props} class={cn('calendar-header', className)}>
			{@render children?.()}
		</div>
	{/snippet}
</CalendarPrimitive.Header>

<style lang="scss">
	@use '../../styles/tokens' as *;

	.calendar-header {
		display: flex;
		gap: $space-1;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		@include typography('button-large');
	}
</style>
