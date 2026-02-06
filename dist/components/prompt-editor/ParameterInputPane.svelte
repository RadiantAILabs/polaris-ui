<script lang="ts" module>
	export type ParameterInputPaneProps = {
		parameters?: string[];
		onInsertPlaceholder?: (value: string) => void;
		disabled?: boolean;
		onDropdownOpenChange?: (isOpen: boolean) => void;
	};
</script>

<script lang="ts">
	import { DropdownMenu } from '../dropdown-menu';

	let {
		parameters = [],
		onInsertPlaceholder,
		disabled = false,
		onDropdownOpenChange
	}: ParameterInputPaneProps = $props();

	let dropdownOpen = $state(false);

	// Track if dropdown is open
	$effect(() => {
		onDropdownOpenChange?.(dropdownOpen);
	});

	function handleSelect(value: string) {
		onInsertPlaceholder?.(value);
	}
</script>

<div class="placeholders-input-pane">
	<DropdownMenu
		buttonLabel="Add parameter"
		items={parameters.map((opt) => opt)}
		onSelect={handleSelect}
		align="start"
		disabled={disabled || parameters.length === 0}
		bind:open={dropdownOpen}
	/>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.placeholders-input-pane {
  display: flex;
  gap: 0.5rem;
  width: 100%;
  padding: 0.5rem;
}</style>
