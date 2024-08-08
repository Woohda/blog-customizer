import clsx from 'clsx';
import { Text } from 'components/text';
import styles from './Button.module.scss';

export const Button = ({
	title,
	onClick,
	type,
}: {
	title: string;
	onClick?: () => void;
	type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
}) => {
	return (
		<button 
		className={clsx(styles.button, 
			type === 'submit' && styles.submit,
			type === 'reset' && styles.reset
		)} 
		type={type} 
		onClick={onClick}
		>
			<Text weight={800} uppercase>
				{title}
			</Text>
		</button>
	);
};
