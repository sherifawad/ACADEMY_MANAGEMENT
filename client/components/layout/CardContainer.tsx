function CardContainer({ children, width = "" }) {
	return <div className={`bg-white rounded-lg shadow-xl border p-4 ${width}`}>{children}</div>;
}

export default CardContainer;
