import { json as jsonLang } from '@codemirror/lang-json';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import type { Extension } from '@codemirror/state';
import { tags } from '@lezer/highlight';

/** Syntax-highlight palette for JSON. */
export const jsonHighlightStyle = HighlightStyle.define([
	{ tag: tags.propertyName, color: 'var(--color-text-secondary)' },
	{ tag: tags.string, color: 'var(--color-text-green)' },
	{ tag: tags.number, color: 'var(--color-text-amber)' },
	{ tag: [tags.bool, tags.null], color: 'var(--color-text-tertiary)' },
	{
		tag: [tags.punctuation, tags.brace, tags.bracket, tags.separator],
		color: 'var(--color-text-tertiary)'
	}
]);

export const jsonExtensions: Extension[] = [jsonLang(), syntaxHighlighting(jsonHighlightStyle)];
