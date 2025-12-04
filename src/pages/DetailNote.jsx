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
			className="bg-cool-200 block h-screen w-dvw md:flex md:justify-center"
			style={{
				viewTransitionName: VIEW_PAGE,
			}}
		>
			<div className="h-screen w-dvw p-6 md:block md:w-[60%] md:pl-0">
				<div
					className={clsx(
						'grid grid-cols-[auto_1fr] place-items-baseline gap-x-3 gap-y-5',
						'mb-4',
					)}
				>
					<button
						className={clsx(
							'cursor-pointer rounded-full hover:bg-gray-400/20',
							'flex size-15 items-center justify-center active:bg-gray-400/20',
						)}
						onClick={() => router('/')}
					>
						<Icon icon="ic:baseline-arrow-back" width={28} />
					</button>
					<h2
						className="w-fit text-5xl break-all capitalize outline-none md:text-6xl"
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
					lang="ru"
					className={clsx(
						'text-xl text-gray-600 dark:text-gray-300',
						'w-fit hyphens-auto outline-none',
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
