<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	import { Button } from '../button';

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: CalendarPrimitive.NextButtonProps = $props();
</script>

<CalendarPrimitive.NextButton bind:ref {...restProps}>
	{#snippet child({ props })}
		<Button {...props} icon="chevron-right" size="base" variant="invisible" class={className} />
	{/snippet}
</CalendarPrimitive.NextButton>
