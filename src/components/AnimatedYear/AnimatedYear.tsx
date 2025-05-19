import React, { useState, useEffect, useRef } from 'react';

interface AnimatedYearProps {
	targetYear: number;
	duration?: number;
}

const AnimatedYear: React.FC<AnimatedYearProps> = ({ targetYear, duration = 1000 }) => {
	const [displayYear, setDisplayYear] = useState(targetYear);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
		}

		const difference = Math.abs(targetYear - displayYear);
		if (difference === 0) return;

		const stepTime = Math.max(duration / difference, 20); 
		const step = targetYear > displayYear ? 1 : -1;

		intervalRef.current = setInterval(() => {
			setDisplayYear(prevYear => {
				const nextYear = prevYear + step;
				if ((step > 0 && nextYear >= targetYear) || (step < 0 && nextYear <= targetYear)) {
					clearInterval(intervalRef.current as NodeJS.Timeout);
					return targetYear;
				}
				return nextYear;
			});
		}, stepTime);

		return () => {
			if (intervalRef.current) {
				clearInterval(intervalRef.current);
			}
		};
	}, [targetYear, duration]);

	return <span>{displayYear}</span>;
};

export default AnimatedYear;
