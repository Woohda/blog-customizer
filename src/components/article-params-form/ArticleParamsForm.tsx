import { useState, useRef } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useOutsideClickClose } from '../../hooks/useOutsideClickClose';
import { Select } from '../select';
import { 
	ArticleStateType,
	backgroundColors, 
	contentWidthArr, 
	defaultArticleState, 
	fontColors, 
	fontFamilyOptions, 
	fontSizeOptions, 
	OptionType
	} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';

interface ArticleParamsFormProps {
	articleState: ArticleStateType;
	articleSetState: (state: ArticleStateType) => void;
}

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [pageState, setPageState] = useState(defaultArticleState);
	const formRef = useRef<HTMLFormElement>(null);


	const displayResponsiveForm = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useOutsideClickClose({
		isOpen: isMenuOpen,  
		ref: formRef,
		onClose: displayResponsiveForm, 
		onChange: setIsMenuOpen
	});

	const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.articleSetState(pageState)
		displayResponsiveForm();
	};

	const handleFormReset = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		props.articleSetState(defaultArticleState);
		setPageState(defaultArticleState);
		displayResponsiveForm();
	}

	const changeSelectedOption = (option: string, value: OptionType) => {
		setPageState(prevState => ({
			...prevState,
			[option]: value
		})) 
	}

	return (
		<>
			<ArrowButton onClick={displayResponsiveForm} onOpen={isMenuOpen} />
			<aside 
				className={clsx(styles.container, isMenuOpen && styles.container_open)}>
				<form className={styles.form} 
				ref={formRef}
				onSubmit={handleFormSubmit} 
				onReset={handleFormReset}
				>
					<h2 className={styles.title}>Задайте параметры</h2>
					<Select 
						title='Шрифт'	
						options={fontFamilyOptions}
						selected={pageState.fontFamilyOption}
						onChange={(option) => changeSelectedOption('fontFamilyOption', option)}
						
					/>
					<RadioGroup	
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={pageState.fontSizeOption}
						onChange={(option) => changeSelectedOption('fontSizeOption', option)}
					/>
					<Select
						options={fontColors}
						selected={pageState.fontColor}
						title='Цвет шрифта'
						onChange={(option) => changeSelectedOption('fontColor', option)}
						
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={pageState.backgroundColor}
						onChange={(option) => changeSelectedOption('backgroundColor', option)}
					/>
					<Select 
						title='Ширина контента'
						options={contentWidthArr}
						selected={pageState.contentWidth}
						onChange={(option) => changeSelectedOption('contentWidth', option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
