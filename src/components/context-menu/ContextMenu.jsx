import { Icon } from "@iconify/react";
import { Button } from "../button/Button";
import { motion } from "motion/react";
import { db } from "@/lib/Notes";

export const ContextMenu = ({ selectedIds, setSelectedIds }) => {
  const removeByIds = async () => {
    for await (const id of selectedIds) {
      await db.removeById(id);
    }
  };
  const cancelSelect = () => {
    setSelectedIds([]);
  };
  return (
    <motion.div
      key="context-menu"
      className="flex w-full justify-between gap-2 items-center self-end"
      initial={{
        y: "100%",
        opacity: 0,
      }}
      animate={{
        y: "0",
        opacity: 1,
      }}
      exit={{
        y: "100%",
        opacity: 0,
      }}
      transition={{
        type: "spring",
        stiffness: 500,
        damping: 25,
        duration: 0.2,
      }}
    >
      <Button
        onClick={cancelSelect}
        classNames="outline-none bg-cool-100 hover:brightness-125"
      >
        <Icon icon="ic:outline-close" />
      </Button>
      <Button
        onClick={removeByIds}
        classNames="outline-none bg-red-600/40 hover:brightness-125"
      >
        <Icon className="text-red-600" icon="ic:baseline-delete-forever" />
      </Button>
    </motion.div>
  );
};
