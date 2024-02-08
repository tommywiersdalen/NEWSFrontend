interface FormInputProps {
	label: string;
	sublabel?: string;
	name: string;
	type: string;
	value: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FormInput(props: FormInputProps) {
	return (
		<div className="flex flex-col">
			<p className="font-bold text-base mb-2">{props.label}</p>
			<label
				className="text-sm"
				htmlFor={props.name}>
				{props.sublabel}
			</label>
			<input
				className="py-[10px] pl-6 pr-3 border border-[#7424DA] border-opacity-5 bg-[#FAF6FF]"
				type={props.type}
				id={props.name}
				name={props.name}
				value={props.value}
				onChange={props.onChange}
				required></input>
		</div>
	);
}
