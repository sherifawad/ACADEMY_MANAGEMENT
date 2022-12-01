import Hero from "@/components/Hero";
import { PrimaryButton } from "@/components/ui/Button";
import InputWithLabel from "@/components/ui/InputWithLabel";
import Head from "next/head";
import { FormEvent, useState } from "react";

interface sport {
	id: string;
	price: number;
}

interface player {
	name: string;
	sports: sport[];
}

export default function Home() {
	const [data, setData] = useState<player[]>([]);
	const [calculatedPrice, setCalculatedPrice] = useState<any[]>([]);
	const addHandling = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const sports = [];
		if (Number(e.target.g1.value) > 0) {
			sports.push({ id: `${e.target.name.value}g1`, price: Number(e.target.g1.value) });
		}
		if (Number(e.target.g2.value) > 0) {
			sports.push({ id: `${e.target.name.value}g1`, price: Number(e.target.g2.value) });
		}
		if (Number(e.target.g3.value) > 0) {
			sports.push({ id: `${e.target.name.value}g1`, price: Number(e.target.g3.value) });
		}
		if (Number(e.target.g4.value) > 0) {
			sports.push({ id: `${e.target.name.value}g1`, price: Number(e.target.g4.value) });
		}
		const sortedSports = sports.sort((s1, s2) =>
			s1.price < s2.price ? 1 : s1.price > s2.price ? -1 : 0
		);
		const constructedData = {
			name: e.target.name.value,
			sports: sortedSports,
		};
		setData((prev) => [...prev, constructedData]);
		e.target.reset();
	};
	const calculateSports = () => {
		const currentDay = new Date().getDate();
		console.log("🚀 ~ file: index.tsx ~ line 47 ~ calculateSports ~ currentDay", currentDay);
		const result = data.reduce((acc: player[], current: player) => {
			// لاعب واحد
			if (data.length === 1) {
				// لو عدد الرياضات واحد
				if (data[0].sports.length === 1) {
					if (currentDay <= 7) {
						return [
							{
								name: current.name,
								sports: current.sports.map((s) => {
									return { ...s, price: s.price * 0.9 };
								}),
							},
						];
					}
					return [current];
				}
				// لو عدد الرياضات 2
				if (data[0].sports.length === 2) {
					return [
						{
							name: data[0].name,
							sports: data[0].sports.map((s, i) => {
								if (i === 0) {
									return { ...s, price: s.price * 0.9 };
								}
								return s;
							}),
						},
					];
				}
				// لو عدد الرياضات اكبر من 2
				return [
					{
						name: data[0].name,
						sports: data[0].sports.map((s, i) => {
							if (i === 0) {
								return { ...s, price: s.price * 0.8 };
							} else if (i === 1) {
								return { ...s, price: s.price * 0.9 };
							}
							return s;
						}),
					},
				];
			}
			// لو عدد اللاعبين اقل من 3
			if (data.length < 3) {
				const haveManySports = data.every((p) => p.sports.length > 1);
				// كل لاعب يملك اكثر من لعبة
				if (haveManySports) {
					const isSecondSportBigger = data[0].sports[0] <= data[1].sports[0];
					// قيمة اللعبةالأكبر لللاعب الثاني أكبر
					if (isSecondSportBigger) {
						return [
							{
								name: data[0].name,
								sports: data[0].sports.map((s, i) => {
									if (i === 0) {
										return { ...s, price: s.price * 0.9 };
									}
									return s;
								}),
							},
							{
								name: data[1].name,
								sports: data[1].sports.map((s, i) => {
									if (i === 0) {
										return { ...s, price: s.price * 0.8 };
									}
									return s;
								}),
							},
						];
					}
					// قيمة اللعبةالأكبر لللاعب الأول أكبر
					return [
						{
							name: data[1].name,
							sports: data[1].sports.map((s, i) => {
								if (i === 0) {
									return { ...s, price: s.price * 0.9 };
								}
								return s;
							}),
						},
						{
							name: data[0].name,
							sports: data[0].sports.map((s, i) => {
								if (i === 0) {
									return { ...s, price: s.price * 0.8 };
								}
								return s;
							}),
						},
					];
				} else {
					const playerIndexWithMultiple = data.findIndex((x) => x.sports.length > 1);
					// كل لاعب يملك رياضة واحدة فقط
					if (playerIndexWithMultiple === -1) {
						// قيمة لعبة اللاعب الاول أكبر
						if (data[0].sports[0].price > data[1].sports[0].price) {
							return [
								{
									name: data[0].name,
									sports: data[0].sports.map((s) => {
										return { ...s, price: s.price * 0.9 };
									}),
								},
								currentDay <= 7
									? {
											name: data[1].name,
											sports: data[1].sports.map((s) => {
												return { ...s, price: s.price * 0.9 };
											}),
									  }
									: {
											name: data[1].name,
											sports: data[1].sports,
									  },
							];
						}
						return [
							{
								name: data[1].name,
								sports: data[1].sports.map((s) => {
									return { ...s, price: s.price * 0.9 };
								}),
							},
							currentDay <= 7
								? {
										name: data[0].name,
										sports: data[0].sports.map((s) => {
											return { ...s, price: s.price * 0.9 };
										}),
								  }
								: {
										name: data[0].name,
										sports: data[0].sports,
								  },
						];
					} else {
						// اللاعب الذي يملك أكثر من لعبة
						const higherPlayer = data[playerIndexWithMultiple];
						// اللاعب الذي يملك لعبة واحدة
						const lowerPlayer = data[playerIndexWithMultiple === 0 ? 1 : 0];
						// لو اللاعب  الاكبر يملك أكثر من لعبتين
						if (higherPlayer.sports.length > 2) {
							// سعر اكبر ثاني لعبة أكبر من سعر لعبة اللاعب الثاني
							if (higherPlayer.sports[1].price > lowerPlayer.sports[0].price) {
								return [
									{
										name: higherPlayer.name,
										sports: higherPlayer.sports.map((s, i) => {
											if (i === 0) {
												return { ...s, price: s.price * 0.8 };
											} else if (i === 1) {
												return { ...s, price: s.price * 0.9 };
											}
											return s;
										}),
									},
									lowerPlayer,
								];
							}
						}
						return [
							{
								name: higherPlayer.name,
								sports: data[1].sports.map((s, i) => {
									if (i === 0) {
										return { ...s, price: s.price * 0.9 };
									}
									return s;
								}),
							},
							{
								name: lowerPlayer.name,
								sports: lowerPlayer.sports.map((s, i) => {
									return { ...s, price: s.price * 0.8 };
								}),
							},
						];
					}
				}
			}
			// عدد اللاعبين اكبر من 2
			else {
				// اللاعبين الذين يمتلكون أكثر من لعبة
				const higherPlayers = data.filter((l) => l.sports.length > 2);
				if (higherPlayers && higherPlayers.length > 0) {
					// ترتيب اللاعبين حسب سعر اكبر ثاني لعبة
					const sortedHigherPlayers = higherPlayers.sort((p1, p2) =>
						p1.sports[1] < p2.sports[1] ? 1 : p1.sports[1] > p2.sports[1] ? -1 : 0
					);
					console.log(
						"🚀 ~ file: index.tsx ~ line 217 ~ result ~ sortedHigherPlayers",
						sortedHigherPlayers
					);
					// اللاعب الذي يملك اكبر  سعر لعبة
					const heighestPlayer = data.find((p) => p.name === sortedHigherPlayers[0].name) as player;
					// أول لاعب في القائمة يمتلك أكبر ثاني لعبة
					if (heighestPlayer?.sports[1]?.price > sortedHigherPlayers[1]?.sports[1]?.price) {
						return data.map((p) => {
							if (p.name === heighestPlayer.name) {
								return {
									name: heighestPlayer.name,
									sports: heighestPlayer.sports.map((s, i) => {
										if (i === 0) {
											return { ...s, price: s.price * 0.8 };
										}
										if (i === 1) {
											return { ...s, price: s.price * 0.9 };
										}
										return s;
									}),
								};
							}
							return p;
						});
					}
				}
				// ترتيب اللاعبين حسب سعر أكبر لعبة
				const sortedHigherPlayers = data.sort((p1, p2) =>
					p1.sports[1] < p2.sports[0] ? 1 : p1.sports[0] > p2.sports[0] ? -1 : 0
				);
				// ثاني لاعب في الترتيب عند أكثر من لعبة
				if (sortedHigherPlayers[1].sports.length > 1) {
					return sortedHigherPlayers.map((p, i) => {
						switch (i) {
							case 0:
								return {
									name: p.name,
									sports: p.sports.map((s, i) => {
										if (i === 0) {
											return { ...s, price: s.price * 0.8 };
										}
										return s;
									}),
								};
							case 1:
								return {
									name: p.name,
									sports: p.sports.map((s, i) => {
										if (i === 0) {
											return { ...s, price: s.price * 0.9 };
										}
										return s;
									}),
								};
							default:
								return p;
						}
					});
				}
				return sortedHigherPlayers.map((p, i) => {
					switch (i) {
						case 0:
							return {
								name: p.name,
								sports: p.sports.map((s, i) => {
									if (i === 0) {
										return { ...s, price: s.price * 0.8 };
									}
									return s;
								}),
							};
						case 1:
							return {
								name: p.name,
								sports: p.sports.map((s, i) => {
									if (i === 0) {
										return { ...s, price: s.price * 0.9 };
									}
									return s;
								}),
							};

						default:
							return p;
					}
				});
			}
			return acc;
		}, []);
		setCalculatedPrice(result);
	};

	return (
		<div>
			<Head>
				<title>الصفحة الرئيسية</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<div className="flex justify-around w-full">
				<div>
					<form onSubmit={addHandling} className="grid place-content-center">
						<InputWithLabel label="name" id="name" />
						<InputWithLabel label="gameOnePrice" id="g1" />
						<InputWithLabel label="gameTowPrice" id="g2" />
						<InputWithLabel label="gameThreePrice" id="g3" />
						<InputWithLabel label="gameFourPrice" id="g4" />
						<PrimaryButton type="submit">Add</PrimaryButton>
					</form>
					<PrimaryButton type="button" onClick={() => calculateSports()}>
						Calculate
					</PrimaryButton>
				</div>

				<div className="flex">
					<pre>
						<code>{JSON.stringify(calculatedPrice, null, 2)}</code>
					</pre>
					<pre>
						<code>{JSON.stringify(data, null, 2)}</code>
					</pre>
				</div>
			</div>
			<Hero />
		</div>
	);
}
