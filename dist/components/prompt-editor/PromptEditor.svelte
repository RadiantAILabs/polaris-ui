<script lang="ts" module>
	export type UsedParameter = {
		value: string;
		isValid: boolean;
	};

	export type PromptEditorProps = {
		/** The current value of the input, bindable with `bind:value`. */
		value?: string;
		/** Placeholder text to show when the input is empty. */
		placeholder?: string;
		/** Whether the input is disabled and read-only. */
		disabled?: boolean;
		/** Parameters users may include in the template. */
		parameters?: string[];
		/** Used parameters extracted from the template, bindable with `bind:usedParameters`. */
		usedParameters?: UsedParameter[];
		/** Whether there are any validation errors, bindable with `bind:hasError`. */
		hasError?: boolean;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: boolean;
		'aria-errormessage'?: string;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorView } from '@codemirror/view';
	import { SvelteSet } from 'svelte/reactivity';

	import MultilineInput from '../multilineinput/MultilineInput.svelte';
	import ParameterInputPane from './ParameterInputPane.svelte';
	import { createParameterDecorator, PARAMETER_REGEX } from './ParameterDecorator.js';

	// Component props
	let {
		value = $bindable(''),
		parameters = [],
		disabled = false,
		placeholder = '',
		usedParameters = $bindable([]),
		hasError = $bindable(false),
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrormessage
	}: PromptEditorProps = $props();

	let isDropdownOpen = $state(false);

	// Access the CodeMirror editor from MultilineInput
	let multilineInputRef: MultilineInput;
	let editorView: EditorView | null = null;

	// Track invalid parameters for decoration
	let invalidParams = new SvelteSet<string>();

	// Get extensions for MultilineInput
	let extensions = $derived([createParameterDecorator(() => invalidParams)]);

	// Access the editor view from MultilineInput after it's mounted
	onMount(() => {
		// Wait for MultilineInput to be ready
		const checkEditor = () => {
			const currentEditorView = multilineInputRef?.getEditorView?.();
			if (currentEditorView) {
				editorView = currentEditorView;
			} else {
				// Retry if editor not ready yet
				setTimeout(checkEditor, 10);
			}
		};
		checkEditor();
	});

	// Extract used parameters and update decorator when value or options change
	$effect(() => {
		const regex = new RegExp(PARAMETER_REGEX.source, 'g');
		let match;
		const newInvalidParams = new SvelteSet<string>();
		const extractedParams: UsedParameter[] = [];

		while ((match = regex.exec(value))) {
			const isEscaped = match[1];
			if (isEscaped) continue; // Skip escaped parameters

			const paramValue = match[2] || '';
			const isValid = parameters.includes(paramValue);

			// Add to extracted parameters
			extractedParams.push({
				value: paramValue,
				isValid
			});

			// Track invalid params for decoration
			if (!isValid) {
				newInvalidParams.add(paramValue);
			}
		}

		// Update used parameters
		usedParameters = extractedParams;

		// Update hasError based on whether there are any invalid parameters
		hasError = newInvalidParams.size > 0;

		// Update invalid params and trigger decorator update
		invalidParams = newInvalidParams;
		if (editorView) {
			// Force decorator to update by dispatching a view update
			editorView.dispatch({});
		}
	});

	function handleInsertPlaceholder(placeholderValue: string) {
		// Defer to next event loop tick to ensure CodeMirror state is stable
		setTimeout(() => {
			if (!editorView || disabled) return;

			const placeholderText = `{{${placeholderValue}}}`;
			const insertPosition = editorView.state.selection.main.head;
			const finalPosition = insertPosition + placeholderText.length;

			editorView.dispatch({
				changes: { from: insertPosition, insert: placeholderText },
				selection: { head: finalPosition, anchor: finalPosition },
				scrollIntoView: true
			});

			// Ensure focus returns to editor after dropdown closes
			setTimeout(() => {
				editorView?.focus();
			}, 10);
		});
	}
</script>

<MultilineInput
	bind:this={multilineInputRef}
	bind:value
	{disabled}
	{placeholder}
	{extensions}
	isActive={isDropdownOpen}
	aria-label={ariaLabel}
	aria-labelledby={ariaLabelledby}
	aria-describedby={ariaDescribedby}
	aria-invalid={ariaInvalid || hasError}
	aria-errormessage={ariaErrormessage}
>
	{#snippet headerPane()}
		<ParameterInputPane
			{parameters}
			onInsertPlaceholder={handleInsertPlaceholder}
			{disabled}
			onDropdownOpenChange={(open) => (isDropdownOpen = open)}
		/>
	{/snippet}
</MultilineInput>
