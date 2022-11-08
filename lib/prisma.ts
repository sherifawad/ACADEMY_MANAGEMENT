// import { PrismaClient } from "@internal/prisma/client";

import { PrismaClient } from "@prisma/client";

interface CustomNodeJsGlobal {
	prisma: PrismaClient | undefined;
}

declare const global: CustomNodeJsGlobal;

const client = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = client;

export default client;
