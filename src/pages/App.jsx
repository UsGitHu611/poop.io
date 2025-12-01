import { List } from "@components/note-list/List";
import { FloatMenu } from "@components/float-menu/FloatMenu";
import { SelectedContextProvider } from "@context/SelectedContextProvider";
import { SearchPanel } from "@components/search-panel/SearchPanel";

export default function App() {
  return (
    <div className="w-screen flex flex-col h-screen gap-3 p-4">
      <SelectedContextProvider>
        <SearchPanel />
        <List />
        <FloatMenu />
      </SelectedContextProvider>
    </div>
  );
}
