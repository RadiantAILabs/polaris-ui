export interface PickerOption {
	/** Unique across all sections. */
	value: string;
	label: string;
	section?: string;
	disabled?: boolean;
}
