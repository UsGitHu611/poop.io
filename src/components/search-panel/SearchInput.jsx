import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { useRef, useEffect } from 'react';
import { isMobile } from '@lib/isMobile';

export const SearchInput = () => {
	const inputRef = useRef(null);
	useEffect(() => {
		const abortController = new AbortController();
		window.addEventListener(
			'keydown',
			({ key, ctrlKey }) => {
				if ((key === '/' || key === '.') && ctrlKey) {
					inputRef.current.focus();
				}
			},
			{ signal: abortController.signal },
		);

		return () => {
			abortController.abort();
		};
	}, []);
	return (
		<div
			className={clsx(
				'grid items-center rounded-2xl outline-2 outline-transparent',
				'bg-cool-200 grid-cols-[auto_1fr_auto] has-focus-within:outline-cool-50',
				'text-lg w-full md:grow-0 md:basis-1/5 duration-130 ease-out',
				'md:has-focus-within:grow hover:bg-cool-50',
			)}
		>
			<div className="flex px-4">
				<Icon className="opacity-50" icon="ic:baseline-search" width={24} />
			</div>
			<input
				className={clsx('outline-none w-full h-full', 'pe-3 py-3')}
				placeholder="Введите название.."
				type="text"
				ref={inputRef}
			/>
			{!isMobile ? (
				<div className="pe-4 py-3 flex">
					<kbd className="bg-cool-100 leading-normal rounded-lg text-[12px] p-1.5">
						ctrl + /
					</kbd>
				</div>
			) : null}
		</div>
	);
};
