import FormRoot from './FormRoot.svelte';
import FormSection from './FormSection.svelte';
import FormSectionLegend from './FormSectionLegend.svelte';
import FormColumn from './FormColumn.svelte';
import FormField from './FormField.svelte';
declare const Form: typeof FormRoot & {
    Root: typeof FormRoot;
    Section: typeof FormSection;
    SectionLegend: typeof FormSectionLegend;
    Column: typeof FormColumn;
    Field: typeof FormField;
};
export { Form as default, FormSectionLegend };
export { createForm } from './createForm.svelte.js';
export type { FormInstance, FormOptions } from './createForm.svelte.js';
