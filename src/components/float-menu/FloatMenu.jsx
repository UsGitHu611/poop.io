import { AddButton } from '../add-button/AddButton';
import { ResetButton } from '../reset-button/ResetButton';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';
import { useContext, useState } from 'react';
import { Modal } from '../modal/Modal';
import { ModalButton } from '../modal/ModalButton';
import { db } from '@/lib/Notes';
import { SelectedContext } from '@context/SelectedContextProvider';
import { ContextMenu } from '../context-menu/ContextMenu';
import { clsx } from 'clsx';

export const FloatMenu = () => {
	const [showMenu, setShowMenu] = useState(false);
	const [showModal, setShowModal] = useState(false);
	const { isSelectionMode, selectedIds, setSelectedIds } = useContext(SelectedContext);

	const showModalHandler = (overflow, show) => {
		document.body.style.overflow = overflow;
		setShowModal(show);
	};

	const acceptHandler = async () => {
		showModalHandler('auto', false);
		await db.clearAll();
	};

	const rejectHandler = async () => {
		showModalHandler('auto', false);
	};

	return (
		<div className="relative -col-end-1 flex items-center gap-1 justify-self-end text-white">
			<AnimatePresence>
				{isSelectionMode ? (
					<ContextMenu selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
				) : null}
			</AnimatePresence>
			<div
				className="flex gap-1"
				role="toolbar"
				aria-label="Floating menu"
				onClick={() => setShowMenu(prev => !prev)}
			>
				<AnimatePresence>
					{showMenu ? (
						<motion.menu
							className="absolute right-[calc(100%+0.25rem)] flex gap-1"
							transition={{
								duration: 0.1,
							}}
							initial={{
								transform: 'translateX(10%)',
								opacity: 0,
							}}
							animate={{
								transform: 'translateX(0)',
								opacity: 1,
							}}
							exit={{
								transform: 'translateX(10%)',
								opacity: 0,
							}}
						>
							<AddButton key="add" />
							<ResetButton
								key="remove"
								showModalHandler={() => showModalHandler('hidden', true)}
							/>
						</motion.menu>
					) : null}
				</AnimatePresence>
				<button
					className={clsx(
						'dark:bg-cool-100 size-15 rounded-full bg-blue-400 hover:brightness-125',
						'flex cursor-pointer items-center justify-center text-2xl md:size-17',
					)}
				>
					<Icon icon="ic:outline-menu" />
				</button>

				<AnimatePresence>
					{showModal ? (
						<Modal showModalHandler={showModalHandler}>
							<div className="flex h-full flex-col p-3">
								<p className="flex-1 text-2xl text-pretty text-black select-none dark:text-white">
									Вы уверены, что хотите
									<span className="text-red-600 uppercase"> удалить</span> все заметки?
								</p>
								<div className="flex w-full gap-3">
									<ModalButton color="bg-cool-50" onClick={rejectHandler}>
										Нет
									</ModalButton>
									<ModalButton color="bg-red-600" onClick={acceptHandler}>
										Да
									</ModalButton>
								</div>
							</div>
						</Modal>
					) : null}
				</AnimatePresence>
			</div>
		</div>
	);
};
