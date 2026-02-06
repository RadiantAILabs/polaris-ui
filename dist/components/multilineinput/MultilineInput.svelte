<script lang="ts" module>
	import type { Extension } from '@codemirror/state';
	import type { Snippet } from 'svelte';

	export type MultilineInputProps = {
		/** The current value of the input, bindable with `bind:value`. */
		value?: string;
		/** Placeholder text to show when the input is empty. */
		placeholder?: string;
		/** Whether the input is disabled and read-only. */
		disabled?: boolean;
		/** Whether the input is read-only. */
		readonly?: boolean;
		/** Show a copy button to copy the content. */
		showCopyButton?: boolean;
		/** Additional CodeMirror extensions to include */
		extensions?: Extension[];
		/** Optional header content rendered above the editor */
		headerPane?: Snippet;
		/** Whether the input should be styled as active (e.g., when a dropdown in header pane is open) */
		isActive?: boolean;
		/** Callback fired when the value changes */
		onValueChange?: (value: string) => void;
		/** Name attribute for form integration */
		name?: string;
		'aria-label'?: string;
		'aria-labelledby'?: string;
		'aria-describedby'?: string;
		'aria-invalid'?: boolean;
		'aria-errormessage'?: string;
		class?: string;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import { EditorState, Compartment } from '@codemirror/state';
	import { EditorView, lineNumbers, keymap, placeholder as cmPlaceholder } from '@codemirror/view';
	import { defaultKeymap, history } from '@codemirror/commands';
	import { cn } from '../../utils';
	import { Button } from '../button';

	// Component props
	let {
		value = $bindable(''),
		disabled = false,
		readonly = false,
		showCopyButton = false,
		placeholder = '',
		extensions = [],
		headerPane,
		isActive = false,
		onValueChange,
		name,
		'aria-label': ariaLabel,
		'aria-labelledby': ariaLabelledby,
		'aria-describedby': ariaDescribedby,
		'aria-invalid': ariaInvalid,
		'aria-errormessage': ariaErrormessage,
		class: className
	}: MultilineInputProps = $props();

	// Copy button behavior constants
	const COPY_BUTTON_HIDE_DELAY_MS = 2000;
	const COPY_BUTTON_COPIED_STATE_DURATION_MS = 2000;

	let copyButtonCopied = $state(false);
	let copyButtonVisible = $state(false);
	let copyButtonHovered = $state(false);
	let copyButtonHideTimeout: ReturnType<typeof setTimeout> | null = null;
	let copyButtonCopiedTimeout: ReturnType<typeof setTimeout> | null = null;

	// Determine if editor should be read-only
	const isReadOnly = $derived(disabled || readonly);

	// CodeMirror elements
	let editorContainer: HTMLDivElement;
	let editorView: EditorView | null = null;
	let hiddenInput: HTMLInputElement | null = $state(null);
	const readOnlyCompartment = new Compartment();
	const placeholderCompartment = new Compartment();
	const attributesCompartment = new Compartment();

	// Export editorView for external access (e.g., PromptEditor)
	export function getEditorView(): EditorView | null {
		return editorView;
	}

	function clearCopyButtonHideTimeout() {
		if (copyButtonHideTimeout) {
			clearTimeout(copyButtonHideTimeout);
			copyButtonHideTimeout = null;
		}
	}

	function clearCopyButtonCopiedTimeout() {
		if (copyButtonCopiedTimeout) {
			clearTimeout(copyButtonCopiedTimeout);
			copyButtonCopiedTimeout = null;
		}
	}

	function scheduleCopyButtonHide() {
		clearCopyButtonHideTimeout();
		copyButtonHideTimeout = setTimeout(() => {
			if (!copyButtonHovered) {
				copyButtonVisible = false;
			}
		}, COPY_BUTTON_HIDE_DELAY_MS);
	}

	function handleEditorMouseMove() {
		if (copyButtonHovered) return;

		copyButtonVisible = true;
		scheduleCopyButtonHide();
	}

	function handleEditorMouseLeave() {
		if (copyButtonHovered) return;

		if (copyButtonCopied) {
			// Keep visible until copied state expires
			return;
		}

		copyButtonVisible = false;
		clearCopyButtonHideTimeout();
	}

	function handleCopyButtonMouseEnter() {
		copyButtonHovered = true;
		clearCopyButtonHideTimeout();
	}

	function handleCopyButtonMouseLeave() {
		copyButtonHovered = false;

		if (copyButtonCopied) {
			// Still in copied state, schedule hide after copied state expires
			return;
		}

		scheduleCopyButtonHide();
	}

	async function handleCopyButtonClick() {
		try {
			await navigator.clipboard.writeText(value);
			copyButtonCopied = true;

			clearCopyButtonCopiedTimeout();
			copyButtonCopiedTimeout = setTimeout(() => {
				copyButtonCopied = false;

				if (!copyButtonHovered) {
					scheduleCopyButtonHide();
				}
			}, COPY_BUTTON_COPIED_STATE_DURATION_MS);
		} catch (err) {
			console.error('Failed to copy:', err);
		}
	}

	// Helper function to get current ARIA attributes
	function getAriaAttributes() {
		return {
			role: 'textbox',
			'aria-multiline': 'true',
			...(ariaLabel && { 'aria-label': ariaLabel }),
			...(ariaLabelledby && { 'aria-labelledby': ariaLabelledby }),
			...(ariaDescribedby && { 'aria-describedby': ariaDescribedby }),
			...(ariaInvalid !== undefined && { 'aria-invalid': ariaInvalid.toString() }),
			...(ariaErrormessage && { 'aria-errormessage': ariaErrormessage })
		};
	}

	// CodeMirror Setup
	onMount(() => {
		const startState = EditorState.create({
			doc: value || '',
			extensions: [
				lineNumbers(),
				history(),
				keymap.of(defaultKeymap),
				EditorView.lineWrapping,
				readOnlyCompartment.of([
					EditorState.readOnly.of(isReadOnly),
					...(isReadOnly ? [EditorView.editable.of(false)] : [])
				]),
				placeholderCompartment.of(cmPlaceholder(placeholder)),
				attributesCompartment.of(EditorView.contentAttributes.of(getAriaAttributes())),
				EditorView.updateListener.of((update) => {
					if (update.docChanged) {
						const newValue = update.state.doc.toString();
						value = newValue;
						onValueChange?.(newValue);
					}
				}),
				// Add focus/blur tracking to trigger form validation
				EditorView.domEventHandlers({
					blur: () => {
						// Dispatch a blur event on the hidden input so the form can detect it
						if (hiddenInput) {
							hiddenInput.dispatchEvent(new FocusEvent('blur', { bubbles: true }));
						}
						return false;
					}
				}),
				...extensions
			]
		});

		editorView = new EditorView({
			state: startState,
			parent: editorContainer
		});

		return () => {
			editorView?.destroy();
			clearCopyButtonHideTimeout();
			clearCopyButtonCopiedTimeout();
		};
	});

	// Update editor when external value changes
	$effect(() => {
		if (editorView && value !== undefined) {
			const editorDoc = editorView.state.doc.toString();
			if (value !== editorDoc) {
				editorView.dispatch({
					changes: { from: 0, to: editorDoc.length, insert: value }
				});
			}
		}
	});

	// Update readonly state
	$effect(() => {
		if (editorView) {
			editorView.dispatch({
				effects: [
					readOnlyCompartment.reconfigure([
						EditorState.readOnly.of(isReadOnly),
						...(isReadOnly ? [EditorView.editable.of(false)] : [])
					])
				]
			});
		}
	});

	// Update placeholder
	$effect(() => {
		if (editorView) {
			editorView.dispatch({
				effects: placeholderCompartment.reconfigure(cmPlaceholder(placeholder))
			});
		}
	});

	// Update ARIA attributes when they change
	$effect(() => {
		if (editorView) {
			// Track all ARIA-related props to trigger updates when they change
			// The effect will re-run when any of these values change
			void [ariaLabel, ariaLabelledby, ariaDescribedby, ariaInvalid, ariaErrormessage];

			editorView.dispatch({
				effects: attributesCompartment.reconfigure(
					EditorView.contentAttributes.of(getAriaAttributes())
				)
			});
		}
	});
</script>

<div
	class={cn(
		'multiline-input__wrapper',
		{
			__interactive: !isReadOnly,
			'is-error': ariaInvalid,
			'is-disabled': disabled,
			'is-active': isActive,
			'has-header': headerPane
		},
		className
	)}
>
	<!-- Hidden input for form integration - allows blur events to bubble up to form -->
	{#if name}
		<input
			bind:this={hiddenInput}
			type="text"
			{name}
			tabindex="-1"
			aria-hidden="true"
			style="position: absolute; left: -9999px; width: 1px; height: 1px;"
		/>
	{/if}
	{#if headerPane}
		<div class="multiline-input__header">
			{@render headerPane()}
		</div>
	{/if}
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="multiline-input__editor-wrapper"
		onmousemove={showCopyButton ? handleEditorMouseMove : undefined}
		onmouseleave={showCopyButton ? handleEditorMouseLeave : undefined}
	>
		<div class="multiline-input__editor-container">
			{#if showCopyButton}
				<div class="multiline-input__copy-button" class:is-visible={copyButtonVisible}>
					<Button
						variant="invisible"
						size="small"
						icon={copyButtonCopied ? 'check' : 'copy'}
						onclick={handleCopyButtonClick}
						onmouseenter={handleCopyButtonMouseEnter}
						onmouseleave={handleCopyButtonMouseLeave}
						aria-label={copyButtonCopied ? 'Copied!' : 'Copy code'}
					/>
				</div>
			{/if}
			<div bind:this={editorContainer}></div>
		</div>
	</div>
</div>

<style>/* Primitive design tokens (Do not use directly) */
.w-full {
  width: 100%;
}

.multiline-input__wrapper {
  width: 100%;
  overflow: hidden;
  background-color: var(--color-control-background-rest);
  border: 1px solid var(--color-control-border-rest);
  border-radius: 2px;
}
@media (prefers-reduced-motion: no-preference) {
  .multiline-input__wrapper {
    transition: all 150ms ease-in-out;
  }
}
.multiline-input__wrapper.__interactive:hover {
  background-color: var(--color-control-background-hover);
  border-color: var(--color-control-border-hover);
}
.multiline-input__wrapper.__interactive:hover .multiline-input__editor-wrapper :global(.cm-gutters) {
  border-color: var(--color-control-border-hover);
}
.multiline-input__wrapper.__interactive:focus-within, .multiline-input__wrapper.is-active {
  background-color: var(--color-control-background-active);
  border-color: var(--color-control-border-active);
}
.multiline-input__wrapper.__interactive:focus-within .multiline-input__editor-wrapper :global(.cm-gutters), .multiline-input__wrapper.is-active .multiline-input__editor-wrapper :global(.cm-gutters) {
  border-color: var(--color-control-border-active);
}
.multiline-input__wrapper.is-disabled {
  background-color: var(--color-background-disabled);
  border-color: var(--color-control-border-disabled);
}
.multiline-input__wrapper.is-disabled .multiline-input__editor-wrapper :global(.cm-gutters) {
  border-color: var(--color-control-border-disabled);
}
.multiline-input__wrapper.is-error {
  border-color: var(--color-control-border-error);
}
.multiline-input__wrapper.is-error .multiline-input__editor-wrapper :global(.cm-gutters) {
  border-color: var(--color-control-border-error);
}
.multiline-input__wrapper.is-error.__interactive:hover, .multiline-input__wrapper.is-error.__interactive:focus-within, .multiline-input__wrapper.is-error.is-active {
  border-color: var(--color-control-border-error);
}
.multiline-input__wrapper.is-error.__interactive:hover .multiline-input__editor-wrapper :global(.cm-gutters), .multiline-input__wrapper.is-error.__interactive:focus-within .multiline-input__editor-wrapper :global(.cm-gutters), .multiline-input__wrapper.is-error.is-active .multiline-input__editor-wrapper :global(.cm-gutters) {
  border-color: var(--color-control-border-error);
}

.multiline-input__editor-wrapper {
  width: 100%;
  overflow: hidden;
  background: transparent;
}
@media (prefers-reduced-motion: no-preference) {
  .multiline-input__editor-wrapper {
    transition: all 150ms ease-in-out;
  }
}
.multiline-input__editor-wrapper :global(.cm-editor) {
  overflow: hidden;
}
@media (prefers-reduced-motion: no-preference) {
  .multiline-input__editor-wrapper :global(.cm-editor) {
    transition: all 150ms ease-in-out;
  }
}
.multiline-input__editor-wrapper :global(.cm-focused) {
  outline: none;
}
.multiline-input__editor-wrapper :global(.cm-scroller) {
  max-height: none;
  overflow: visible;
}
.multiline-input__editor-wrapper :global(.cm-gutters) {
  background-color: var(--color-line-numbers-background);
  border-right: 1px solid var(--color-control-border-rest);
}
@media (prefers-reduced-motion: no-preference) {
  .multiline-input__editor-wrapper :global(.cm-gutters) {
    transition: background-color 150ms ease-in-out;
  }
}
@media (prefers-reduced-motion: no-preference) {
  .multiline-input__editor-wrapper :global(.cm-gutters) {
    transition: border-color 150ms ease-in-out;
  }
}
.multiline-input__editor-wrapper :global(.cm-gutter) {
  font-family: "Fira Code", "SF Mono", consolas, monospace;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-line-numbers-text);
  text-align: right;
}
@media (prefers-reduced-motion: no-preference) {
  .multiline-input__editor-wrapper :global(.cm-gutter) {
    transition: all 150ms ease-in-out;
  }
}
.multiline-input__editor-wrapper :global(.cm-content) {
  padding: 0.75rem 0.5rem;
}
.multiline-input__editor-wrapper :global(.cm-line) {
  font-family: "Fira Code", "SF Mono", consolas, monospace;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
  color: var(--color-text-primary);
  background: transparent;
}
.multiline-input__editor-wrapper :global(.cm-placeholder) {
  font-family: "Fira Code", "SF Mono", consolas, monospace;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0;
  font-smoothing: antialiased;
  text-rendering: optimizelegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: var(--color-text-tertiary);
}
.multiline-input__editor-wrapper :global(.cm-gutterElement) {
  min-width: 0;
  padding: 0 0.5rem;
}

.multiline-input__editor-container {
  position: relative;
}

@media (prefers-reduced-motion: no-preference) {
  .multiline-input__copy-button {
    transition: opacity 150ms ease-in-out;
  }
}
.multiline-input__copy-button {
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  z-index: 10;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  padding: 0;
  cursor: pointer;
  opacity: 0;
}
.multiline-input__copy-button.is-visible {
  opacity: 1;
}

.multiline-input__wrapper.has-header .multiline-input__editor-wrapper {
  border-top: 1px solid var(--color-control-border-rest);
}

.multiline-input__wrapper.has-header.is-disabled .multiline-input__editor-wrapper {
  border-top-color: var(--color-control-border-disabled);
}

.multiline-input__wrapper.has-header.is-error .multiline-input__editor-wrapper {
  border-top-color: var(--color-control-border-error);
}

.multiline-input__wrapper.has-header.is-active .multiline-input__editor-wrapper {
  border-top-color: var(--color-control-border-active);
}

.multiline-input__wrapper.has-header.__interactive:hover .multiline-input__editor-wrapper {
  border-top-color: var(--color-control-border-hover);
}

.multiline-input__wrapper.has-header.__interactive:focus-within .multiline-input__editor-wrapper {
  border-top-color: var(--color-control-border-active);
}

.multiline-input__wrapper.has-header.is-error.is-active .multiline-input__editor-wrapper,
.multiline-input__wrapper.has-header.is-error.__interactive:hover .multiline-input__editor-wrapper,
.multiline-input__wrapper.has-header.is-error.__interactive:focus-within .multiline-input__editor-wrapper {
  border-top-color: var(--color-control-border-error);
}</style>
