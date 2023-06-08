'use client';

import { api } from '@/api';

import { Div, H1, P, Span } from '@/app/animations/MotionComponents';

import { PollVariant } from '@/app/animations/variants';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

const { container, item } = PollVariant;

//utils
const transformOptions = (options: string[] = []) =>
	options?.map((op, idx) => ({ value: op, isVisited: false, index: idx }));

type PollContainerProps = {
	pollDetails: {
		Poll_Question: string;
		Poll_Options: string[];
	};
	slug: string;
};

const PollContainer = ({ pollDetails, slug }: PollContainerProps) => {
	const [isPollOver, setIsPollOver] = useState<boolean>(false);


	
	
	
	return (
		<Div
			className='poll-container'
			variants={container}
			initial='hidden'
			animate='show'
		>
			<H1 className='poll-header' variants={item}>
				{isPollOver ? 'Wow!' : 'Alright!'}
				{isPollOver ? (
					<span>Amazing Choice.</span>
				) : (
					<span>Let&apos;s do this.</span>
				)}
			</H1>
			<P style={{display:isPollOver ? 'none' : 'block'}} variants={item} className='poll-question'>
				{pollDetails.Poll_Question}
			</P>

			<Div variants={item}>
				<Poll
					isPollOver={isPollOver}
					setIsPollOver={setIsPollOver}
					options={pollDetails?.Poll_Options}
					slug={slug}
				/>
			</Div>
			<Div variants={item} className='view-results-btn'>
				<Link prefetch={false} role='button' href={`/poll-results/${slug}`}>
					{' '}
					View Results{' '}
				</Link>
			</Div>
		</Div>
	);
};

type PollProps = {
	options: string[];
	isPollOver: boolean;
	setIsPollOver: React.Dispatch<React.SetStateAction<boolean>>;
	slug: string;
};

type TransformedOption = {
	value: string;
	isVisited: boolean;
	index: number;
};

function Poll({
	options: optionsProps,
	isPollOver,
	setIsPollOver,
	slug,
}: PollProps) {
	const [options, setOptions] = useState<TransformedOption[]>(
		transformOptions(optionsProps),
	);
	const optionsRemainingToShow = useMemo<TransformedOption[]>(
		() => options.filter((op) => !op.isVisited),
		[options],
	);
	const [optionsToShow, setOptionsToShow] = useState<TransformedOption[]>([
		options[0],
		options[options.length - 1],
	]);
	const [clickedIdx, setClickedIdx] = useState<number>(-1);

	const markAsVisited = useCallback((index: number) => {
		setOptions((op) =>
			op.map((option, idx) =>
				idx === index ? { ...option, isVisited: true } : option,
			),
		);
	}, []);

	const getRandomOption = useCallback(
		() =>
			optionsRemainingToShow[
				Math.floor(Math.random() * optionsRemainingToShow.length)
			],
		[optionsRemainingToShow],
	);

	const optionClickHandler = (
		option: TransformedOption,
		clickedIndex: number,
	) => {
		const visitedIndex = Number(!clickedIndex);
		setClickedIdx(clickedIndex);
		markAsVisited(option.index);
		markAsVisited(optionsToShow[visitedIndex].index);
	};

	useEffect(() => {
		if (clickedIdx !== -1) {
			const randomOption = getRandomOption();

			if (randomOption) {
				setOptionsToShow((prev) => {
					prev[Number(!clickedIdx)] = randomOption;
					return [...prev];
				});
			} else {
				const notifyError = () =>
					toast.error('Something went wrong. Please try again:(');
				api
					.updateVote({
						Poll_Slug: slug,
						Poll_Option: optionsToShow[clickedIdx]?.value ?? 'Random',
					})
					.then((res) => {
						api.withErrorHandleDo(
							res,
							() => {
								setOptionsToShow((prev) => [prev[clickedIdx]]);
								setIsPollOver(true);
							},
							notifyError,
						);
					})
					.catch(notifyError);
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [optionsRemainingToShow, clickedIdx, getRandomOption, setIsPollOver]);

	return (
		<Div className='poll-options-container' variants={container}>
			{!isPollOver ? (
				<>
					<PollCard
						onClick={() => optionClickHandler(optionsToShow[0], 0)}
						option={optionsToShow[0].value}
					/>
					<Span variants={item} className='or-text'>
						or
					</Span>
					<PollCard
						onClick={() => optionClickHandler(optionsToShow[1], 1)}
						option={optionsToShow[1].value}
					/>
				</>
			) : (
				<PollCard
					style={{fontSize:'1.4rem',marginInline:'25px'}}
					className='w-100'
					option={"You've selected " + optionsToShow[0]?.value }
				/>
			)}
		</Div>
	);
}

function PollCard({
	option,
	onClick,
	className,
	style
}: {
	option: string;
	onClick?: (...args: any) => void;
	className?: string;
	style?:React.CSSProperties
}) {
	return (
		<Span
			variants={item}
			role='button'
			tabIndex={-1}
			onClick={onClick}
			className={`poll-card ${className ?? ''}`}
			whileTap={{
				scale: 0.7,
			}}
			style={style}
		>
			{option}
		</Span>
	);
}

export default PollContainer;
