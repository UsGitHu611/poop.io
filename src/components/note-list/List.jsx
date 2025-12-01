import { useLiveQuery } from "dexie-react-hooks";
import { useContext } from "react";
import { db } from "../../lib/Notes";
import { Note } from "../note-item/Note";
import { clsx } from "clsx";
import { Icon } from "@iconify/react";
import { AnimatePresence } from "motion/react";
import { SelectedContext } from "@/context/SelectedContextProvider";

export const List = () => {
  const notes = useLiveQuery(() => db.notes.toArray(), []);
  const { selectedIds, isSelectionMode, setSelectedIds } =
    useContext(SelectedContext);

  const toggleSelection = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((itemId) => itemId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  if (!notes) return null;

  return (
    <AnimatePresence>
      <ul
        className={clsx(
          "grid grid-cols-2 md:grid-cols-5",
          "peer gap-3 md:gap-4 w-full",
          "place-content-start content-start"
        )}
      >
        <li
          key="empty-message"
          className={clsx(
            "absolute inset-1/2 -translate-1/2 w-fit h-fit",
            "text-cool-50 pointer-events-none text-4xl",
            !notes.length ? "flex items-center gap-2" : "hidden"
          )}
        >
          Добавьте
          <Icon icon="nrk:super-emoji-poop-angry" />
        </li>

        {notes?.map(({ id, ...note }) => (
          <Note
            key={id}
            id={id}
            {...note}
            isSelected={selectedIds.includes(id)}
            isSelectionMode={isSelectionMode}
            onToggle={toggleSelection}
          />
        ))}
      </ul>
    </AnimatePresence>
  );
};
