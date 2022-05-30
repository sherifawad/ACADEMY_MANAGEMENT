import { Suspense } from "react";
import dynamic from "next/dynamic";
import Navbar from "components/Navbar";
import Footer from "components/Footer";

const MainLayout = ({ children }) => {
	const Errors = dynamic(() => import("../Errors"), {
		ssr: false,
	});
	return (
		<div className="overflow-hidden">
			<header>
				{/* <Suspense>
					<Errors />
				</Suspense> */}
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
