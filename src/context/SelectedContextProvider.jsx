import { createContext, useState } from 'react';

export const SelectedContext = createContext(null);

export const SelectedContextProvider = ({ children }) => {
	const [selectedIds, setSelectedIds] = useState([]);
	const isSelectionMode = selectedIds.length > 0;
	return (
		<SelectedContext.Provider value={{ selectedIds, setSelectedIds, isSelectionMode }}>
			{children}
		</SelectedContext.Provider>
	);
};
