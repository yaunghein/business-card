import { error } from '@sveltejs/kit';
import { Resend } from 'resend';
import data from '$lib/data';
import { RESEND_API_KEY } from '$env/static/private';
import type { Actions } from './$types';

const resend = new Resend(RESEND_API_KEY);

export function load({ params }) {
	const person = data.find((person) => person.id === params.id);

	if (!person) error(404);

	return { person };
}

export const actions: Actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());
		const { name, email, phone, company, ownerEmail } = formData;

		const response = await resend.emails.send({
			from: 'La Persona <contact@exchange.la-persona.com>',
			to: ownerEmail as string,
			subject: `New Contact Exchange from ${name}`,
			html: `
	<!DOCTYPE html>
	<html lang="en">
		<head>
			<meta charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<title>Contact Exchange</title>
			<style>
				body {
					margin: 0;
					padding: 0;
					background-color: #f5f5f5;
					font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
						Helvetica, Arial, sans-serif;
				}

				.container {
					max-width: 560px;
					margin: 40px auto;
					background: #ffffff;
					overflow: hidden;
					box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
				}

				.header {
					background: #040404;
					color: #ffffff;
					padding: 28px 40px;
					font-size: 22px;
					font-weight: 600;
					letter-spacing: -0.3px;
					text-align: center;
					border-radius: 14px;
				}

				.content {
					padding: 32px 40px;
					color: #333;
					font-size: 15px;
					line-height: 1.65;
				}

				.info-box {
					margin-top: 20px;
					padding: 18px 22px;
					background: #f8f8f8;
					border-left: 4px solid #040404;
					border-radius: 6px;
				}

				.label {
					font-weight: 600;
					color: #040404;
				}

				.footer {
					text-align: center;
					padding: 25px 0;
					font-size: 13px;
					color: #666;
				}
			</style>
		</head>

		<body>
			<div class="container">
				<div class="header">New Contact Exchange</div>

				<div class="content">
					You have received a new contact exchange from your la-persona card.  

					<div class="info-box">
						<p><span class="label">Name:</span> ${name}</p>
						<p><span class="label">Phone:</span> ${phone}</p>
						<p><span class="label">Email:</span> ${email}</p>
						<p><span class="label">Company:</span> ${company}</p>
					</div>
				</div>
			</div>
		</body>
	</html>
	`
		});
		if (response.error) {
			return { ok: false, error: { message: response.error.message } };
		}
		return { ok: true, response };
	}
};
