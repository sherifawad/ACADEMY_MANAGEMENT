/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,ts,jsx,tsx}",
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {},
	},
	plugins: [
		require("tailwindcss-logical"),
		require("tailwindcss-debug-screens"),
		function ({ addVariant }) {
			addVariant("child", "& > *");
			addVariant("children", "& *");
		},
	],
};
