import { type WithElementRef } from '../../utils';
import type { HTMLAttributes } from 'svelte/elements';
import { type VariantProps } from 'tailwind-variants';
export declare const toggleVariants: import("tailwind-variants").TVReturnType<{
    border: {
        light: string;
        strong: string;
    };
}, undefined, string, {
    border: {
        light: string;
        strong: string;
    };
}, undefined, import("tailwind-variants").TVReturnType<{
    border: {
        light: string;
        strong: string;
    };
}, undefined, string, unknown, unknown, undefined>>;
export type ToggleBorder = VariantProps<typeof toggleVariants>['border'];
export type ToggleOption = {
    label: string;
    value: string;
};
export type ToggleProps = WithElementRef<HTMLAttributes<HTMLDivElement>> & {
    border?: ToggleBorder;
    options: ToggleOption[];
    value?: string;
    onchange?: (value: string) => void;
};
declare const Toggle: import("svelte").Component<ToggleProps, {}, "value" | "ref">;
type Toggle = ReturnType<typeof Toggle>;
export default Toggle;
