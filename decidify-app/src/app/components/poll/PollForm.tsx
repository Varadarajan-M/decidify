'use client';
import '@/styles/components/poll-form.scss';
import { useCallback, useMemo, useState } from 'react';
import { RegisterOptions, UseFormRegister, useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
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
	registerOptions?: RegisterOptions;
	placeholder: string;
	hasError?: boolean;
};

const FormGroup = ({
	htmlFor,
	label,
	register,
	id,
	placeholder,
	registerOptions = {},
	hasError = false,
}: FormGroupProps) => (
	<div className='form-group'>
		<label htmlFor={htmlFor} className='form-label'>
			{label}
		</label>
		<input
			{...register(id, registerOptions)}
			id={id}
			placeholder={placeholder}
			className={`form-control ${hasError ? 'error' : ''}`}
		/>
	</div>
);

const PollForm = () => {
	const { Poll_Question, Poll_Options, Poll_Owner } = formConfig;
	const [pollOptionPills, setPollOptionPills] = useState<string[]>([]);
	const [isPollOptionBlurred, setIsPollOptionBlurred] =
		useState<boolean>(false);

	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
		setFocus,
		setValue,
	} = useForm<FormData>({
		mode: 'onTouched',
	});

	const onSubmit = (data: FormData) => {
		const pollData = {
			Poll_Question: data.Poll_Question,
			Poll_Options: pollOptionPills,
			Poll_Owner: data.Poll_Owner || 'Anonymous',
		};
		console.log(pollData);
	};

	const addOptionHandler = useCallback(() => {
		const pollOptions = watch('Poll_Options');
		if (pollOptions) {
			setPollOptionPills((prev) => [...new Set([pollOptions, ...prev])]);
			setValue('Poll_Options', '');
			setFocus('Poll_Options');
		}
	}, [setFocus, setValue, watch]);

	const removeOptionHandler = useCallback((idx: number) => {
		setPollOptionPills((prev) => prev.filter((_, i) => i !== idx));
	}, []);

	const isPollQuestionInvalid = useMemo(
		() => (errors.Poll_Question ? true : false),
		[errors.Poll_Question],
	);

	const isPollOptionInvalid = useMemo(
		() => pollOptionPills.length < 2 && isPollOptionBlurred,
		[pollOptionPills.length, isPollOptionBlurred],
	);

	return (
		<form
			className='new-poll-form'
			onSubmit={handleSubmit(onSubmit, console.log)}
		>
			<FormGroup
				htmlFor={Poll_Question.id}
				label={Poll_Question.label}
				register={register}
				id={'Poll_Question'}
				registerOptions={Poll_Question.validations}
				placeholder={Poll_Question.placeholder}
				hasError={isPollQuestionInvalid}
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
						className={`form-control ${isPollOptionInvalid ? 'error' : ''}`}
						onBlur={() => setIsPollOptionBlurred(true)}
						onFocus={() => setIsPollOptionBlurred(false)}
					/>
					<button
						type='button'
						onClick={addOptionHandler}
						className={`btn-round ${isPollOptionInvalid ? 'error' : ''}`}
					>
						Add
					</button>
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

			<button
				disabled={isPollQuestionInvalid || isPollOptionInvalid}
				className='submit-btn gradient-btn'
			>
				Create
			</button>
		</form>
	);
};

export default PollForm;
