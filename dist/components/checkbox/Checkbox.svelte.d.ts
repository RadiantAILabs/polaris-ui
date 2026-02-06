import { type WithElementRef } from '../../utils';
import { Checkbox as CheckboxPrimitive } from 'bits-ui';
export type CheckboxProps = WithElementRef<CheckboxPrimitive.RootProps>;
declare const Checkbox: import("svelte").Component<CheckboxProps, {}, "ref" | "checked">;
type Checkbox = ReturnType<typeof Checkbox>;
export default Checkbox;
