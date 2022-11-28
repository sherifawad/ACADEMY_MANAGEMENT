import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang="ar" dir="rtl">
			<Head />
			<body className={`${process.env.NODE_ENV !== "production" ? "debug-screens" : ""}`}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
