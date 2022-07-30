export interface attendance {
	id: string | null;
	startAt: Date | null;
	endAt?: Date | null;
	note?: String | null;
	profileId: String;
}

export interface attendanceInitialProperties {
	onProceed: Function;
	onClose: Function;
	initialAttendance: attendance;
	profileIds?: string[] | null;
	multiEnabled?: boolean; // Boolean
}

export interface attendanceMutationVariables {
	[x: string]: any;
}

export interface AttendanceState extends attendance {
	error: String;
}
