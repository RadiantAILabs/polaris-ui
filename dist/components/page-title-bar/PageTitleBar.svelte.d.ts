import type { ButtonProps } from '../button/Button.svelte';
export interface PageTitleBarProps {
    title: string;
    button1?: Omit<ButtonProps, 'size'>;
    button2?: Omit<ButtonProps, 'size'>;
    button3?: Omit<ButtonProps, 'size'>;
}
type $$ComponentProps = PageTitleBarProps & {
    actions?: import('svelte').Snippet;
};
declare const PageTitleBar: import("svelte").Component<$$ComponentProps, {}, "">;
type PageTitleBar = ReturnType<typeof PageTitleBar>;
export default PageTitleBar;
