import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	ref: React.RefObject<HTMLDivElement> | React.RefObject<HTMLFormElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	ref,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleOutsideClick = (event: MouseEvent) => {
			if (
				ref.current &&
				!ref.current.contains(event.target as Node) 
			) {
				console.log(ref)
				isOpen && setTimeout(() => onClose?.(), 5);
				onChange?.(false);
			}

		};
		
		const handleEscPress = (event: KeyboardEvent) => {
			if(event.key === "Escape") {
				isOpen && onClose?.();
				onChange?.(false);
			}
		};

		window.addEventListener('mousedown', handleOutsideClick);
		window.addEventListener('keydown', handleEscPress);

		return () => {
			window.removeEventListener('mousedown',handleOutsideClick);
			window.removeEventListener('keydown', handleEscPress);
		};
	}, [onClose, onChange, isOpen]);
};
