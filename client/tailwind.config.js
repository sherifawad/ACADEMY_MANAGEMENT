module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
		"./customHooks/**/*.{js,ts,jsx,tsx}",
		"./features/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: "1rem",
				screens: {
					lg: "1024px",
				},
			},
		},
	},
	plugins: [
		require("tailwindcss-logical"),
		function ({ addVariant }) {
			addVariant("children", "& > *");
		},
	],
};
