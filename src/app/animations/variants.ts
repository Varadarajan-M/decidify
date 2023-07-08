export const HomeVariant = {
	container: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.4,
			},
		},
	},
	item: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 1,
			},
		},
	},
};

export const FormVariant = {
	container: {
		hidden: {
			opacity: 0,
		},
		visible: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
			},
		},
	},
	item: {
		hidden: {
			opacity: 0,
			x: -20,
		},
		visible: {
			opacity: 1,
			x: 0,
		},
	},
};

export const PollVariant = {
	container: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.4,
				type: 'spring',
			},
		},
	},
	item: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.5,
			},
		},
	},
};
export const NewPollVariant = {
	container: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.2,
				type: 'spring',
			},
		},
	},
	item: {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				duration: 0.3,
			},
		},
	},
};
