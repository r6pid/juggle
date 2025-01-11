export interface Assignment {
	id: string;
	name: string;
	priority: number;
	difficulty: number;
	due: Date;
}

export interface Timeframe {
	id: string;
	startDate: Date;
	endDate: Date;
}
