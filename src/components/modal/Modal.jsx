import { createPortal } from "react-dom";
import { motion } from "motion/react";
import { clsx } from "clsx";
import { isMobile } from "@/lib/isMobile";

const modalVariants = (variant) =>
  ({
    mobile: {
      classNames: clsx(
        "dark:bg-cool-200 rounded-lg text-white",
        "!left-0 !top-auto m-auto !right-0 !bottom-1 h-1/3 "
      ),
      animations: {
        initial: {
          opacity: 0,
          transform: "translateY(100%)",
        },
        animate: {
          opacity: 1,
          transform: "translateY(0)",
        },
        exit: {
          opacity: 0,
          transform: "translateY(100%)",
        },
      },
    },
    desktop: {
      classNames: clsx(
        "dark:bg-cool-200 rounded-lg text-white fixed",
        "-translate-x-1/2 -translate-y-1/2 w-1/4",
        "left-1/2 top-1/2 h-1/4"
      ),
      animations: {
        initial: {
          opacity: 0,
          scale: 0,
          y: 100,
        },
        animate: {
          opacity: 1,
          scale: 1,
          y: 0,
        },
        exit: {
          opacity: 0,
          scale: 0,
          y: 100,
        },
      },
    },
  }[variant ? "mobile" : "desktop"]);

export const Modal = ({ children, showModalHandler }) => {
  const variant = modalVariants(isMobile);
  const closeEscapeHandler = () => {
    showModalHandler("auto", false);
  };
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      showModalHandler("auto", false);
    }
  };
  return createPortal(
    <motion.dialog
      className={variant.classNames}
      onClose={closeEscapeHandler}
      onClick={isMobile ? closeHandler : null}
      ref={(element) => element?.showModal()}
      {...variant.animations}
    >
      {children}
    </motion.dialog>,
    document.body
  );
};
