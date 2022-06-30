function CardContainer({ children, width = "w-full" }) {
	return <div className={`bg-white rounded-lg shadow-xl border p-8 ${width}`}>{children}</div>;
}

export default CardContainer;
