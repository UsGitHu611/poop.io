import { clsx } from "clsx";

export const ModalButton = ({ children, onClick, color }) => {
  return (
    <button
      className={clsx(
        "w-1/2 rounded-lg py-2.5 text-xl cursor-pointer",
        "hover:brightness-125 active:brightness-125 select-none",
        color
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
