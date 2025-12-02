import { useId } from 'react';

export const Checkbox = () => {
	const id = useId();
	return (
		<label className="absolute inset-0 opacity-0 invisible" htmlFor={id}>
			<input type="checkbox" id={id} hidden onChange={e => e.stopPropagation()} />
		</label>
	);
};
