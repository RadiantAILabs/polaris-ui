<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';

	let { ref = $bindable(null), ...restProps }: CalendarPrimitive.GridRowProps = $props();
</script>

<CalendarPrimitive.GridRow bind:ref {...restProps} />
