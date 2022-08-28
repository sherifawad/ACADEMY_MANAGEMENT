import { useState } from "react";

export interface TabsInput {
	color: string;
	tabsList: { header: any; body: JSX.Element }[];
}
function TabsLayout({ color, tabsList }: TabsInput) {
	const [openTab, setOpenTab] = useState(1);
	return (
		<div>
			<div className="flex flex-wrap  justify-center ">
				<div className="w-2/5">
					<ul className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row" role="tablist">
						{tabsList?.map((tab, index) => (
							<li key={index} className="-mb-px mr-2 last:mr-0 flex-auto text-center">
								<a
									className={
										"text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
										(openTab === index + 1
											? "text-white bg-" + color + "-600"
											: "text-" + color + "-600 bg-white")
									}
									onClick={(e) => {
										e.preventDefault();
										setOpenTab(index + 1);
									}}
									data-toggle="tab"
									href={`#link${index + 1}`}
									role="tablist"
								>
									{tab.header}
								</a>
							</li>
						))}
					</ul>
					<div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
						<div className="px-4 py-5 flex-auto">
							{tabsList?.map((tab, index) => (
								<div
									key={index}
									className={openTab === index + 1 ? "block" : "hidden"}
									id={`link${index + 1}`}
								>
									{tab.body}
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default TabsLayout;
