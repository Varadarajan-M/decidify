type ValidationRules = 'required' | 'minLength' | 'maxLength';

const getFormValidations = (fieldName: string, ...rules: ValidationRules[]) => {
	const _validations = {
		required: {
			value: true,
			message: 'This Field is required.',
		},
		minLength: {
			value: 3,
			message: `${fieldName} needs to be at least 3 characters long`,
		},
		maxLength: {
			value: 50,
			message: `${fieldName} can't be more than 50 characters long`,
		},
	};
	return rules.reduce(
		(res, rule) => ({ ...res, [rule]: _validations[rule] }),
		{},
	);
};
export const formConfig = {
	Poll_Question: {
		id: 'Poll_Question',
		type: 'text',
		placeholder: 'Eg: What to eat🍴',
		label: 'Name it something',
		validations: getFormValidations(
			'Poll Question',
			'required',
			'minLength',
			'maxLength',
		),
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
