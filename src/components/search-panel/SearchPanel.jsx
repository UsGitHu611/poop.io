import { SearchInput } from './SearchInput';
import { SortPanel } from './SortPanel';

export const SearchPanel = () => {
	return (
		<header className="w-full flex gap-3">
			<SortPanel />
			<SearchInput />
		</header>
	);
};
