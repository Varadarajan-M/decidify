const FORM_VALIDATIONS = {
	required: {
		value: true,
		message: 'This Field is required.',
	},
	minLength: {
		value: 3,
		message: `Needs to be atleast 3 characters long`,
	},
	maxLength: {
		value: 50,
		message: `Cannot be more than 50 characters long`,
	},
};

export const formConfig = {
	Poll_Question: {
		id: 'Poll_Question',
		type: 'text',
		placeholder: 'Eg: What to eat🍴',
		label: 'Name it something',
		validations: {
			...FORM_VALIDATIONS,
			validate: (value: string) => {
				const regex = new RegExp(
					'([&$\\+,:;=\\?@#<>\\[\\]\\{\\}[\\/]|\\\\\\^%])+',
					'gm',
				);
				return regex.test(value)
					? 'Cannot have URL un-friendly characters.'
					: true;
			},
		},
	},
	Poll_Options: {
		id: 'Poll_Options',
		type: 'text',
		placeholder: 'Pizza🍕😋',
		label: 'Give us the choices',
	},
	Poll_Owner: {
		id: 'Poll_Owner',
		type: 'text',
		placeholder: 'Anonymous🧑🏻‍💻',
		label: "Who's creating?",
	},
};
