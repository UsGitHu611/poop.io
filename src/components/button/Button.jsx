import { clsx } from "clsx";

export const Button = ({ onClick, children, classNames, ...props }) => {
  return (
    <button
      {...props}
      className={clsx(
        "rounded-full size-17 cursor-pointer",
        "text-2xl flex items-center",
        "justify-center",
        classNames
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
