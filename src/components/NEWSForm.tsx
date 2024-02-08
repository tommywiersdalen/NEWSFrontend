import { useState } from "react";
import { FormInput } from "./FormInput";
import { checkIfValuesAreInRange } from "../utilities";

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
				<FormInput
					label="Body temperature"
					name="temp"
					sublabel="Degrees celcius"
					type="text"
					value={temp}
					onChange={(e) => setTemp(e.target.value)}
				/>
				<FormInput
					label="Heart rate"
					name="heart"
					sublabel="Beats per minute"
					type="text"
					value={heart}
					onChange={(e) => setHeart(e.target.value)}
				/>
				<FormInput
					label="Respiratory Rate"
					name="resp"
					sublabel="Breaths per minute"
					type="text"
					value={resp}
					onChange={(e) => setResp(e.target.value)}
				/>
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
