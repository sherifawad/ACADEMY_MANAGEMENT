import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

async function seed() {
	await client.refreshToken.deleteMany();
	await client.userPassword.deleteMany();
	await client.exam.deleteMany();
	await client.attendance.deleteMany();
	await client.profile.deleteMany();
	await client.contact.deleteMany();
	await client.user.deleteMany();
	await client.group.deleteMany();
	await client.grade.deleteMany();

	const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10", 10));
	const hashedPassword = await bcrypt.hash("password", salt);

	const user = await client.user.create({
		data: {
			name: "user",
			role: Role.USER,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
			contact: {
				create: {
					email: "user@user.com",
					address: "user address",
					phone: "012012012012012",
				},
			},
		},
		include: {
			password: true,
			contact: true,
		},
	});
	const admin = await client.user.create({
		data: {
			name: "admin",
			role: Role.ADMIN,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
			contact: {
				create: {
					email: "admin@admin.com",
					address: "admin address",
					phone: "012012012012011",
				},
			},
		},
		include: {
			password: true,
			contact: true,
		},
	});

	const student = await client.user.create({
		data: {
			name: "student",
			role: Role.Student,
			password: {
				create: {
					password: hashedPassword,
					forceChange: false,
				},
			},
			contact: {
				create: {
					email: "student@student.com",
					address: "admin address",
					phone: "012012012012015",
				},
			},
		},
		include: {
			password: true,
			contact: true,
		},
	});

	const grade = await client.grade.create({
		data: {
			name: "prepSchool",
			createdBy: admin.id,
		},
	});

	const group = await client.group.create({
		data: {
			name: "SMW",
			startAt: "13:00",
			endAt: "14:00",
			gradeId: grade.id,
			createdBy: admin.id,
		},
	});
	const profile = await client.profile.create({
		data: {
			id: student.id,
			bio: "student Bio",
			groupId: group.id,
			createdBy: admin.id,
		},
	});
	const exam = await client.exam.create({
		data: {
			profileId: profile.id,
			score: 55.5,
			date: new Date(),
			createdBy: admin.id,
		},
	});

	const attendance = await client.attendance.create({
		data: {
			profileId: profile.id,
			groupId: group.id,
			startAt: new Date(),
			endAt: new Date(new Date().setHours(new Date().getHours() + 2)),
			note: "seeded",
			createdBy: admin.id,
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
