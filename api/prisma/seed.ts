import { PrismaClient } from "@internal/prisma/client";

const client = new PrismaClient();

async function seed() {
	await client.exam.deleteMany();
	await client.attendance.deleteMany();
	await client.profile.deleteMany();
	await client.contact.deleteMany();
	await client.user.deleteMany();
	await client.group.deleteMany();
	await client.grade.deleteMany();
	await client.domain.deleteMany();
	await client.permission.deleteMany();
	await client.role.deleteMany();

	const Roles = await client.role.createMany({
		data: [
			{
				name: "systemAdmin",
			},
			{
				name: "admin",
			},
			{
				name: "teacher",
			},
			{
				name: "parent",
			},
			{
				name: "student",
			},
			{
				name: "guest",
			},
		],
	});

	const domains = await client.domain.createMany({
		data: [
			{
				name: "user",
			},
			{
				name: "student",
			},
			{
				name: "grade",
			},
			{
				name: "group",
			},
			{
				name: "attendance",
			},
			{
				name: "exam",
			},
			{
				name: "assignment",
			},
		],
	});

	const permissions = await client.permission.createMany({
		data: [
			{
				name: "full",
			},
			{
				name: "delete",
			},
			{
				name: "edit",
			},
			{
				name: "deActivate",
			},
			{
				name: "read",
			},
		],
	});

	const admin = await client.user.create({
		data: {
			id: "cl7au537v001443vyn6n56fbm",
			name: "Sherif Awad",
			roles: {
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
