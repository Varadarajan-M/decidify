import '@/styles/pages/poll-results.scss';
import PollResultsContainer from './PollResultsContainer';
type PageProps = {
	params: {
		slug: string;
	};
};

const fakeApi = async () => {
	return new Promise<any>((resolve) =>
		resolve({
			Poll_Question: 'What to eat today?',
			Poll_Results: {
				Pizza: 10,
				Burger: 25,
				Taco: 14,
				Sushi: 6,
				Pasta: 20,
				Steak: 8,
				Salad: 12,
				'Ice Cream': 18,
				Sandwich: 22,
				'Chicken Wings': 16,
			},
		}),
	);
};

const PollResultsPage = async ({ params }: PageProps) => {
	const { slug } = params;

	const results = await fakeApi();

	return (
		<section className='container'>
			<PollResultsContainer pollResults={results} />
		</section>
	);
};

export default PollResultsPage;
