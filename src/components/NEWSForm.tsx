import { useState } from "react";

function NEWSform() {
	const [temp, setTemp] = useState("");
	const [heart, setHeart] = useState("");
	const [resp, setResp] = useState("");
	const [score, setScore] = useState("");

	function resetForm() {
		setTemp("");
		setHeart("");
		setResp("");
		setScore("");
	}

	function checkIfValuesAreInRange(temp: string, heart: string, resp: string) {
		const tempScore = parseFloat(temp.replace(",", "."));
		const heartScore = parseFloat(heart.replace(",", "."));
		const respScore = parseFloat(resp.replace(",", "."));
		let tempMessage = "";
		let heartMessage = "";
		let respMessage = "";
		if (tempScore < 31 || tempScore > 42) {
			tempMessage =
				"Temp is out of the valid range, please enter a value between 31 and 42";
		}
		if (heartScore < 25 || heartScore > 220) {
			heartMessage =
				"Heart rate is out of the valid range, please enter a value between 25 and 220";
		}
		if (respScore < 3 || respScore > 60) {
			respMessage =
				"Respiratory rate is out of the valid range, please enter a value between 3 and 60";
		}
		if (tempMessage || heartMessage || respMessage) {
			return tempMessage + " " + heartMessage + " " + respMessage;
		} else {
			return true;
		}
	}

	async function submitForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const check = checkIfValuesAreInRange(temp, heart, resp);
		if (check === true) {
			await fetch("http://localhost:3000/NEWSscore", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					measurements: [
						{
							type: "TEMP",
							value: temp,
						},
						{
							type: "HR",
							value: heart,
						},
						{
							type: "RR",
							value: resp,
						},
					],
				}),
			})
				.then((response) => response.json())
				.then((data) => {
					setScore(data.score);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} else {
			alert(check);
		}
	}
	return (
		<>
			<form
				onSubmit={submitForm}
				id="NEWSForm"
				className="flex flex-col gap-y-3 w-[404px]">
				<div className="flex flex-col">
					<p className="font-bold text-base mb-2">Body temperature</p>
					<label
						className="text-sm"
						htmlFor="temp">
						Degrees celcius
					</label>
					<input
						className="py-[10px] pl-6 pr-3 border border-[#7424DA] border-opacity-5 bg-[#FAF6FF]"
						type="text"
						id="temp"
						name="temp"
						value={temp}
						onChange={(e) => setTemp(e.target.value)}
						required></input>
				</div>
				<div className="flex flex-col">
					<p className="font-bold text-base mb-2">Heart rate</p>
					<label
						className="text-sm"
						htmlFor="heart">
						Beats per minute
					</label>
					<input
						className="py-[10px] pl-6 pr-3 border border-[#7424DA] border-opacity-5 bg-[#FAF6FF]"
						type="text"
						id="heart"
						name="heart"
						value={heart}
						onChange={(e) => setHeart(e.target.value)}
						required></input>
				</div>
				<div className="flex flex-col">
					<p className="font-bold text-base mb-2">Respiratory Rate</p>
					<label
						className="text-sm"
						htmlFor="resp">
						Breaths per minute
					</label>
					<input
						className="py-[10px] pl-6 pr-3 border border-[#7424DA] border-opacity-5 bg-[#FAF6FF]"
						type="text"
						id="resp"
						name="resp"
						value={resp}
						onChange={(e) => setResp(e.target.value)}
						required></input>
				</div>
			</form>

			<div className="flex gap-x-6 mt-10">
				<button
					className="bg-[#7424DA] text-white font-bold py-2 px-4 rounded-full"
					type="submit"
					form="NEWSForm">
					Calculate NEWS Score
				</button>
				<button
					className="bg-[#FAF6FF] py-2 px-4 rounded-full"
					onClick={resetForm}>
					Reset
				</button>
			</div>

			{score && (
				<div className="mt-10 flex w-[404px]">
					<div className="border-1 w-full flex border-[#7424DA] border-opacity-40 bg-[#FAF6FF] rounded-lg p-4">
						<p className="mr-2">News score:</p>
						<p className="font-bold">{score}</p>
					</div>
				</div>
			)}
		</>
	);
}

export default NEWSform;
