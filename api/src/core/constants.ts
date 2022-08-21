const constants = {
	JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "erhjebrgjhetbgethj",
	JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "rkjjrebgjhbgj4hgb",
	JWT_ACCESS_EXPIRATION: process.env.JWT_ACCESS_EXPIRATION || "5 minutes",
	JWT_ACCESS_EXPIRATION_Minutes: process.env.JWT_ACCESS_EXPIRATION_Minutes || 5,
	JWT_REFRESH_EXPIRATION_DAYS: process.env.JWT_REFRESH_EXPIRATION_DAYS || 14,
	JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION || "3 minutes",
};

export default constants;
