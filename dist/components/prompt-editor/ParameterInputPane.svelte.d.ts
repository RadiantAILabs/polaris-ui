export type ParameterInputPaneProps = {
    parameters?: string[];
    onInsertPlaceholder?: (value: string) => void;
    disabled?: boolean;
    onDropdownOpenChange?: (isOpen: boolean) => void;
};
declare const ParameterInputPane: import("svelte").Component<ParameterInputPaneProps, {}, "">;
type ParameterInputPane = ReturnType<typeof ParameterInputPane>;
export default ParameterInputPane;
