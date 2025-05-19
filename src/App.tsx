import React, { useState, useMemo } from 'react';
import CircularCarousel from './components/CircularCarousel/CircularCarousel';
import CarouselControls from './components/CarouselControl/CarouselControl';
import Slider from './components/Slider/Slider';
import AnimatedYear from './components/AnimatedYear/AnimatedYear';
import data from './data/data.json';
import styles from './styles/app.module.scss'

interface Block {
	year: number;
	description: string;
}

interface Category {
	name: string;
	blocks: Block[];
}

const App: React.FC = () => {
	const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(0);
	const categories: Category[] = data;

	const handleCategoryChange = (index: number) => {
		setSelectedCategoryIndex(index);
	};

	const selectedBlocks = categories[selectedCategoryIndex].blocks;

	const { minYear, maxYear } = useMemo(() => {
		const years = selectedBlocks.map(block => block.year);
		return {
			minYear: Math.min(...years),
			maxYear: Math.max(...years),
		};
	}, [selectedBlocks]);

	return (
		<div className={styles.mainContainer}>
			<h1 className={styles.mainContainer__title}>Исторические<br />даты</h1>
			<div className={styles.mainContainer__circular}>
				<CircularCarousel
					categories={categories}
					activeIndex={selectedCategoryIndex}
					onCategoryChange={handleCategoryChange}
				/>
			</div>
			<div className={styles.mainContainer__years}>
				<div className={styles.mainContainer__years__item}>
					<AnimatedYear targetYear={minYear} />
				</div>
				<div className={styles.mainContainer__years__item}>
					<AnimatedYear targetYear={maxYear} />
				</div>
			</div>
			<div className={styles.mainContainer__controls}>
				<CarouselControls
					activeIndex={selectedCategoryIndex}
					total={categories.length}
					onCategoryChange={handleCategoryChange}
					categories={categories}
				/>
			</div>
			<div className={styles.mainContainer__slider}>
				<Slider blocks={selectedBlocks} />
			</div>
		</div>
	);	
};

export default App;
