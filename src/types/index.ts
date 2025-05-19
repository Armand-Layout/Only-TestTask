export interface Block {
	year: number;
	description: string;
}

export interface Category {
	name: string;
	blocks: Block[];
}