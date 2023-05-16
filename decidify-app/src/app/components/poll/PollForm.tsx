'use client';
import '@/styles/components/poll-form.scss';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
	error?: string;
};

const FormGroup = ({
	htmlFor,
	label,
	register,
	id,
	placeholder,
	registerOptions = {},
	hasError = false,
	error = '',
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

		{hasError && <ErrorMessage message={error} />}
	</div>
);

const ErrorMessage = ({ message }: { message: string }) => (
	<span className='error-message'>{message}</span>
);

const PollForm = () => {
	const { Poll_Question, Poll_Options, Poll_Owner } = formConfig;
	const [pollOptionPills, setPollOptionPills] = useState<string[]>([]);
	const [isPollOptionBlurred, setIsPollOptionBlurred] =
		useState<boolean>(false);
	let pollOptionValidationTimer = useRef<NodeJS.Timeout | null>(null);
	const [showPollOptionError, setShowPollOptionError] =
		useState<boolean>(false);

	const {
		register,
		formState: { errors },
		watch,
		handleSubmit,
		setFocus,
		resetField,
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
			setFocus('Poll_Options');
			setPollOptionPills((prev) => [...new Set([pollOptions, ...prev])]);
			resetField('Poll_Options');
		}
	}, [setFocus, resetField, watch]);

	const removeOptionHandler = useCallback((idx: number) => {
		setPollOptionPills((prev) => prev.filter((_, i) => i !== idx));
	}, []);

	const isPollQuestionInvalid = useMemo(
		() => (errors.Poll_Question ? true : false),
		[errors.Poll_Question],
	);

	const isPollOptionInvalid = useMemo(
		() => isPollOptionBlurred && pollOptionPills.length < 2,
		[isPollOptionBlurred, pollOptionPills.length],
	);

	useEffect(() => {
		pollOptionValidationTimer.current = setTimeout(() => {
			setShowPollOptionError(isPollOptionInvalid);
		}, 500);

		return () => {
			if (pollOptionValidationTimer.current) {
				clearTimeout(pollOptionValidationTimer.current);
			}
		};
	}, [isPollOptionInvalid]);

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
				error={errors.Poll_Question?.message}
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
						className={`form-control ${showPollOptionError ? 'error' : ''}`}
						onBlur={() => setIsPollOptionBlurred(true)}
						onFocus={() => setIsPollOptionBlurred(false)}
					/>
					<button
						type='button'
						onClick={addOptionHandler}
						className={`btn-round ${showPollOptionError ? 'error' : ''}`}
					>
						Add
					</button>
				</div>
				<ErrorMessage
					message={
						showPollOptionError
							? 'Minimum 2 Poll Options should be provided'
							: ''
					}
				/>
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
