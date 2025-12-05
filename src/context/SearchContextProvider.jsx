import { createContext, useState } from 'react';
import { useHighlight } from '@/hooks/useHighlight';
import { useDebounce } from '../hooks/useDebounce';

export const searchContext = createContext({
	selectSort: '',
	inputValue: '',
	debouncedValue: '',
	noteItemsMap: { current: new Map() },
	selectHandler: value => {},
	setInputValue: value => {},
});

export const SearchContextProvider = ({ children }) => {
	const [selectSort, setSelectSort] = useState('');
	const [inputValue, setInputValue] = useState('');

	const newInputValue = useDebounce(inputValue, 400);
	const { noteItemsMap } = useHighlight(newInputValue);

	const selectHandler = value => {
		setSelectSort(prev => (prev === value ? '' : value));
	};

	const contextValue = {
		selectSort,
		selectHandler,
		noteItemsMap,
		newInputValue,
		setInputValue,
		inputValue,
	};

	return <searchContext.Provider value={contextValue}>{children}</searchContext.Provider>;
};
