import { SearchInput } from './SearchInput';
import { SortPanel } from './SortPanel';

export const SearchPanel = () => {
	return (
		<header className="flex w-full gap-3">
			<SortPanel />
			<SearchInput />
		</header>
	);
};
