import { ViewPlugin, Decoration, type DecorationSet, type EditorView } from '@codemirror/view';
export declare const PARAMETER_REGEX: RegExp;
export declare function createParameterDecorator(getInvalidParams?: () => Set<string>): ViewPlugin<{
    decorations: DecorationSet;
    getInvalidParams: () => Set<string>;
    update(update: import("@codemirror/view").ViewUpdate): void;
    findDecorators(view: EditorView): import("@codemirror/state").RangeSet<Decoration>;
}, undefined>;
