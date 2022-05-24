import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

async function seed() {
	await client.refreshToken.deleteMany();
	await client.userPassword.deleteMany();
	await client.exam.deleteMany();
	await client.profile.deleteMany();
	await client.user.deleteMany();
	await client.group.deleteMany();
	await client.grade.deleteMany();

	const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10", 10));
	const hashedPassword = await bcrypt.hash("password", salt);

	const user = await client.user.create({
		data: {
			email: "user@user.com",
			name: "user",
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
		},
		include: {
			password: true,
		},
	});
	const admin = await client.user.create({
		data: {
			email: "admin@admin.com",
			name: "admin",
			role: Role.ADMIN,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
		},
		include: {
			password: true,
		},
	});

	const student = await client.user.create({
		data: {
			email: "student@student.com",
			name: "student",
			role: Role.Student,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
		},
		include: {
			password: true,
		},
	});

	const grade = await client.grade.create({
		data: {
			name: "prepSchool",
		},
	});

	const group = await client.group.create({
		data: {
			name: "SMW",
			startAt: "13:00",
			endAt: "14:00",
			gradeId: grade.id,
		},
	});
	const profile = await client.profile.create({
		data: {
			id: student.id,
			bio: "student Bio",
			groupId: group.id,
		},
	});
	const exam = await client.exam.create({
		data: {
			profileId: profile.id,
			score: 55.5,
		},
	});
}

seed()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await client.$disconnect();
	});
