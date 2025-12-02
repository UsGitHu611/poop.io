import { AddButton } from '../add-button/AddButton';
import { ResetButton } from '../reset-button/ResetButton';
import { Button } from '../button/Button';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'motion/react';
import { useContext, useState } from 'react';
import { Modal } from '../modal/Modal';
import { ModalButton } from '../modal/ModalButton';
import { db } from '@/lib/Notes';
import { SelectedContext } from '@context/SelectedContextProvider';
import { ContextMenu } from '../context-menu/ContextMenu';

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
		<div className="fixed right-5 bottom-5 gap-3 flex items-center">
			<AnimatePresence>
				{isSelectionMode ? (
					<ContextMenu selectedIds={selectedIds} setSelectedIds={setSelectedIds} />
				) : null}
			</AnimatePresence>
			<div
				className="flex flex-col gap-3"
				role="toolbar"
				aria-label="Floating menu"
				onClick={() => setShowMenu(prev => !prev)}
			>
				<AnimatePresence>
					{showMenu ? (
						<motion.menu
							className="grid grid-rows-2 gap-1"
							transition={{
								duration: 0.1,
							}}
							initial={{
								transform: 'translateY(10%)',
								opacity: 0,
							}}
							animate={{
								transform: 'translateY(0)',
								opacity: 1,
							}}
							exit={{
								transform: 'translateY(10%)',
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
				<Button classNames="rounded-full dark:bg-cool-200">
					<Icon icon="ic:outline-menu" />
				</Button>

				<AnimatePresence>
					{showModal ? (
						<Modal showModalHandler={showModalHandler}>
							<div className="flex flex-col p-3 h-full">
								<p className="text-pretty text-2xl flex-1 select-none">
									Вы уверены, что хотите
									<span className="text-red-600 uppercase"> удалить</span> все заметки?
								</p>
								<div className="flex gap-3 w-full">
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
