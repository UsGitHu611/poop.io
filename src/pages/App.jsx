import { List } from '@components/note-list/List';
import { FloatMenu } from '@components/float-menu/FloatMenu';
import { SelectedContextProvider } from '@context/SelectedContextProvider';
import { SearchPanel } from '@components/search-panel/SearchPanel';
import { SearchContextProvider } from '../context/SearchContextProvider';
import { Pagination } from '@components/pagination/Pagination';
import { BottomMenu } from '../components/bottomMenu/BottomMenu';

export default function App() {
	return (
		<div className="flex min-h-screen w-full flex-col gap-3 p-4 md:w-[90dvw]">
			<SelectedContextProvider>
				<SearchContextProvider>
					<SearchPanel />
					<List>
						{({ totalCount }) => (
							<BottomMenu>
								<Pagination totalCount={totalCount} />
								<FloatMenu />
							</BottomMenu>
						)}
					</List>
				</SearchContextProvider>
			</SelectedContextProvider>
		</div>
	);
}
