'use client';
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

const colors = [
	'#FF6384',
	'#36A2EB',
	'#FFCE56',
	'#4BC0C0',
	'#FF9F40',
	'#9966FF',
	'#1E90FF',
	'#FF6384',
	'#8A2BE2',
	'#FFD700',
	'#32CD32',
	'#FF4500',
	'#00BFFF',
	'#FF69B4',
	'#008080',
	'#00876c',
	'#529d6d',
	'#85b271',
	'#b7c57b',
	'#e9d78b',
	'#e8b56a',
	'#e69155',
	'#e0694d',
	'#d43d51',
	'#8A2BE2',
	'#FFD700',
	'#32CD32',
	'#FF4500',
	'#00BFFF',
	'#FF69B4',
	'#008080',
	'#FF8C00',
	'#00CED1',
	'#FF1493',
	'#1E90FF',
	'#FF7F50',
	'#FF8C00',
	'#00CED1',
	'#FF1493',
	'#1E90FF',
	'#FF7F50',
];

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
	return <div className='button-group'>{props.children}</div>;
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
		<div className='poll-results-container'>
			<h3 className='poll-results-header'>
				<span className='gradient-text'>
					<span className='double-quotes inverted'>&quot;</span>
					{winner?.option ?? 'Option'},
				</span>
				<span>
					{' '}
					It is!
					<span className='double-quotes'>&quot;</span>
				</span>
			</h3>

			<p className='poll-question'>Let&apos;s see what others voted.</p>

			<ChartButtons
				activeChartIndex={activeChartIndex}
				setActiveChartIndex={setActiveChartIndex}
			/>

			{activeChartIndex === 0 ? (
				<Barchart data={data} />
			) : (
				<Piechart data={data} />
			)}
		</div>
	);
}

export default PollResultsContainer;
