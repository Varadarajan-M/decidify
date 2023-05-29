'use client';

import Link from 'next/link';
import { useCallback, useEffect, useMemo, useState } from 'react';

//utils
const transformOptions = (options: string[]) =>
	options.map((op, idx) => ({ value: op, isVisited: false, index: idx }));

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
		<div className='poll-container'>
			<h2 className='poll-header'>
				{isPollOver ? 'Wow!' : 'Alright!'}
				{isPollOver ? (
					<span>Amazing Choice.</span>
				) : (
					<span>Let&apos;s do this.</span>
				)}
			</h2>
			<h3 className='poll-question'>{pollDetails.Poll_Question}</h3>

			<Poll
				isPollOver={isPollOver}
				setIsPollOver={setIsPollOver}
				options={pollDetails.Poll_Options}
			/>

			<Link
				role='button'
				className='view-results-btn'
				href={`/poll-results/${slug}`}
			>
				{' '}
				View Results{' '}
			</Link>
		</div>
	);
};

type PollProps = {
	options: string[];
	isPollOver: boolean;
	setIsPollOver: React.Dispatch<React.SetStateAction<boolean>>;
};

type TransformedOption = {
	value: string;
	isVisited: boolean;
	index: number;
};

function Poll({ options: optionsProps, isPollOver, setIsPollOver }: PollProps) {
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
					let tmp = [...prev];
					tmp[Number(!clickedIdx)] = randomOption;
					return tmp;
				});
			} else {
				setIsPollOver(true);
				setOptionsToShow((prev) => [prev[clickedIdx]]);
			}
		}
	}, [optionsRemainingToShow, clickedIdx, getRandomOption, setIsPollOver]);

	return (
		<div className='poll-options-container'>
			{!isPollOver ? (
				<>
					<PollCard
						onClick={() => optionClickHandler(optionsToShow[0], 0)}
						option={optionsToShow[0].value}
					/>
					<span className='or-text'>or</span>
					<PollCard
						onClick={() => optionClickHandler(optionsToShow[1], 1)}
						option={optionsToShow[1].value}
					/>
				</>
			) : (
				<PollCard
					className='w-100'
					option={optionsToShow[0].value + ' It is!'}
				/>
			)}
		</div>
	);
}

function PollCard({
	option,
	onClick,
	className,
}: {
	option: string;
	onClick?: (...args: any) => void;
	className?: string;
}) {
	return (
		<div
			tabIndex={-1}
			onClick={onClick}
			className={`poll-card ${className ?? ''}`}
		>
			<p>{option}</p>
		</div>
	);
}

export default PollContainer;
