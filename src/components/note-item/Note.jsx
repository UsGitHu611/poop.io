import { clsx } from 'clsx';
import { useLongTouch } from '../../hooks/useLongPress';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { isMobile } from '@/lib/isMobile';
import { db } from '@/lib/Notes';
import { NavLink } from 'react-router';
import { VIEW_PAGE, VIEW_TITLE, VIEW_DESCRIPTION } from '@/constants/viewTransitionNames';
import { useEffect, useRef, forwardRef } from 'react';
import { formattingDate } from '../../helper/formattingDate';

export const Note = forwardRef(
	(
		{
			id,
			title,
			description,
			createdAt,
			isSelected,
			onToggle,
			isSelectionMode,
			setSelectedIds,
		},
		ref,
	) => {
		const textRef = useRef(null);
		const formatedDate = formattingDate(createdAt);

		useEffect(() => {
			if (ref && ref.current && textRef.current) {
				ref.current.set(id, textRef.current.firstChild);
				return () => {
					ref.current.delete(id);
				};
			}
		}, [id, ref]);

		const handleClick = e => {
			if (isSelectionMode) {
				e?.stopPropagation();
				e?.preventDefault();
				onToggle(id);
			}
		};

		const handleLongPress = e => {
			e?.stopPropagation();
			e?.preventDefault();
			if (typeof navigator !== 'undefined' && navigator.vibrate) {
				navigator.vibrate(50);
			}
			onToggle(id);
		};

		const deleteOneById = async () => {
			await db.removeById(id);
			if (isSelected) {
				setSelectedIds(prev => prev.filter(n => n !== id));
			}
		};

		const bind = useLongTouch(handleLongPress, handleClick);

		return (
			<motion.li
				{...bind}
				className={clsx(
					'group relative flex flex-col rounded-2xl dark:text-white',
					'dark:bg-cool-200 cursor-pointer bg-blue-200 select-none',
					isSelected
						? 'dark:outline-blue-500'
						: 'dark:hover:outline-cool-50 outline-transparent',
					'outline-2',
				)}
				initial={{
					scale: 0,
					opacity: 0,
				}}
				animate={{
					scale: 1,
					opacity: 1,
				}}
				exit={{
					scale: 0,
					opacity: 0,
				}}
				whileHover={{
					scale: 1.035,
				}}
				onContextMenu={e => {
					if (isMobile) {
						e.preventDefault();
					}
				}}
				layout
			>
				<NavLink
					className="p-4"
					to={`/${id}`}
					viewTransition
					state={{
						id,
						title,
						description,
					}}
				>
					{({ isTransitioning }) => (
						<>
							<div
								className="mb-2 flex items-start justify-between"
								style={{
									viewTransitionName: isTransitioning ? VIEW_PAGE : '',
								}}
							>
								<h2
									title={title}
									className="w-fit truncate text-xl break-all capitalize"
									style={{
										viewTransitionName: isTransitioning ? VIEW_TITLE : '',
									}}
									ref={textRef}
								>
									{title}
								</h2>
							</div>

							<p
								className="mb-3 truncate dark:text-gray-300"
								style={{
									viewTransitionName: isTransitioning ? VIEW_DESCRIPTION : '',
								}}
							>
								{description}
							</p>

							{!isMobile ? (
								<div className="flex items-center justify-between">
									<div
										className={clsx(
											'flex origin-bottom scale-0 items-center opacity-0',
											'group-hover:scale-100 group-hover:opacity-100',
											'transition-visibility gap-1 duration-200',
										)}
									>
										<button
											onClick={e => {
												e.preventDefault();
												onToggle(id);
											}}
											title="Отметить"
											className="cursor-pointer"
										>
											<Icon
												className="opacity-25 hover:opacity-40"
												icon="ic:baseline-check-circle"
												width={30}
											/>
										</button>
										<button
											title="Удалить"
											className="cursor-pointer"
											onClick={e => {
												e.preventDefault();
												deleteOneById();
											}}
										>
											<Icon
												className="text-red-600 opacity-50 hover:opacity-100"
												icon="ic:baseline-cancel"
												width={30}
											/>
										</button>
									</div>
									<span className="text-sm dark:text-[hsl(0_0%_46%)]">
										{formatedDate}
									</span>
								</div>
							) : (
								<span className="ml-auto text-sm text-[hsl(0_0%_46%)]">
									{formatedDate}
								</span>
							)}
						</>
					)}
				</NavLink>
			</motion.li>
		);
	},
);
