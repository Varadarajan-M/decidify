import '@/styles/pages/poll.scss';
import { Suspense } from 'react';
import PollContainer from './PollContainer';
type PageProps = {
	params: {
		slug: string;
	};
};

const fakeApi = async () => {
	return new Promise<any>((resolve) =>
		resolve({
			Poll_Question: 'What to eat today?',
			Poll_Options: [
				'Pizza',
				'Burger',
				'Nachos',
				'Sizzlers',
				'Briyani',
				'Tacos',
			],
		}),
	);
};

const PollPage = async ({ params }: PageProps) => {
	const { slug } = params;
	const pollDetails = await fakeApi();
	return (
		<section className='container'>
			<Suspense fallback={<h1>Page loading..</h1>}>
				<PollContainer slug={slug} pollDetails={pollDetails} />
			</Suspense>
		</section>
	);
};

export default PollPage;
