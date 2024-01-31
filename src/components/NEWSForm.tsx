import { useState } from "react";

function NEWSform() {
	const [temp, setTemp] = useState("");
	const [heart, setHeart] = useState("");
	const [resp, setResp] = useState("");

	function resetForm() {
		setTemp("");
		setHeart("");
		setResp("");
	}

	function checkIfValuesAreInRange(temp: string, heart: string, resp: string) {
		const tempScore = parseInt(temp);
		const heartScore = parseInt(heart);
		const respScore = parseInt(resp);
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

	function submitForm(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const check = checkIfValuesAreInRange(temp, heart, resp);
		if (check === true) {
			alert(`Score submitted`);
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
		</>
	);
}

export default NEWSform;
