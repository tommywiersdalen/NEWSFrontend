import NEWSform from "./components/NEWSForm";

function App() {
	return (
		<>
			<div className="flex flex-col items-start m-auto w-[404px]">
				<div>
					<h1 className="font-bold text-3xl">NEWS score calculator</h1>
				</div>
				<div className="mt-10">
					<NEWSform />
				</div>
			</div>
		</>
	);
}

export default App;
