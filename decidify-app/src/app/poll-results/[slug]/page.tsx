import { api } from '@/api';
import ErrorPage from '@/app/components/ErrorPage';
import '@/styles/pages/poll-results.scss';
import PollResultsContainer from './PollResultsContainer';
type PageProps = {
	params: {
		slug: string;
	};
};

const PollResultsPage = async ({ params }: PageProps) => {
	const { slug } = params;

	const res = await api.getPollResults(slug);

	console.log('Res', res);

	if (api.isError(res)) {
		return <ErrorPage error={res?.message} />;
	}

	const pollResults = {
		Poll_Question: res.data.Poll_Details?.Poll_Question ?? '',
		Poll_Results: res.data.Poll_Details?.Poll_Options ?? {},
	};

	return (
		<section className='container'>
			<PollResultsContainer pollResults={pollResults} />
		</section>
	);
};

export default PollResultsPage;
