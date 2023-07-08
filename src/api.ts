const apiConfig = {
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
	headers: {
		'content-type': 'application/json',
	},
} as const;

const URLs = {
	CREATE_POLL: apiConfig.baseURL + '/CreatePoll',
	UPDATE_VOTES: apiConfig.baseURL + '/UpdateVote',
	GET_POLL_OPTIONS: apiConfig.baseURL + '/GetPollOptions',
	GET_POLL_DETAILS: apiConfig.baseURL + '/GetPollDetails',
} as const;

const isError = (res: any) => !res?.ok ?? true;

const logError = (error: unknown) => {
	console.log(error);
	if (error instanceof Error) console.error(`Error occured: ${error.message}`);
	else console.error(`Error: ${error}`);
	return error;
};

type Poll = {
	Poll_Question: string;
	Poll_Options: string[];
	Poll_Owner: string;
};

const createPoll = async (data: Poll) => {
	try {
		const res = await fetch(URLs.CREATE_POLL, {
			method: 'POST',
			headers: apiConfig.headers,
			body: JSON.stringify(data),
		});
		return res.json();
	} catch (error: unknown) {
		logError(error);
	}
};

type UpdateVoteRequest = {
	Poll_Slug: string;
	Poll_Option: string;
};

const updateVote = async (data: UpdateVoteRequest) => {
	try {
		const res = await fetch(URLs.UPDATE_VOTES, {
			method: 'PUT',
			headers: apiConfig.headers,
			body: JSON.stringify(data),
		});
		return res.json();
	} catch (error: unknown) {
		logError(error);
	}
};

const getPollOptions = async (slug: string) => {
	try {
		const res = await fetch(`${URLs.GET_POLL_OPTIONS}?slug=${slug}`, {
			next: { revalidate: 2 },
		});
		return res.json();
	} catch (error: unknown) {
		logError(error);
	}
};

const getPollResults = async (slug: string) => {
	try {
		const res = await fetch(`${URLs.GET_POLL_DETAILS}?slug=${slug}`, {
			headers: {
				'Cache-Control':
					'private, no-cache, no-store, max-age=0, must-revalidate',
			},
		});

		return res.json();
	} catch (error: unknown) {
		logError(error);
	}
};

const defaultErrorHandler = (res: any) =>
	console.error(`Error: ${res?.message ?? 'Something went wrong'}`);

/**
 This function checks for errors in api responses and executes onSuccess and onError callbacks
 * @param res - API Response with ok set to boolean
 * @param cb - On Success callback which gives api response to process.
 * @param errCb - On Error callback which gives api response to process.
 */

const withErrorHandleDo = (
	res: unknown,
	cb: Function,
	errCb: Function = defaultErrorHandler,
) => {
	if (isError(res)) {
		errCb(res);
	} else {
		cb(res);
	}
};

export const api = {
	createPoll,
	updateVote,
	getPollOptions,
	getPollResults,
	isError,
	withErrorHandleDo,
} as const;
