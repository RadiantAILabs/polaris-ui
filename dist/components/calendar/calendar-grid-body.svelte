<script lang="ts">
	import { Calendar as CalendarPrimitive } from 'bits-ui';
	let { ref = $bindable(null), ...restProps }: CalendarPrimitive.GridBodyProps = $props();
</script>

<CalendarPrimitive.GridBody bind:ref {...restProps} />
