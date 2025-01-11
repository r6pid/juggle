export interface Assignment {
	id: string;
	name: string;
	priority: number;
	timeframeId?: string;
	difficulty: number;
	due: Date;
}

export interface Timeframe {
	id: string;
	startDate: Date;
	endDate: Date;
	timeframeId: string;
	assignments: Assignment[];
}
