/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["avatars.githubusercontent.com"],
	},
	// async headers() {
	// 	return [
	// 		{
	// 			source: "/api/graphql",
	// 			headers: [
	// 				{ key: "Access-Control-Allow-Credentials", value: "true" },
	// 				{
	// 					key: "Access-Control-Allow-Origin",
	// 					value: "https://studio.apollographql.com",
	// 				},
	// 				{ key: "Access-Control-Allow-Headers", value: "Content-Type" },
	// 			],
	// 		},
	// 	];
	// },
};

module.exports = nextConfig;
