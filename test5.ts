
export const getFilterValues:any = (filterValues) => {
	const {
		rank,
		github_level,
		rate,
		languages,
		skills,
		country,
	} = filterValues;

	const values = [
		{
			name: 'rank',
			value: rank,
		},
		{
			name: 'github_level',
			value: github_level,
		},
		{
			name: 'rate',
			value: rate,
		},
		{
			name: 'languages',
			value: languages,
		},
		{
			name: 'skills',
			value: skills,
		},
		{
			name: 'country',
			value: country,
		},

	];

	return values;
};
