import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

async function seed() {
	await client.user.deleteMany();
	await client.account.deleteMany();
	await client.session.deleteMany();
	await client.verificationToken.deleteMany();
	await client.exam.deleteMany();
	await client.attendance.deleteMany();
	await client.profile.deleteMany();
	await client.contact.deleteMany();
	await client.group.deleteMany();
	await client.grade.deleteMany();
	await client.role.deleteMany();

	const Roles = await client.role.createMany({
		data: [
			{
				id: 1,
				name: "systemAdmin",
				createdBy: "sherifawad",
			},
			{ id: 2, name: "admin", createdBy: "sherifawad" },
			{
				id: 3,
				name: "teacher",
				createdBy: "sherifawad",
			},
			{
				id: 4,
				name: "parent",
				createdBy: "sherifawad",
			},
			{
				id: 5,
				name: "student",
				createdBy: "sherifawad",
			},
			{
				id: 6,
				name: "guest",
				createdBy: "sherifawad",
			},
		],
	});

	const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS || "10", 10));
	const hashedPassword = await bcrypt.hash("admin", salt);

	const admin = await client.user.create({
		data: {
			id: "cl7au537v001443vyn6n56fbm",
			name: "sherifawad",
			email: "eng.sherifawad@gmail.com",
			emailVerified: new Date(),
			password: hashedPassword,
			role: {
				connect: {
					name: "systemAdmin",
				},
			},
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
