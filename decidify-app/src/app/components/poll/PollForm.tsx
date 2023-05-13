'use client';
import '@/styles/components/poll-form.scss';
import { useState } from 'react';
import { UseFormRegister, useForm } from 'react-hook-form';
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai';
import { formConfig } from './form-config';
type FormData = {
	Poll_Question: string;
	Poll_Options: string;
	Poll_Owner: string;
};

type FormGroupProps = {
	htmlFor: string;
	label: string;
	register: UseFormRegister<FormData>;
	id: keyof FormData;
	placeholder: string;
};

const FormGroup = ({
	htmlFor,
	label,
	register,
	id,
	placeholder,
}: FormGroupProps) => (
	<div className='form-group'>
		<label htmlFor={htmlFor} className='form-label'>
			{label}
		</label>
		<input
			{...register(id)}
			id={id}
			placeholder={placeholder}
			className='form-control'
		/>
	</div>
);

const PollForm = () => {
	const { Poll_Question, Poll_Options, Poll_Owner } = formConfig;
	const [pollOptionPills, setPollOptionPills] = useState<string[]>([]);

	const {
		register,
		formState: { errors },
		watch,
	} = useForm<FormData>({
		mode: 'onChange',
	});

	const pollOptions = watch('Poll_Options');

	const addOptionHandler = () => {
		if (pollOptions) {
			setPollOptionPills((prev) => [...new Set([pollOptions, ...prev])]);
		}
	};

	const removeOptionHandler = (idx: number) => {
		setPollOptionPills((prev) => prev.filter((_, i) => i !== idx));
	};

	return (
		<form className='new-poll-form'>
			<FormGroup
				htmlFor={Poll_Question.id}
				label={Poll_Question.label}
				register={register}
				id={'Poll_Question'}
				placeholder={Poll_Question.placeholder}
			/>

			<div className='form-group'>
				<label htmlFor={Poll_Options.id} className='form-label'>
					{Poll_Options.label}
				</label>
				<div className='form-group-input-btn'>
					<input
						{...register('Poll_Options')}
						id={Poll_Options.id}
						placeholder={Poll_Options.placeholder}
						className='form-control'
					/>
					<AiOutlinePlus onClick={addOptionHandler} className='btn-round' />
				</div>
				{pollOptionPills.length > 0 ? (
					<div className='form-control-pills-container'>
						{pollOptionPills.map((pill, idx) => (
							<span key={pill} className='form-control-pill'>
								{pill}
								<AiOutlineClose
									onClick={() => removeOptionHandler(idx)}
									className='close-icon'
								/>
							</span>
						))}
					</div>
				) : (
					''
				)}
			</div>
			<FormGroup
				htmlFor={Poll_Owner.id}
				label={Poll_Owner.label}
				register={register}
				id={'Poll_Owner'}
				placeholder={Poll_Owner.placeholder}
			/>

			<button className='submit-btn gradient-btn'>Create</button>
		</form>
	);
};

export default PollForm;
