import React, { useState, useRef, useEffect } from 'react';
import Icon from '../Helpers/Icons/Icons';
import styles from './BlocksCarousel.module.scss';

interface Block {
	year: number;
	description: string;
}

interface BlocksCarouselProps {
	blocks: Block[];
}

const BlocksCarousel: React.FC<BlocksCarouselProps> = ({ blocks }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [fadeOut, setFadeOut] = useState(false);
	const [displayedBlocks, setDisplayedBlocks] = useState<Block[]>(blocks);
	const containerRef = useRef<HTMLDivElement>(null);
	const isDragging = useRef(false);
	const startX = useRef(0);
	const scrollLeft = useRef(0);
	const startTouchX = useRef(0);

	const handlePrev = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex > 0 ? prevIndex - 1 : blocks.length - 1
		);
	};

	const handleNext = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex < blocks.length - 1 ? prevIndex + 1 : 0
		);
	};

	useEffect(() => {
		if (containerRef.current) {
			const container = containerRef.current;
			const blockWidth = container.offsetWidth / 3;
			container.scrollTo({
				left: currentIndex * blockWidth,
				behavior: 'smooth', // Плавная прокрутка при навигации
			});
		}
	}, [currentIndex]);

	useEffect(() => {
		setFadeOut(true);
		const timer = setTimeout(() => {
			setDisplayedBlocks(blocks); // Обновляем блоки после анимации
			setCurrentIndex(0); // Сброс индекса при смене блоков
			setFadeOut(false);
		}, 500); // Время, равное времени анимации

		// Добавляем задержку перед мгновенной прокруткой
		const scrollTimer = setTimeout(() => {
			if (containerRef.current) {
				const container = containerRef.current;
				container.scrollTo({
					left: 0, // Прокручиваем к левому краю
					behavior: 'auto', // Мгновенная прокрутка
				});
			}
		}, 500); // Задержка, равная времени анимации

		return () => {
			clearTimeout(timer);
			clearTimeout(scrollTimer);
		};
	}, [blocks]);

	const onMouseDown = (e: React.MouseEvent) => {
		isDragging.current = true;
		startX.current = e.pageX - (containerRef.current?.offsetLeft || 0);
		scrollLeft.current = containerRef.current?.scrollLeft || 0;
	};

	const onMouseLeave = () => {
		isDragging.current = false;
	};

	const onMouseUp = () => {
		isDragging.current = false;
		if (containerRef.current) {
			const container = containerRef.current;
			const blockWidth = container.offsetWidth / 3; 
			const scrollPosition = container.scrollLeft;

			let newIndex = Math.round(scrollPosition / blockWidth);

			newIndex = Math.max(0, Math.min(newIndex, blocks.length - 1));

			setCurrentIndex(newIndex);
		}
	};

	const onMouseMove = (e: React.MouseEvent) => {
		if (!isDragging.current || !containerRef.current) return;
		const x = e.pageX - containerRef.current.offsetLeft;
		const walk = x - startX.current;
		containerRef.current.scrollLeft = scrollLeft.current - walk;
	};

	// Обработчики для касаний
	const onTouchStart = (e: React.TouchEvent) => {
		isDragging.current = true;
		startTouchX.current = e.touches[0].clientX; // Получаем начальную позицию касания
		scrollLeft.current = containerRef.current?.scrollLeft || 0;
	};

	const onTouchMove = (e: React.TouchEvent) => {
		if (!isDragging.current || !containerRef.current) return;
		const x = e.touches[0].clientX; // Получаем текущую позицию касания
		const walk = x - startTouchX.current;
		containerRef.current.scrollLeft = scrollLeft.current - walk;
	};

	const onTouchEnd = () => {
		isDragging.current = false;
		if (containerRef.current) {
			const container = containerRef.current;
			const blockWidth = container.offsetWidth / 3;
			const scrollPosition = container.scrollLeft;

			let newIndex = Math.round(scrollPosition / blockWidth);

			newIndex = Math.max(0, Math.min(newIndex, blocks.length - 1));

			setCurrentIndex(newIndex);
		}
	};

	const isPrevHidden = currentIndex === 0;
	const isNextHidden = currentIndex === blocks.length - 3;

	return (
		<div className={styles.blocksCarousel}>
			<div className={`${styles.blocksCarousel__navButton} ${styles.blocksCarousel__navButton_prev} ${isPrevHidden ? styles['blocksCarousel__navButton_prev--hide'] : ''}`} onClick={handlePrev}>
				<Icon type="prev" className={styles.icon} />
			</div>
			<div
				className={styles.blocksCarousel__container}
				ref={containerRef}
				onMouseDown={onMouseDown}
				onMouseLeave={onMouseLeave}
				onMouseUp={onMouseUp}
				onMouseMove={onMouseMove}
				onTouchStart={onTouchStart} 
				onTouchMove={onTouchMove}   
				onTouchEnd={onTouchEnd}    
			>
				{displayedBlocks.map((block, index) => (
					<div key={index} className={`${styles.blocksCarousel__item} ${fadeOut ? styles.fadeOut : ''} ${currentIndex === index ? styles['blocksCarousel__item--active'] : ''}`}>
						<div className={styles.blocksCarousel__item__name}>{block.year}</div>
						<div className={styles.blocksCarousel__item__description}>{block.description}</div>
					</div>
				))}
			</div>
			<div className={`${styles.blocksCarousel__navButton} ${styles.blocksCarousel__navButton_next} ${isNextHidden ? styles['blocksCarousel__navButton_next--hide'] : ''}`} onClick={handleNext}>
				<Icon type="next" className={styles.icon} />
			</div>
		</div>
	);
};

export default BlocksCarousel;
