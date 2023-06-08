'use client';

import { api } from '@/api';
import ErrorPage from '@/app/components/ErrorPage';
import '@/styles/pages/poll-results.scss';
import PollResultsContainer from './PollResultsContainer';
import { useState, useEffect } from 'react';
import { LoaderContainer } from '@/app/components/Loader';

type PageProps = {
	params: {
		slug: string;
	};
};

const PollResultsPage = ({ params }: PageProps) => {
	const { slug } = params;

	const [pollRes, setPollRes] = useState<any>({});
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState({
		message: '',
		status: false,
	});

	useEffect(() => {
		async function fetchPollRes() {
			setLoading(true);
			const res = await api.getPollResults(slug);
			api.withErrorHandleDo(
				res,
				(res: any) => {
					console.log(res);
					setLoading(false);
					setPollRes({
						Poll_Question: res.data.Poll_Details?.Poll_Question ?? '',
						Poll_Results: res.data.Poll_Details?.Poll_Options ?? {},
					});
				},
				(res: any) => {
					setLoading(false);
					setError({
						message: res?.message ?? 'Something went wrong.',
						status: true,
					});
				},
			);
		}
		fetchPollRes();
	}, [slug]);

	if (loading) {
		return <LoaderContainer />;
	}

	if (error.status) {
		return <ErrorPage error={error?.message} />;
	}

	if (!loading && !error.status && Object.keys(pollRes).length) {
		return (
			<section className='container'>
				<PollResultsContainer pollResults={pollRes} />
			</section>
		);
	}
};

export default PollResultsPage;
