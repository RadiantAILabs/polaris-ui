import type { ButtonProps } from '../button/Button.svelte';
import type { Snippet } from 'svelte';
import type { UnderlineNavProps } from '../underline-nav';
export interface MainWindowProps {
    title: string;
    button1?: Omit<ButtonProps, 'size'>;
    button2?: Omit<ButtonProps, 'size'>;
    button3?: Omit<ButtonProps, 'size'>;
    titleActions?: Snippet;
    headerContent?: Snippet;
    showNavbar?: boolean;
    navProps?: UnderlineNavProps;
    contentPadding?: boolean;
}
type $$ComponentProps = MainWindowProps & {
    children?: Snippet;
};
declare const MainWindow: import("svelte").Component<$$ComponentProps, {}, "">;
type MainWindow = ReturnType<typeof MainWindow>;
export default MainWindow;
