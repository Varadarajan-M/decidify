'use client';
import { api } from '@/api';
import '@/styles/components/poll-form.scss';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { RegisterOptions, UseFormRegister, useForm } from 'react-hook-form';
import { AiOutlineClose } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { formConfig } from './form-config';
import { AnimatePresence, motion } from 'framer-motion';
import { FormVariant } from '@/app/animations/variants';

const { container, item } = FormVariant;

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
	<motion.div variants={item} className='form-group'>
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
	</motion.div>
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

	const [loading, setLoading] = useState<boolean>(false);

	const router = useRouter();

	const {
		register,
		formState: { errors, isSubmitting },
		watch,
		handleSubmit,
		setFocus,
		resetField,
	} = useForm<FormData>({
		mode: 'onTouched',
	});

	const onSubmit = async (data: FormData) => {
		setLoading(true);

		const pollData = {
			Poll_Question: data.Poll_Question,
			Poll_Options: pollOptionPills,
			Poll_Owner: data.Poll_Owner || 'Anonymous',
		};
		const res = api.createPoll(pollData);

		// notify while calling api
		const id = await toast.promise(res, {
			pending: `Creating poll for ${data.Poll_Question}...`,
		});
		api.withErrorHandleDo(
			await res,
			({ message, data }: any) => {
				// to dismiss the prev notif if api call is success
				toast.dismiss(id);

				toast.info(message ?? 'Poll created successfully!', {
					autoClose: 1000,
				});

				router.push(`/new-poll/${data?.slug}`);
			},
			(res: any) => {
				// to dismiss the prev notif if error occurs
				toast.dismiss(id);
				toast.error(res?.message ?? 'Something went wrong:(');
			},
		);
		setLoading(false);
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
		<motion.form
			variants={container}
			initial='hidden'
			animate='visible'
			className='new-poll-form'
			onSubmit={handleSubmit(onSubmit)}
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

			<motion.div variants={item} className='form-group'>
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
					<motion.button
						variants={item}
						whileTap={{ scale: 0.9 }}
						type='button'
						onClick={addOptionHandler}
						className={`btn-round ${showPollOptionError ? 'error' : ''}`}
					>
						Add
					</motion.button>
				</div>
				<ErrorMessage
					message={
						showPollOptionError
							? 'Minimum 2 Poll Options should be provided'
							: ''
					}
				/>
				{pollOptionPills.length > 0 ? (
					<motion.div
						variants={container}
						initial={'hidden'}
						animate={'visible'}
						className='form-control-pills-container'
					>
						<AnimatePresence>
							{pollOptionPills.map((pill, idx) => (
								<motion.span
									variants={item}
									key={pill}
									exit={{ opacity: 0, transition: { duration: 0.2 } }}
									className='form-control-pill'
								>
									{pill}
									<AiOutlineClose
										onClick={() => removeOptionHandler(idx)}
										className='close-icon'
									/>
								</motion.span>
							))}
						</AnimatePresence>
					</motion.div>
				) : (
					''
				)}
			</motion.div>
			<FormGroup
				htmlFor={Poll_Owner.id}
				label={Poll_Owner.label}
				register={register}
				id={'Poll_Owner'}
				placeholder={Poll_Owner.placeholder}
			/>

			<motion.button
				whileTap={{ scale: 0.9 }}
				variants={item}
				disabled={isPollQuestionInvalid || isPollOptionInvalid}
				className='submit-btn gradient-btn'
			>
				{loading ? 'Creating Poll...' : 'Create'}
			</motion.button>
		</motion.form>
	);
};

export default PollForm;
