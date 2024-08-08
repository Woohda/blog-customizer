import clsx from 'clsx';
import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';

export type ArrowButtonProps = {
	onClick?: (state: boolean) => void;
	onOpen?: boolean;
}

export const ArrowButton = (props: ArrowButtonProps ) => {
	const handleClick = () => {
		props.onClick?.(!props.onOpen);
	  };
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, props.onOpen && styles.container_open)}
			onClick={(e: React.MouseEvent) => {
				e.stopPropagation();
				handleClick();}}>
			<img src={arrow} alt='иконка стрелочки' className={clsx(styles.arrow, props.onOpen && styles.arrow_open)} />
		</div>
	);
};
