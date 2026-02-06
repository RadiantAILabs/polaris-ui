import { RadioGroup as RadioGroupPrimitive, type WithoutChildrenOrChild } from 'bits-ui';
type Item = {
    value: string;
    label: string;
    disabled?: boolean;
};
type Props = WithoutChildrenOrChild<RadioGroupPrimitive.RootProps> & {
    items: Item[];
};
declare const RadioGroup: import("svelte").Component<Props, {}, "value" | "ref">;
type RadioGroup = ReturnType<typeof RadioGroup>;
export default RadioGroup;
