import { ReactNode } from "react";

interface props {
	children: ReactNode;
	width?: string;
}
function CardContainer({ children, width = "" }: props) {
	return <div className={`bg-white rounded-lg shadow-xl border p-4 ${width}`}>{children}</div>;
}

export default CardContainer;
