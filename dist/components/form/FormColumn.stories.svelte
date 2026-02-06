<script module lang="ts">
	import { defineMeta } from '@storybook/addon-svelte-csf';
	import Form from './index';
	import { Input } from '../input';

	const { Story } = defineMeta({
		title: 'Components/Form/Column',
		component: Form.Column,
		parameters: {
			layout: 'centered'
		},
		tags: ['autodocs'],
		argTypes: {
			columns: {
				control: { type: 'select' },
				options: [1, 3],
				description: 'Number of columns for larger screens'
			}
		}
	});
</script>

<Story name="Two Column Layout">
	{#snippet template()}
		<div style="width: 600px;">
			<Form.Column columns={2}>
				<Form.Field name="firstName" label="First Name">
					{#snippet children({ props })}
						<Input {...props} placeholder="Enter first name" />
					{/snippet}
				</Form.Field>

				<Form.Field name="lastName" label="Last Name">
					{#snippet children({ props })}
						<Input {...props} placeholder="Enter last name" />
					{/snippet}
				</Form.Field>

				<Form.Field name="email" label="Email Address">
					{#snippet children({ props })}
						<Input {...props} placeholder="Enter email" type="email" />
					{/snippet}
				</Form.Field>

				<Form.Field name="phone" label="Phone Number">
					{#snippet children({ props })}
						<Input {...props} placeholder="Enter phone" type="tel" />
					{/snippet}
				</Form.Field>

				<Form.Field name="company" label="Company">
					{#snippet children({ props })}
						<Input {...props} placeholder="Enter company name" />
					{/snippet}
				</Form.Field>

				<Form.Field name="jobTitle" label="Job Title">
					{#snippet children({ props })}
						<Input {...props} placeholder="Enter job title" />
					{/snippet}
				</Form.Field>
			</Form.Column>
		</div>
	{/snippet}
</Story>

<Story name="Three Columns">
	{#snippet template()}
		<div style="width: 800px;">
			<Form.Column columns={3}>
				<Form.Field name="firstName2" label="First Name">
					{#snippet children({ props })}
						<Input {...props} placeholder="First" />
					{/snippet}
				</Form.Field>

				<Form.Field name="middleName" label="Middle Name">
					{#snippet children({ props })}
						<Input {...props} placeholder="Middle" />
					{/snippet}
				</Form.Field>

				<Form.Field name="lastName2" label="Last Name">
					{#snippet children({ props })}
						<Input {...props} placeholder="Last" />
					{/snippet}
				</Form.Field>

				<Form.Field name="address" label="Street Address">
					{#snippet children({ props })}
						<Input {...props} placeholder="Address" />
					{/snippet}
				</Form.Field>

				<Form.Field name="city" label="City">
					{#snippet children({ props })}
						<Input {...props} placeholder="City" />
					{/snippet}
				</Form.Field>

				<Form.Field name="zip" label="ZIP Code">
					{#snippet children({ props })}
						<Input {...props} placeholder="ZIP" />
					{/snippet}
				</Form.Field>
			</Form.Column>
		</div>
	{/snippet}
</Story>
