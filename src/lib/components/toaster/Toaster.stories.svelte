<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import { Toaster } from './index.js';
	import { toast } from './toast.js';
	import { Button } from '../button';

	const { Story } = defineMeta({
		title: 'Components/Toaster',
		component: Toaster,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			position: {
				control: { type: 'select' },
				options: [
					'top-left',
					'top-center',
					'top-right',
					'bottom-left',
					'bottom-center',
					'bottom-right'
				],
				description: 'Position of toast notifications on screen'
			},
			duration: {
				control: { type: 'number' },
				description: 'Default duration in milliseconds before toast auto-dismisses'
			},
			visibleToasts: {
				control: { type: 'number' },
				description: 'Maximum number of visible toasts at once'
			},
			closeButton: {
				control: { type: 'boolean' },
				description: 'Show close button on toasts'
			},
			expand: {
				control: { type: 'boolean' },
				description: 'Expand toasts by default'
			},
			offset: {
				control: { type: 'text' },
				description: 'Offset from edge of screen'
			}
		}
	});
</script>

<Story name="Default">
	{#snippet template()}
		<div style="padding: 40px;">
			<Toaster />

			<div style="display: flex; flex-wrap: wrap; gap: 12px;">
				<Button
					label="Success"
					variant="primary"
					onclick={() => toast.success('Operation completed successfully')}
				/>
				<Button
					label="Error"
					variant="primary"
					onclick={() => toast.error('Something went wrong')}
				/>
				<Button
					label="Warning"
					variant="secondary"
					onclick={() => toast.warning('This action cannot be undone')}
				/>
				<Button label="Info" variant="secondary" onclick={() => toast.info('Update available')} />
				<Button label="Default" variant="secondary" onclick={() => toast('Notification message')} />
			</div>
		</div>
	{/snippet}
</Story>

<Story name="Advanced Usage">
	{#snippet template()}
		<div style="padding: 40px;">
			<Toaster />

			<div style="display: flex; flex-direction: column; gap: 24px;">
				<div>
					<h4 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600;">With Actions</h4>
					<div style="display: flex; flex-wrap: wrap; gap: 12px;">
						<Button
							label="Undo Action"
							variant="secondary"
							onclick={() =>
								toast('File deleted', {
									action: {
										label: 'Undo',
										onClick: () => toast.success('Deletion undone')
									}
								})}
						/>
						<Button
							label="With Description"
							variant="secondary"
							onclick={() =>
								toast.success('Changes saved', {
									description: 'Your preferences have been updated'
								})}
						/>
					</div>
				</div>

				<div>
					<h4 style="margin: 0 0 12px; font-size: 0.875rem; font-weight: 600;">Promise Handling</h4>
					<div style="display: flex; flex-wrap: wrap; gap: 12px;">
						<Button
							label="Async Success"
							variant="primary"
							onclick={() => {
								const promise = new Promise((resolve) => {
									setTimeout(() => resolve({ name: 'User' }), 2000);
								});

								toast.promise(promise, {
									loading: 'Saving...',
									success: 'Saved successfully',
									error: 'Failed to save'
								});
							}}
						/>
						<Button
							label="Async Error"
							variant="primary"
							onclick={() => {
								const promise = new Promise((_, reject) => {
									setTimeout(() => reject(new Error('Network error')), 2000);
								});

								toast.promise(promise, {
									loading: 'Processing...',
									success: 'Complete',
									error: 'Failed'
								});
							}}
						/>
					</div>
				</div>
			</div>
		</div>
	{/snippet}
</Story>
