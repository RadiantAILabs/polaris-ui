import { RangeSetBuilder } from '@codemirror/state';
import { ViewPlugin, Decoration, WidgetType } from '@codemirror/view';
// Parameters are of the form {{value}}, where value is alphanumeric and
// can include hyphens and underscores. Parameter may be escaped by
// appending a backslash to the start.
//
// Example valid parameters: {{param}}, {{search-term}}, {{user_name}}
// Example escaped parameter: \{{param}}
export const PARAMETER_REGEX = /(\\)?{{\s*([\w-]+)\s*}}/g;
// Widget that renders a delete button after parameter decorator
class DeleteButtonWidget extends WidgetType {
    // Value of the parameter
    value;
    // Start position of the parameter in the document
    from;
    // End position of the parameter in the document
    to;
    // Reference to the editor view for dispatching transactions
    view;
    // Whether the parameter has an error
    error;
    constructor(value, from, to, view, error = false) {
        super();
        this.value = value;
        this.from = from;
        this.to = to;
        this.view = view;
        this.error = error;
    }
    toDOM() {
        const span = document.createElement('span');
        span.style.backgroundColor = 'var(--color-background-emphasized-1)';
        span.style.cursor = 'pointer';
        span.style.padding = '0 4px';
        span.title = 'Ignore this parameter';
        span.onmouseenter = () => {
            span.style.backgroundColor = 'var(--color-background-emphasized-2)';
        };
        span.onmouseleave = () => {
            span.style.backgroundColor = 'var(--color-background-emphasized-1)';
        };
        const button = document.createElement('button');
        button.style.background = 'none';
        button.style.border = 'none';
        button.style.padding = '0';
        button.style.margin = '0';
        button.style.font = 'inherit';
        button.style.cursor = 'inherit';
        button.style.color = 'var(--color-text-secondary)';
        button.style.fontSize = '1.25em';
        button.style.lineHeight = '1';
        button.textContent = '×';
        button.onclick = () => {
            // Escape the parameter
            const escapedText = `\\{{${this.value}}}`;
            this.view.dispatch({
                changes: { from: this.from, to: this.to, insert: escapedText },
                selection: { anchor: this.from + escapedText.length }
            });
            this.view.focus();
        };
        span.appendChild(button);
        return span;
    }
    ignoreEvent(event) {
        return event.type !== 'click';
    }
    eq(other) {
        return (this.from === other.from &&
            this.to === other.to &&
            this.value === other.value &&
            this.error === other.error);
    }
}
// Plugin that replaces text parameters with corresponding decorators
export function createParameterDecorator(getInvalidParams = () => new Set()) {
    return ViewPlugin.fromClass(class {
        decorations;
        getInvalidParams;
        constructor(view) {
            this.getInvalidParams = getInvalidParams;
            this.decorations = this.findDecorators(view);
        }
        // Update decorations when the document changes or viewport changes
        update(update) {
            // Always update decorations to catch validation changes
            this.decorations = this.findDecorators(update.view);
        }
        // Find all parameters in the visible ranges and create decorations
        findDecorators(view) {
            const builder = new RangeSetBuilder();
            for (const { from, to } of view.visibleRanges) {
                const text = view.state.doc.sliceString(from, to);
                const regex = new RegExp(PARAMETER_REGEX.source, 'g');
                let match;
                while ((match = regex.exec(text))) {
                    const start = from + match.index;
                    const isEscaped = match[1]; // Backslash indicates escaped parameter
                    const value = match[2] || '';
                    if (isEscaped) {
                        // Escaped parameter - only highlight the backslash
                        builder.add(start, start + 1, Decoration.mark({
                            attributes: {
                                style: 'color: var(--color-text-tertiary); opacity: 0.8; font-weight: normal;'
                            }
                        }));
                    }
                    else {
                        // Regular parameter - highlight and add delete button
                        const end = start + match[0].length;
                        const invalidParams = this.getInvalidParams();
                        const hasError = invalidParams.has(value);
                        const textStyle = hasError
                            ? 'background-color: var(--color-background-emphasized-1); color: var(--color-text-error);'
                            : 'background-color: var(--color-background-emphasized-1);';
                        builder.add(start, end, Decoration.mark({
                            attributes: {
                                style: textStyle
                            }
                        }));
                        // Add delete button after the parameter
                        builder.add(end, end, Decoration.widget({
                            widget: new DeleteButtonWidget(value, start, end, view, hasError),
                            side: 0
                        }));
                    }
                }
            }
            return builder.finish();
        }
    }, {
        decorations: (v) => v.decorations
    });
}
