import TabsLayout from "components/layout/TabsLayout";
import Login from "components/Login";
import Register from "components/Register";
import SignUp from "components/SignUp";

function index() {
	const tabs = [
		{
			header: "SIGN Up",
			body: <Register setLogin={false} />,
		},
		{ header: "Login", body: <Login setLogin={true} /> },
	];
	return (
		<div>
			<TabsLayout color="pink" tabsList={tabs} />
		</div>
	);
}

export default index;
