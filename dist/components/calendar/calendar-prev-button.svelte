<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { Button } from '../button';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.PrevButtonProps = $props();
</script>

<CalendarPrimitive.PrevButton bind:ref {...restProps}>
	{#snippet child({ props })}
		<Button {...props} icon="chevron-left" size="base" variant="invisible" class={className} />
	{/snippet}
</CalendarPrimitive.PrevButton>
