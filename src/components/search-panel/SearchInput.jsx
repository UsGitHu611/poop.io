import { Icon } from '@iconify/react';
import { clsx } from 'clsx';
import { useRef, useEffect, useContext, useId } from 'react';
import { isMobile } from '@lib/isMobile';
import { searchContext } from '@/context/SearchContextProvider';

export const SearchInput = () => {
	const inputRef = useRef(null);
	const { inputValue, setInputValue } = useContext(searchContext);
	const id = useId();

	useEffect(() => {
		const abortController = new AbortController();
		window.addEventListener(
			'keydown',
			({ key, ctrlKey }) => {
				if ((key === '/' || key === '.') && ctrlKey) {
					const activeElement = document.activeElement;
					const isInput =
						activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

					if (!isInput) {
						inputRef.current.focus();
					}
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
				'dark:bg-cool-200 dark:has-focus-within:outline-cool-50 grid-cols-[auto_minmax(0,1fr)_auto] bg-blue-200',
				'w-full text-lg duration-130 ease-out has-focus-within:outline-blue-500 md:grow-0 md:basis-1/5',
				'dark:hover:bg-cool-50 hover:brightness-95 md:has-focus-within:grow',
			)}
		>
			<div className="flex px-4">
				<Icon className="opacity-50" icon="ic:baseline-search" width={24} />
			</div>
			<input
				id={id}
				className="h-full w-full py-3 pe-3 outline-none"
				placeholder="Введите название.."
				value={inputValue}
				onChange={e => setInputValue(e.target.value)}
				type="search"
				ref={inputRef}
			/>
			{!isMobile ? (
				<label className="flex py-3 pe-4" htmlFor={id}>
					<kbd className="dark:bg-cool-100 rounded-lg bg-blue-100 p-1.5 text-[12px] leading-normal">
						ctrl + /
					</kbd>
				</label>
			) : null}
		</div>
	);
};
