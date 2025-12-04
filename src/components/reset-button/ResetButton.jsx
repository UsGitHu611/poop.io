import { Icon } from '@iconify/react';
import { Button } from '../button/Button';
import { clsx } from 'clsx';

export const ResetButton = ({ showModalHandler }) => {
	return (
		<Button
			classNames={clsx(
				'bg-red-700 group transition-colors',
				'hover:brightness-125 active:brightness-125',
			)}
			onClick={showModalHandler}
			title="Удалить все"
		>
			<Icon className="group-hover:brightness-150" icon="ri:reset-left-fill" />
		</Button>
	);
};
