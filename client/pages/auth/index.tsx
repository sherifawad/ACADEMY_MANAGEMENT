import TabsLayout from "components/layout/TabsLayout";
import Login from "components/Login";
import Register from "components/Register";
import SignUp from "components/SignUp";
import Paths from "core/paths";
import { checkSession } from "core/utils";
import { GetServerSideProps } from "next";
import { Session, unstable_getServerSession } from "next-auth";
import { authOptions } from "pages/api/auth/[...nextauth]";

function index() {
	const tabs = [
		{ header: "Login", body: <Login setLogin={true} /> },
		{
			header: "SIGN Up",
			body: <Register setLogin={false} />,
		},
	];
	return (
		<div>
			<TabsLayout color="pink" tabsList={tabs} />
		</div>
	);
}

export default index;
