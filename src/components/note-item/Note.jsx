import { clsx } from 'clsx';
import { Checkbox } from '../checkbox/Checkbox';
import { useLongTouch } from '../../hooks/useLongPress';
import { motion } from 'motion/react';
import { Icon } from '@iconify/react';
import { isMobile } from '@/lib/isMobile';
import { db } from '@/lib/Notes';
import { NavLink } from 'react-router';
import { VIEW_PAGE, VIEW_TITLE, VIEW_DESCRIPTION } from '@/constants/viewTransitionNames';
import { useEffect, useRef, forwardRef } from 'react';

export const Note = forwardRef(
	({ id, title, description, createdAt, isSelected, onToggle }, ref) => {
		const textRef = useRef(null);

		useEffect(() => {
			if (ref && ref.current && textRef.current) {
				ref.current.set(id, textRef.current.firstChild);
				return () => {
					ref.current.delete(id);
				};
			}
		}, [id, ref]);

		const handleClick = () => {
			onToggle(id);
		};

		const handleLongPress = e => {
			if (typeof navigator !== 'undefined' && navigator.vibrate) {
				navigator.vibrate(50);
			}
			onToggle(id);
			e?.stopPropagation();
		};

		const deleteOneById = async () => {
			await db.removeById(id);
		};

		const bind = useLongTouch(handleLongPress, handleClick);

		return (
			<motion.li
				{...bind}
				className={clsx(
					'relative group rounded-2xl flex flex-col',
					'select-none cursor-pointer bg-cool-200',
					isSelected ? 'outline-blue-500' : 'outline-transparent hover:outline-cool-50',
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
								className="flex justify-between items-start mb-2"
								style={{
									viewTransitionName: isTransitioning ? VIEW_PAGE : '',
								}}
							>
								<h2
									title={title}
									className="capitalize text-xl break-all truncate w-fit"
									style={{
										viewTransitionName: isTransitioning ? VIEW_TITLE : '',
									}}
									ref={textRef}
								>
									{title}
								</h2>

								{isMobile ? (
									<Checkbox checked={isSelected} onChange={() => onToggle(id)} />
								) : null}
							</div>

							<p
								className={clsx(
									'truncate max-w-prose text-gray-600',
									'dark:text-gray-300 mb-3 whitespace-pre-wrap',
								)}
								style={{
									viewTransitionName: isTransitioning ? VIEW_DESCRIPTION : '',
								}}
							>
								{description}
							</p>

							{!isMobile ? (
								<div className="flex justify-between items-center">
									<div
										className={clsx(
											'flex items-center origin-bottom scale-0 opacity-0',
											'group-hover:scale-100 group-hover:opacity-100',
											'transition-visibility duration-200 gap-1',
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
									<span className="text-[hsl(0_0%_46%)] text-sm">{createdAt}</span>
								</div>
							) : (
								<span className="text-[hsl(0_0%_46%)] text-sm ml-auto">{createdAt}</span>
							)}
						</>
					)}
				</NavLink>
			</motion.li>
		);
	},
);
