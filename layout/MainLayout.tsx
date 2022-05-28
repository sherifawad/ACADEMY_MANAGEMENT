import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "Components/Navbar";
import Footer from "Components/Footer";

const MainLayout = ({ children }) => {
	const Errors = dynamic(() => import("../Components/Errors"), {
		ssr: false,
	});
	return (
		<div>
			<header>
				<Suspense>
					<Errors />
				</Suspense>
				<Navbar />
			</header>
			<main>{children}</main>
			<footer>
				<Footer />
			</footer>
		</div>
	);
};

export default MainLayout;
