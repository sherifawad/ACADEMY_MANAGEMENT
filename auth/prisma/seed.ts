import { PrismaClient } from "@internal/prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

async function seed() {
	await client.userPassword.deleteMany();
	await client.user.deleteMany();
	await client.account.deleteMany();
	await client.session.deleteMany();
	await client.verificationToken.deleteMany();
	await client.domain.deleteMany();
	await client.permission.deleteMany();
	await client.role.deleteMany();

	const Roles = await client.role.createMany({
		data: [
			{
				name: "systemAdmin"
			},
			{
				name: "admin"
			},
			{
				name: "teacher"
			},
			{
				name: "parent"
			},
			{
				name: "student"
			},
			{
				name: "guest"
			}
		]
	});

	const domains = await client.domain.createMany({
		data: [
			{
				name: "user"
			},
			{
				name: "student"
			},
			{
				name: "grade"
			},
			{
				name: "group"
			},
			{
				name: "attendance"
			},
			{
				name: "exam"
			},
			{
				name: "assignment"
			}
		]
	});

	const permissions = await client.permission.createMany({
		data: [
			{
				name: "full"
			},
			{
				name: "delete"
			},
			{
				name: "edit"
			},
			{
				name: "deActivate"
			},
			{
				name: "read"
			}
		]
	});

	const salt = await bcrypt.genSalt(
		parseInt(process.env.SALT_ROUNDS || "10", 10)
	);
	const hashedPassword = await bcrypt.hash("adminPassword@root#1", salt);

	const admin = await client.user.create({
		data: {
			id: "cl7au537v001443vyn6n56fbm",
			name: "sherif awad",
			email: "eng.sherifawad@gmail.com",
			emailVerified: new Date(),
			password: {
				create: {
					password: hashedPassword,
					forceChange: false
				}
			}
		},
		include: {
			password: true
		}
	});

	const profile = await client.account.create({
		data: {
			userId: admin.id,
			type: "credentials",
			provider: "credentials",
			providerAccountId: "domain-login"
		}
	});
}

seed()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await client.$disconnect();
	});
