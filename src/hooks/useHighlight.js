import { useRef, useEffect } from 'react';

const HIGHLIGHT_NAME = 'select_title';

export const useHighlight = debounceValue => {
	const noteItemsMap = useRef(new Map());

	useEffect(() => {
		const map = noteItemsMap.current;
		const trimValue = debounceValue.trim();
		const ranges = [];

		if (trimValue.length === 0) {
			CSS.highlights.delete(HIGHLIGHT_NAME);
			return;
		}

		for (const [_, text] of map) {
			if (text) {
				const fullText = text.textContent || '';
				const startIndex = fullText.indexOf(trimValue);

				if (startIndex !== -1) {
					const range = new Range();
					range.setStart(text, startIndex);
					range.setEnd(text, startIndex + trimValue.length);

					ranges.push(range);
				}
			}
		}

		CSS.highlights.delete(HIGHLIGHT_NAME);

		if (ranges.length > 0) {
			const customHighlight = new Highlight(...ranges);
			CSS.highlights.set(HIGHLIGHT_NAME, customHighlight);
		}
	}, [debounceValue]);

	return { noteItemsMap };
};
