import React, { useRef, useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import Icon from '../Helpers/Icons/Icons';
import styles from './Slider.module.scss';

interface Block {
	year: number;
	description: string;
}

interface SliderProps {
	blocks: Block[];
}

const Slider: React.FC<SliderProps> = ({ blocks }) => {
	const swiperRef = useRef<any>(null); // Создаем ref для Swiper
	const [fadeOut, setFadeOut] = useState(false); // Состояние для управления эффектом исчезновения
	const [displayedBlocks, setDisplayedBlocks] = useState<Block[]>(blocks); // Блоки для отображения

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.swiper.navigation.update(); // Обновляем навигацию
		}
	}, [displayedBlocks]);

	useEffect(() => {
		setFadeOut(true);
		const timer = setTimeout(() => {
			setDisplayedBlocks(blocks); // Обновляем блоки после анимации
			if (swiperRef.current) {
				swiperRef.current.swiper.slideTo(0, 0); // Прокручиваем к первому слайду мгновенно
			}
			setFadeOut(false); // Сбрасываем эффект исчезновения
		}, 500); // Время, равное времени анимации

		// Добавляем задержку перед мгновенной прокруткой
		const scrollTimer = setTimeout(() => {
			if (swiperRef.current) {
				const container = swiperRef.current.swiper.wrapperEl; // Получаем элемент обертки
				container.style.transform = 'translate3d(0px, 0px, 0px)';
			}
		}, 500); // Задержка, равная времени анимации

		return () => {
			clearTimeout(timer);
			clearTimeout(scrollTimer);
		};
	}, [blocks]);

	return (
		<div className={styles.slider}>
			<div
				className={`${styles.slider__navButton_prev} ${styles.slider__navButton}`}
			>
				<Icon type="prev" className={styles.icon} />
			</div>
			<Swiper
				ref={swiperRef} // Привязываем ref к Swiper
				slidesPerView={1.5}
                breakpoints={{
                    1025: {
                        slidesPerView: 3,
                    },
                    769: {
                        slidesPerView: 2,
                    },
                }}
				spaceBetween={30}
				modules={[Navigation]}
				navigation={{
					nextEl: `.${styles.slider__navButton_next}`,
					prevEl: `.${styles.slider__navButton_prev}`,
					disabledClass: styles.slider__navButton_hide,
				}}
				className={`${styles.slider__swiper} ${fadeOut ? styles.fadeOut : ''}`} // Добавляем класс для анимации
				wrapperClass={styles.slider__swiper__wrapper}
			>
				{displayedBlocks.map((block, index) => (
					<SwiperSlide key={index} className={`${styles.slider__item} ${fadeOut ? styles.fadeOut : ''}`}>
						<div className={styles.slider__item__name}>{block.year}</div>
						<div className={styles.slider__item__description}>{block.description}</div>
					</SwiperSlide>
				))}
			</Swiper>
			<div
				className={`${styles.slider__navButton_next} ${styles.slider__navButton}`}
			>
				<Icon type="next" className={styles.icon} />
			</div>
		</div>
	);
};

export default Slider;
