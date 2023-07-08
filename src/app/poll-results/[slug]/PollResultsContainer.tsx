'use client';
import { H1, P, Span, Div } from '@/app/animations/MotionComponents';
import { HomeVariant as PollResultVariant } from '@/app/animations/variants';
import dynamic from 'next/dynamic';
import React, { useMemo, useState } from 'react';
import { FcBarChart, FcDoughnutChart } from 'react-icons/fc';
import {
	Bar,
	CartesianGrid,
	Cell,
	Legend,
	Pie,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts';
import { colors } from './constants';

const { container, item } = PollResultVariant;

const BarChart = dynamic(
	() => import('recharts').then((recharts) => recharts.BarChart),
	{ ssr: false },
);

const PieChart = dynamic(
	() => import('recharts').then((recharts) => recharts.PieChart),
	{ ssr: false },
);

interface PollResultsContainerProps {
	pollResults: {
		Poll_Question: string;
		Poll_Results: Record<string, number>;
	};
}

type PollResult = {
	option: string;
	votes: number;
};

const formatPollResults = (
	Poll_Results: Record<string, number>,
): PollResult[] =>
	Object.entries(Poll_Results ?? {}).map(([option, value]) => ({
		option,
		votes: value,
	}));

interface ChartProps<T> {
	data: T[];
}

const Barchart = React.memo(<T,>({ data }: ChartProps<T>) => (
	<ResponsiveContainer
		minWidth={'300px'}
		minHeight={'300px'}
		width={'100%'}
		height={'50%'}
		className='recharts-responsive-container'
	>
		<BarChart width={730} height={250} data={data}>
			<CartesianGrid opacity={0.3} stroke='#8a8a8a' strokeDasharray='3 3' />
			<XAxis
				type='category'
				dataKey='option'
				interval='preserveStartEnd'
				label={{
					value: 'Options',
					position: 'topBottom',
					fill: 'gray',
				}}
				height={100}
				style={{
					fontWeight: 100,
					fontFamily: 'monospace',
				}}
				stroke='gray'
				tick={{ stroke: '#b3e5fc', fill: '#b3e5fc' }}
			/>
			<YAxis
				type='number'
				stroke='gray'
				tick={{ stroke: '#b3e5fc', fill: '#b3e5fc' }}
				interval={'preserveStartEnd'}
				dataKey='votes'
				label={{
					value: 'Votes',
					angle: -90,
					position: 'insideLeft',
					fill: 'gray',
				}}
				tickCount={6}
				allowDecimals={false}
			/>
			<Bar
				animationBegin={0}
				animationDuration={300}
				animationEasing='ease-in'
				dataKey='votes'
				barSize={50}
				minPointSize={0.5}
			>
				{data.map((option, index) => (
					<Cell
						key={`cell-${index}`}
						stroke={colors[Math.abs(data.length - index)]}
						fill={colors[Math.abs(data.length - index)]}
					/>
				))}
			</Bar>
			<Tooltip
				animationEasing={'linear'}
				animationDuration={200}
				cursor={{ fill: 'transparent' }}
				wrapperClassName='chart-tooltip'
				contentStyle={{
					color: 'white',
					fontWeight: 800,
				}}
				itemStyle={{
					color: 'white',
					fontFamily: 'monospace',
					fontWeight: 100,
				}}
				isAnimationActive
			/>
		</BarChart>
	</ResponsiveContainer>
));
Barchart.displayName = 'BarChart';

const Piechart = React.memo(<T,>({ data }: ChartProps<T>) => (
	<>
		<ResponsiveContainer
			minWidth={'300px'}
			minHeight={'300px'}
			width={'100%'}
			height={'50%'}
			className='recharts-responsive-container pie'
		>
			<PieChart>
				<Pie
					data={data}
					dataKey='votes'
					nameKey='option'
					cx='50%'
					cy='50%'
					innerRadius={60}
					outerRadius={100}
					fill='#82ca9d'
					label
					labelLine={false}
					animationBegin={0}
					animationDuration={1000}
					animationEasing={'ease-in-out'}
					legendType={'circle'}
					startAngle={360}
					endAngle={0}
					strokeWidth={0.5}
					style={{ pointerEvents: 'none' }}
				>
					{data.map((entry, index) => (
						<Cell
							style={{ outline: 'none' }}
							key={`cell-${index}`}
							fill={colors[index]}
						/>
					))}
				</Pie>
				<Legend verticalAlign='bottom' align='center' />
			</PieChart>
		</ResponsiveContainer>
	</>
));

Piechart.displayName = 'PieChart';

type ButtonGroupProps = {
	children: React.ReactNode;
};
const ButtonGroup = (props: ButtonGroupProps) => {
	return (
		<Div variants={item} className='button-group'>
			{props.children}
		</Div>
	);
};

type ChartButtonsProps = {
	activeChartIndex: number;
	setActiveChartIndex: React.Dispatch<React.SetStateAction<number>>;
};

const ChartButtons = React.memo(
	({ activeChartIndex, setActiveChartIndex }: ChartButtonsProps) => {
		const [hoverIndex, setHoverIndex] = useState<number>(0);
		const resetHover = () => setHoverIndex(-1);
		const buttons = [
			{ button: FcBarChart, tooltip: 'View Bar Chart' },
			{ button: FcDoughnutChart, tooltip: 'View Doughnut Chart' },
		];

		return (
			<ButtonGroup>
				{buttons.map(({ button: Button, tooltip }, idx) => (
					<div
						key={idx}
						className='button-container'
						onMouseEnter={() => setHoverIndex(idx)}
						onMouseLeave={resetHover}
					>
						<Button
							className={`button ${activeChartIndex === idx ? 'active' : ''}`}
							onClick={() => setActiveChartIndex(idx)}
						/>
						{hoverIndex === idx && activeChartIndex !== idx ? (
							<span className='button-tooltip'>{tooltip}</span>
						) : (
							''
						)}
					</div>
				))}
			</ButtonGroup>
		);
	},
);

function PollResultsContainer({ pollResults }: PollResultsContainerProps) {
	const [activeChartIndex, setActiveChartIndex] = useState<number>(0);

	const data: PollResult[] = useMemo(
		() => formatPollResults(pollResults.Poll_Results),
		[pollResults.Poll_Results],
	);

	const winner = useMemo(
		() =>
			data.length > 0
				? data.sort((a, b) => b['votes'] - a['votes'])[0]
				: ({} as PollResult),
		[data],
	);

	return (
		<Div
			variants={container}
			initial='hidden'
			animate='show'
			className='poll-results-container'
		>
			<H1 variants={item} className='poll-results-header'>
				<Span className='gradient-text'>
					<span className='double-quotes inverted'>&quot;</span>
					{winner?.option ?? 'Option'},
				</Span>
				<Span>
					{' '}
					It is!
					<Span className='double-quotes'>&quot;</Span>
				</Span>
			</H1>

			<P variants={item} className='poll-question'>
				Let&apos;s see what others voted.
			</P>

			<ChartButtons
				activeChartIndex={activeChartIndex}
				setActiveChartIndex={setActiveChartIndex}
			/>

			<Div>
				{activeChartIndex === 0 ? (
					<Barchart data={data} />
				) : (
					<Piechart data={data} />
				)}
			</Div>
		</Div>
	);
}

export default PollResultsContainer;
