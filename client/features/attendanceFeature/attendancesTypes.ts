export interface attendance {
	id: string | null;
	startAt: Date | null;
	endAt?: Date | null;
	note?: String | null;
	profileId: String;
}

export interface initialProperties {
	onProceed: Function;
	onClose: Function;
	initialAttendance: attendance;
	profileIds?: string[];
	edit?: boolean | null; // Boolean
}

export interface attendanceMutationVariables {
	[x: string]: any;
}

export interface AttendanceState extends attendance {
	error: String;
}