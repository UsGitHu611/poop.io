import { useRef } from 'react';

export const useLongTouch = (onLongPress, onClick, { delay = 500 } = {}) => {
	const timeout = useRef(null);
	const longPressTriggered = useRef(false);

	const start = event => {
		const e = event;
		event.preventDefault();

		timeout.current = setTimeout(() => {
			longPressTriggered.current = true;
			onLongPress?.(e);
		}, delay);
	};

	const clear = event => {
		if (timeout.current) clearTimeout(timeout.current);

		if (!longPressTriggered.current) {
			onClick?.(event);
		}

		longPressTriggered.current = false;
	};

	return {
		onTouchStart: start,
		onTouchEnd: clear,
		onTouchMove: () => {
			if (timeout.current) clearTimeout(timeout.current);
			longPressTriggered.current = false;
		},
	};
};
