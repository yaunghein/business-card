import { error } from '@sveltejs/kit';
import { HUBSPOT_PORTAL_ID, HUBSPOT_FORM_GUID_LEAD } from '$env/static/private';
import type { Actions } from '@sveltejs/kit';

const CONSENT_TEXT =
	'	I would like to receive marketing communications on products, services and events offered by La Persona. I understand these communications may be personalized to me based on my interests, preferences and use of products and services, including invitations to provide customer experience feedback.';

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			return {
				success: true
			};
			const formData = await request.formData();
			const { email, firstname, lastname, phone, customer_groups, message } =
				Object.fromEntries(formData);
			const url = `https://api.hsforms.com/submissions/v3/integration/submit/${HUBSPOT_PORTAL_ID}/${HUBSPOT_FORM_GUID_LEAD}`;
			const body = {
				submittedAt: new Date().getTime(),
				fields: [
					{ objectTypeId: '0-1', name: 'email', value: email },
					{ objectTypeId: '0-1', name: 'firstname', value: `${firstname} ${lastname}` },
					{ objectTypeId: '0-1', name: 'phone', value: phone },
					{ objectTypeId: '0-1', name: 'customer_groups', value: customer_groups },
					{ objectTypeId: '0-1', name: 'message', value: message }
				],
				legalConsentOptions: {
					consent: {
						consentToProcess: true,
						text: CONSENT_TEXT,
						communications: [
							{
								value: true,
								subscriptionTypeId: 123,
								text: CONSENT_TEXT
							}
						]
					}
				}
			};
			const options = {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(body)
			};

			const response = await fetch(url, options);

			if (!response.ok) {
				const message = await response.text();
				console.error(message);
				return error(response.status, { message });
			}

			const data = await response.json();
			console.log({ data });

			return { success: true };
		} catch (err: any) {
			console.error(err);
			return error(500, { message: err.message });
		}
	}
};
