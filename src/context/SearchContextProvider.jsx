import { createContext, useCallback, useState } from 'react';
import { useHighlight } from '@/hooks/useHighlight';
import { useDebounce } from '../hooks/useDebounce';

export const searchContext = createContext({
	selectSort: '',
	inputValue: '',
	debouncedValue: '',
	noteItemsMap: { current: new Map() },
	selectHandler: () => {},
	setInputValue: () => {},
});

export const SearchContextProvider = ({ children }) => {
	const [selectSort, setSelectSort] = useState('');
	const [inputValue, setInputValue] = useState('');

	const newInputValue = useDebounce(inputValue, 300);
	const { noteItemsMap } = useHighlight(newInputValue);

	const selectHandler = useCallback(value => {
		setSelectSort(prev => (prev === value ? '' : value));
	}, []);

	return (
		<searchContext.Provider
			value={{
				selectSort,
				selectHandler,
				noteItemsMap,
				newInputValue,
				setInputValue,
				inputValue,
			}}
		>
			{children}
		</searchContext.Provider>
	);
};
