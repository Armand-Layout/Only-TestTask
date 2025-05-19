import React, { useEffect, useRef, useState } from 'react';
import styles from './CircularCarousel.module.scss';

interface Block {
	year: number;
	description: string;
}

interface Category {
	name: string;
	blocks: Block[];
}

interface CircularCarouselProps {
	categories: Category[];
	activeIndex: number;
	onCategoryChange: (index: number) => void;
}

const CircularCarousel: React.FC<CircularCarouselProps> = ({
	categories,
	activeIndex,
	onCategoryChange,
}) => {
	const radius = 265;
	const angleStep = 360 / categories.length;
	const [visibleNameIndex, setVisibleNameIndex] = useState<number | null>(null);
	const carouselRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<HTMLDivElement[]>([]);

	useEffect(() => {
		const timer = setTimeout(() => {
			setVisibleNameIndex(activeIndex);
		}, 1000);

		return () => clearTimeout(timer);
	}, [activeIndex]);

	useEffect(() => {
		if (carouselRef.current) {
			const parent = carouselRef.current;
			const x = parent.clientWidth / 2;
			const y = parent.clientHeight / 2;

			itemsRef.current.forEach((item, i) => {
				if (item) {
					const angle = (i * 2 * Math.PI) / categories.length;
					item.style.top = `${y + radius * Math.sin(angle)}px`;
					item.style.left = `${x + radius * Math.cos(angle)}px`;
				}
			});
		}
	}, [categories.length, radius]);

	const rotateToIndex = (index: number) => {
		onCategoryChange(index);
	};

	// Очищаем массив refs перед каждым обновлением
	itemsRef.current = [];

	return (
		<div className={styles.carouselContainer}>
			<div 
				className={styles.carousel} 
				ref={carouselRef}
				style={{ 
					transform: `rotate(${-angleStep * activeIndex - 60}deg)`,
				}}
			>
				{categories.map((category, index) => {

					const isActive = index === activeIndex;
					const isVisible = index === visibleNameIndex;

					return (
						<div 
							key={index}
							ref={el => {
								if (el) itemsRef.current[index] = el;
							}}
							className={styles.childWrapper}
							style={{ 
								transform: `rotate(${angleStep * activeIndex + 60}deg)`,
							}}
						>
							<div 
								className={`${styles.child} ${isActive ? styles['child--active'] : ''} ${
									isVisible ? styles['visible-name'] : ''
								}`} 
								onClick={() => rotateToIndex(index)}
							>
								<span className={styles.child__index}>{index + 1}</span>
								{isActive && <span className={styles.child__name}>{category.name}</span>}
							</div>
						</div>
					)
				})}
			</div>
		</div>
	);
};

export default CircularCarousel;