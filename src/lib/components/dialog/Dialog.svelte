<script lang="ts">
	import type { Snippet } from 'svelte';
	import { Dialog, type WithoutChildren } from 'bits-ui';
	import { Button, type ButtonProps } from '../button';
	import { cn } from '../../utils';
	import './Dialog.scss';

	export interface DialogProps extends WithoutChildren<Dialog.RootProps> {
		children?: Snippet;
		footer?: Snippet;
		titleActions?: Snippet;
		triggerButtonProps: ButtonProps;
		disabled?: boolean;
		title: string;
		variant?: 'modal' | 'side-sheet';
		size?: 'small' | 'medium' | 'large' | 'extra-large';
		showCloseButton?: boolean;
		contentProps?: Dialog.ContentProps;
		open?: boolean;
		/** Called when user tries to close. Return false to prevent close. */
		onClose?: () => void | false | Promise<void | false>;
		class?: string;
		zIndex?: number;
	}

	let {
		children,
		footer,
		titleActions,
		triggerButtonProps = { variant: 'secondary', size: 'base' },
		disabled,
		title,
		variant = 'modal',
		size = 'medium',
		showCloseButton = true,
		contentProps,
		open = $bindable(false),
		onClose,
		class: className,
		zIndex,
		...restProps
	}: DialogProps = $props();

	function getOpen() {
		return open;
	}

	async function setOpen(newOpen: boolean) {
		if (newOpen || !onClose) {
			open = newOpen;
			return;
		}
		const result = await onClose();
		if (result !== false) open = false;
	}

	let scrollAreaRef = $state<HTMLDivElement | null>(null);
	let hasOverflow = $state(false);
	let isAtBottom = $state(false);

	function checkOverflow() {
		if (!scrollAreaRef) return;
		hasOverflow = scrollAreaRef.scrollHeight > scrollAreaRef.clientHeight;
	}

	function checkScrollPosition() {
		if (!scrollAreaRef) return;
		const { scrollTop, scrollHeight, clientHeight } = scrollAreaRef;
		const threshold = 5; // Allow 5px tolerance
		isAtBottom = scrollTop + clientHeight >= scrollHeight - threshold;
	}

	function handleOpenAutoFocus(event: Event) {
		event.preventDefault();
		contentProps?.onOpenAutoFocus?.(event);
	}

	function focusFirstElement() {
		if (!scrollAreaRef) return;

		// Get all focusable elements in the entire overlay
		const allFocusableElements = scrollAreaRef.parentElement?.querySelectorAll(
			'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
		);

		if (!allFocusableElements || allFocusableElements.length === 0) {
			// If no focusable children, focus the Dialog.Content node itself.
			// preventScroll: focus fires mid-animation while the sheet is still
			// off-screen; letting the browser scroll it into view causes a bounce.
			scrollAreaRef.parentElement?.focus({ preventScroll: true });
			return;
		}

		// If close button is shown, focus the second element (or first if only one exists)
		// If close button is hidden, focus the first element
		const targetIndex = showCloseButton && allFocusableElements.length > 1 ? 1 : 0;
		(allFocusableElements[targetIndex] as HTMLElement).focus({ preventScroll: true });
	}

	$effect(() => {
		if (!open || !scrollAreaRef) return;

		checkOverflow();
		checkScrollPosition();

		// Check again after content loads and focus first element
		const timeoutId = setTimeout(() => {
			checkOverflow();
			checkScrollPosition();
			focusFirstElement();
		}, 100);

		// Add scroll listener to check scroll position
		const handleScroll = () => checkScrollPosition();
		scrollAreaRef.addEventListener('scroll', handleScroll);

		// Add ResizeObserver to detect content and container size changes
		// Use requestAnimationFrame to defer updates and avoid ResizeObserver loop errors
		let resizeRAF: number | null = null;
		const resizeObserver = new ResizeObserver(() => {
			if (resizeRAF) return;
			resizeRAF = requestAnimationFrame(() => {
				checkOverflow();
				checkScrollPosition();
				resizeRAF = null;
			});
		});
		resizeObserver.observe(scrollAreaRef);

		return () => {
			clearTimeout(timeoutId);
			if (resizeRAF) cancelAnimationFrame(resizeRAF);
			resizeObserver.disconnect();
			scrollAreaRef?.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<Dialog.Root bind:open={getOpen, setOpen} {...restProps}>
	<Dialog.Trigger>
		{#snippet child({ props })}
			<Button {...triggerButtonProps} {...props} {disabled} />
		{/snippet}
	</Dialog.Trigger>

	<Dialog.Portal>
		<Dialog.Overlay>
			{#snippet child({ props: overlayProps })}
				<div
					{...overlayProps}
					class={cn('dialog__overlay', `dialog__overlay--${variant}`)}
					style:z-index={zIndex ? zIndex - 5 : undefined}
				></div>
			{/snippet}
		</Dialog.Overlay>
		<Dialog.Content {...contentProps} onOpenAutoFocus={handleOpenAutoFocus}>
			{#snippet child({ props })}
				<div
					class={cn('dialog', `dialog--${variant}`, `dialog--${size}`, className)}
					data-state={props['data-state'] as string}
					style:z-index={zIndex}
				>
					<div
						{...props}
						class="dialog__container"
						data-has-overflow={hasOverflow}
						data-is-at-bottom={isAtBottom}
					>
						<!-- Fixed Header -->
						<div class="dialog__header">
							<Dialog.Title>
								{#snippet child({ props: titleProps })}
									<div class="dialog__title-row">
										<h2 {...titleProps} class="dialog__title">
											{title}
										</h2>
										{#if titleActions || showCloseButton}
											<div class="dialog__title-actions">
												{@render titleActions?.()}
												{#if showCloseButton}
													<Dialog.Close>
														{#snippet child({ props })}
															<Button
																variant="invisible"
																size="small"
																icon="cross"
																aria-label="Close"
																{...props}
															/>
														{/snippet}
													</Dialog.Close>
												{/if}
											</div>
										{/if}
									</div>
								{/snippet}
							</Dialog.Title>
						</div>

						<!-- Scrollable Content -->
						<div
							class="dialog__scroll-wrapper scroll-area"
							style="display:flex; flex-direction:column;"
							bind:this={scrollAreaRef}
						>
							<div class="dialog__content">
								{@render children?.()}
							</div>
						</div>

						<!-- Fixed Footer -->
						{#if footer}
							<div class="dialog__footer">
								{@render footer()}
							</div>
						{/if}
					</div>
				</div>
			{/snippet}
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
