export interface exam {
	id?: string | null;
	score?: Number | null;
	date?: Date | null;
	note?: String | null;
	profileId?: String;
}

export interface examInitialProperties {
	onProceed: Function;
	onClose: Function;
	initialExam: exam;
	profileIds?: string[] | null;
	studentsAndScores?: { [x: string]: number } | null;
	multiEnabled?: boolean; // Boolean
}

export interface examMutationVariables {
	[x: string]: any;
}

export interface ExamState extends exam {
	error: String;
}
