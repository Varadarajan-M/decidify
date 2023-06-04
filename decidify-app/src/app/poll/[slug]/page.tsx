import { api } from '@/api';
import ErrorPage from '@/app/components/ErrorPage';
import '@/styles/pages/poll.scss';
import PollContainer from './PollContainer';
type PageProps = {
	params: {
		slug: string;
	};
};

const PollPage = async ({ params }: PageProps) => {
	const { slug } = params;
	const res = await api.getPollOptions(slug);

	console.log('Res', res);

	if (api.isError(res)) {
		return <ErrorPage error={res?.message} />;
	}

	return (
		<section className='container'>
			<PollContainer slug={slug} pollDetails={res?.data?.Poll_Details} />
		</section>
	);
};

export default PollPage;
