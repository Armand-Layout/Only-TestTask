declare module '*.scss' {
	const classes: { [key: string]: string };
	export default classes;
	export const mainContainer: string;
	export const mainContainer__title: string;
	export const mainContainer__circular: string;
	export const mainContainer__years: string;
	export const mainContainer__years__item: string;
	export const mainContainer__controls: string;
	export const mainContainer__slider: string;
}

declare module '*.scss?modules=true' {
	const content: { [className: string]: string };
	export default content;
}