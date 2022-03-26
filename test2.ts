declare const window: any;

export const identifyUser:any = ({ id, firstName, lastName, email }) => {
	if (typeof window !== 'undefined' && window.analytics) {
		const payload = {
			name: `${ firstName } ${ lastName }`,
			email,
		};

		window.analytics.identify(id, payload);
	}
};
export const track:any = (event:string, data:any) => {
	if (typeof window !== 'undefined' && window.analytics) {
		window.analytics.track(event, { ...data });
	}
};
