import React from 'react';
import styles from './CarouselControl.module.scss';
import Icon from '../Helpers/Icons/Icons';

interface Block {
	year: number;
	description: string;
}

interface Category {
	name: string;
	blocks: Block[];
}

interface CarouselControlsProps {
	activeIndex: number;
	total: number;
	onCategoryChange: (index: number) => void;
	categories: Category[];
}

const CarouselControls: React.FC<CarouselControlsProps> = ({ 
	activeIndex, 
	total, 
	onCategoryChange,
	categories 
}) => {
	const formatNumber = (num: number) => num.toString().padStart(2, '0');

	const rotateToIndex = (index: number) => {
		onCategoryChange(index);
	};

	return (
		<div className={styles.controls}>
			<div className={styles.controls__allDevice}>
				<div className={styles.controls__counter}>
					{formatNumber(activeIndex + 1)}/{formatNumber(total)}
				</div>
				<div className={styles.controls__buttons}>
					<div 
						className={`${styles.controls__buttons__item} ${activeIndex === 0 ? styles['controls__buttons__item--disabled'] : ''}`}
						onClick={() => rotateToIndex((activeIndex - 1 + categories.length) % categories.length)}
					>
						<Icon type="prev" className={styles.icon} />
					</div>
					<div 
						className={`${styles.controls__buttons__item} ${activeIndex === categories.length - 1 ? styles['controls__buttons__item--disabled'] : ''}`}
						onClick={() => rotateToIndex((activeIndex + 1) % categories.length)}
					>
						<Icon type="next" className={styles.icon} />
					</div>
				</div>
			</div>
			<div className={styles.controls__mobile}>
				{categories.map((_, index) => (
					<div 
						key={index} 
						className={`${styles.controls__mobile__item} ${activeIndex === index ? styles['controls__mobile__item--active'] : ''}`} 
						onClick={() => rotateToIndex(index)}
					></div>
				))}
			</div>
		</div>
	);
};

export default CarouselControls;
