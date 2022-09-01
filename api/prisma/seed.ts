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
	await client.role_Domain_Permission.deleteMany();

	const domains = await client.domain.createMany({
		data: [
			{
				id: 1,
				name: "all",
			},
			{
				id: 2,
				name: "user",
			},
			{
				id: 3,
				name: "gardian",
			},
			{
				id: 4,
				name: "student",
			},
			{
				id: 5,
				name: "grade",
			},
			{
				id: 6,
				name: "group",
			},
			{
				id: 7,
				name: "attendance",
			},
			{
				id: 8,
				name: "exam",
			},
			{
				id: 9,
				name: "assignment",
			},
		],
	});

	const permissions = await client.permission.createMany({
		data: [
			{
				id: 1,
				name: "full",
			},
			{
				id: 2,
				name: "delete",
			},
			{
				id: 3,
				name: "deleteSelf",
			},
			{
				id: 4,
				name: "edit",
			},
			{
				id: 5,
				name: "editSelf",
			},
			{
				id: 6,
				name: "deActivateSelf",
			},
			{
				id: 7,
				name: "deActivate",
			},
			{
				id: 8,
				name: "read",
			},
		],
	});

	const Roles = await client.role.createMany({
		data: [
			{
				id: 1,
				name: "systemAdmin",
			},
			{ id: 2, name: "admin" },
			{
				id: 3,
				name: "teacher",
			},
			{
				id: 4,
				name: "parent",
			},
			{
				id: 5,
				name: "student",
			},
			{
				id: 6,
				name: "guest",
			},
		],
	});

	const rdp = await client.role_Domain_Permission.create({
		data: {
			domain: {
				connect: {
					name: "all",
				},
			},
			permission: {
				connect: {
					name: "full",
				},
			},
			role: {
				connect: {
					name: "systemAdmin",
				},
			},
		},
	});

	await client.role_Domain_Permission.createMany({
		data: [
			{
				roleId: 4,
				domainId: 3,
				permissionId: 4,
			},
			{
				roleId: 4,
				domainId: 4,
				permissionId: 8,
			},
		],
	});

	const admin = await client.user.create({
		data: {
			id: "cl7au537v001443vyn6n56fbm",
			name: "Sherif Awad",
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
