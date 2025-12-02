import { List } from '@components/note-list/List';
import { FloatMenu } from '@components/float-menu/FloatMenu';
import { SelectedContextProvider } from '@context/SelectedContextProvider';
import { SearchPanel } from '@components/search-panel/SearchPanel';
import { SearchContextProvider } from '../context/SearchContextProvider';

export default function App() {
	return (
		<div className="w-screen flex flex-col h-screen gap-3 p-4">
			<SelectedContextProvider>
				<SearchContextProvider>
					<SearchPanel />
					<List />
				</SearchContextProvider>
				<FloatMenu />
			</SelectedContextProvider>
		</div>
	);
}
