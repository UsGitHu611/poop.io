import { useLocation, useNavigate } from 'react-router';
import { useCallback } from 'react';
import { Icon } from '@iconify/react';
import { VIEW_PAGE, VIEW_TITLE, VIEW_DESCRIPTION } from '@/constants/viewTransitionNames';
import { clsx } from 'clsx';
import { db } from '../lib/Notes';
import { useLiveQuery } from 'dexie-react-hooks';

const DEFAULT_VALUE = 'Без Названия';

export default function DetailNote() {
	const router = useNavigate();
	const { state } = useLocation();
	const { id } = state || {};

	const note = useLiveQuery(() => {
		if (id) {
			return db.notes.get(id);
		}
		return null;
	}, [id]);

	const title = note?.title || DEFAULT_VALUE;
	const description = note?.description || DEFAULT_VALUE;

	const handleTitleInput = useCallback(async e => {
		const newTitle = e.currentTarget.textContent.trim();
		await db.update(id, { title: newTitle });
	}, []);

	const handleDescriptionInput = useCallback(async e => {
		const newDescription = e.currentTarget.textContent.trim();
		await db.update(id, { description: newDescription });
	}, []);

	return (
		<section
			className="bg-cool-200 block md:flex md:justify-center h-screen w-dvw"
			style={{
				viewTransitionName: VIEW_PAGE,
			}}
		>
			<div className="h-screen md:block md:pl-0 w-dvw md:w-[60%] p-6">
				<div
					className={clsx(
						'grid grid-cols-[auto_1fr] gap-x-3 gap-y-5 place-items-baseline',
						'mb-4',
					)}
				>
					<button
						className={clsx(
							'rounded-full hover:bg-gray-400/20 cursor-pointer',
							'size-15 flex items-center justify-center active:bg-gray-400/20',
						)}
						onClick={() => router('/')}
					>
						<Icon icon="ic:baseline-arrow-back" width={28} />
					</button>
					<h2
						className="capitalize text-5xl md:text-6xl break-all outline-none w-fit"
						style={{
							viewTransitionName: VIEW_TITLE,
						}}
						suppressContentEditableWarning
						contentEditable
						onBlur={handleTitleInput}
					>
						{title}
					</h2>
				</div>
				<p
					className={clsx(
						'text-gray-600 text-xl dark:text-gray-300 break-all',
						'w-fit outline-none',
					)}
					style={{
						viewTransitionName: VIEW_DESCRIPTION,
					}}
					suppressContentEditableWarning
					contentEditable
					onBlur={handleDescriptionInput}
				>
					{description}
				</p>
			</div>
		</section>
	);
}
