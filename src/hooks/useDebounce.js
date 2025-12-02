import { useEffect, useRef, useState } from 'react';

export const useDebounce = (value, ms) => {
	const timerRef = useRef(0);
	const [debounceValue, setDebounceValue] = useState(value);

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current);
		}

		timerRef.current = setTimeout(() => {
			setDebounceValue(value);
		}, ms);
		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current);
			}
		};
	}, [value, ms]);

	return debounceValue;
};
