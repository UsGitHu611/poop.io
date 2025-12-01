import { Icon } from "@iconify/react";
import { Button } from "../button/Button";
import { clsx } from "clsx";

export const ResetButton = ({ showModalHandler }) => {
  return (
    <Button
      classNames={clsx(
        "bg-red-600/40 group transition-colors",
        "hover:bg-red-600/50 active:bg-red-600/50"
      )}
      onClick={showModalHandler}
      title="Удалить все"
    >
      <Icon
        className="text-red-600/70 group-hover:text-red-600/90"
        icon="ri:reset-left-fill"
      />
    </Button>
  );
};
