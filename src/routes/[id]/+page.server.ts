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
		const { name, email, phone, dialCode, company, ownerEmail } = formData;

		const response = await resend.emails.send({
			from: 'La Persona <contact@exchange.la-persona.com>',
			to: ownerEmail as string,
			subject: `New Contact Exchange from ${name}`,
			html: `
	<!doctype html>
<html
	lang="en"
	xmlns="http://www.w3.org/1999/xhtml"
	xmlns:v="urn:schemas-microsoft-com:vml"
	xmlns:o="urn:schemas-microsoft-com:office:office"
>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="x-apple-disable-message-reformatting" />
		<title>New Contact Exchange</title>
		<!--[if mso]>
			<style type="text/css">
				body,
				table,
				td {
					font-family: Arial, Helvetica, sans-serif !important;
				}
			</style>
		<![endif]-->
		<style type="text/css">
			@font-face {
				font-family: 'Red Hat Display';
				font-style: normal;
				font-weight: 400;
				src: url('https://www.la-persona.com/fonts/RedHatDisplay.woff2') format('woff2');
			}
			/* Reset styles */
			body {
				margin: 0 !important;
				padding: 0 !important;
				background-color: #f4f4f4; /* Light Background */
				/* Updated font stack to prioritize Red Hat Display */
				font-family:
					'Red Hat Display',
					-apple-system,
					BlinkMacSystemFont,
					'Segoe UI',
					Roboto,
					Helvetica,
					Arial,
					sans-serif;
				letter-spacing: 0.05em;
			}
			table {
				border-spacing: 0;
				border-collapse: collapse;
			}
			td {
				padding: 0;
			}
			img {
				border: 0;
				display: block;
				max-width: 100%;
				height: auto;
			}
			a {
				text-decoration: none;
				color: #007bff; /* Standard blue link color for visibility on light theme */
			}

			/* Main styles */
			.wrapper {
				width: 100%;
				table-layout: fixed;
				background-color: #f4f4f4; /* Light Background */
				padding: 0;
			}
			.main-container {
				max-width: 600px;
				background-color: #ffffff; /* White Container */
				margin: 0 auto;
			}
			.main-inner-container {
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
			}
			.header {
				padding: 40px 40px 30px 40px;
			}
			.logo {
				font-size: 20px;
				font-weight: 600;
				color: #121212; /* Dark color for logo text */
				margin: 0 0 30px 0;
				width: 185px;
				height: 16px;
			}
			.heading {
				padding: 25px 0 0 0;
				font-size: 24px;
				font-weight: 600;
				color: #121212; /* Dark text for heading */
				margin: 0 0 20px 0;
				line-height: 1.3;
				border-top: 1px #eeeeee solid; /* Light border */
			}
			.text {
				font-size: 15px;
				line-height: 1.6;
				color: #444444; /* Darker text for readability */
				margin: 0 0 15px 0;
			}

			/* Custom Info Box Styles */
			.info-box {
				margin: 25px 0 0 0;
				border-radius: 8px;
				font-size: 15px;
				color: #121212; /* Dark text for data */
			}
			.info-box p {
				margin: 0 0 10px 0;
				line-height: 1.5;
			}
			.info-box p:last-child {
				margin-bottom: 0;
			}
			.label {
				font-weight: 600;
				color: #666666; /* Medium dark gray label */
				display: inline-block;
				width: 80px; /* Aligns the data points */
			}
			/* End Custom Info Box Styles */
			.cta-container {
				padding: 0px 40px 40px 40px;
			}
			.cta-button {
				display: block;
				width: 100%;
				background-color: transparent; /* Blue button background */
				color: #121212 !important; /* White text for contrast */
				border: 1px #121212 solid;
				text-align: center;
				padding: 18px 20px;
				font-size: 14px;
				font-weight: 700;
				text-decoration: none;
				border-radius: 50px;
				box-sizing: border-box;
				text-transform: uppercase;
				transition: all 0.3s ease-out;
			}
			.footer {
				padding: 30px 40px;
				background-color: #f4f4f4; /* Light background matching wrapper */
			}
			.footer-address,
			.footer-text {
				font-size: 13px;
				color: #666666; /* Medium dark gray */
				margin: 0 10px 0;
				line-height: 1.5;
			}
			.footer-address {
				margin: 0 0 20px 0;
			}
			.social-icons {
				margin: 0;
			}
			.social-icon {
				display: inline-block;
				margin-right: 15px;
			}
			.social-icon img {
				width: 24px;
				height: 24px;
			}

			/* Responsive styles */
			@media screen and (max-width: 600px) {
				.main-container {
					width: 100% !important;
				}
				.header,
				.cta-container,
				.footer {
					padding-left: 20px !important;
					padding-right: 20px !important;
				}
				.heading {
					font-size: 20px !important;
				}
				.text,
				.info-box {
					font-size: 14px !important;
				}
			}
		</style>
	</head>
	<body style="margin: 0; padding: 0">
		<center class="wrapper">
			<table
				role="presentation"
				class="main-container"
				width="600"
				cellpadding="0"
				cellspacing="0"
				border="0"
			>
				<tbody class="main-inner-container">
					<!-- Header Section -->
					<tr>
						<td class="header">
							<!-- Replaced image with styled text for better light-theme reliability in email clients -->
							<a href="https://www.la-persona.com/" style="text-decoration: none; color: #121212">
								<img src="https://www.la-persona.com/images/email/logo.png" class="logo" alt="La Persona" />
							</a>

							<h2 class="heading">New contact exchange received!</h2>
							<!-- <p class="text">
                Jane Doe has shared her professional contact information with you. You can save her
                details directly below.
              </p> -->

							<div class="info-box">
								<p>
									<span class="label">Name:</span>
									<!-- Updated inline color to dark for light theme -->
									<span style="color: #121212">${name}</span>
								</p>
								<p>
									<span class="label">Phone:</span>
									<!-- Updated inline color to dark for light theme -->
									<span style="color: #121212">${dialCode} ${phone}</span>
								</p>
								<p>
									<span class="label">Email:</span>
									<!-- Updated inline color to dark for light theme -->
									<span style="color: #121212">${email}</span>
								</p>
								<p>
									<span class="label">Company:</span>
									<!-- Updated inline color to dark for light theme -->
									<span style="color: #121212">${company}</span>
								</p>
							</div>
						</td>
					</tr>

					<!-- CTA Button Section -->
					<tr>
						<td class="cta-container">
							<!-- The CTA button text color is now white on a blue background defined in CSS -->
							<a href="https://www.la-persona.com" class="cta-button">Save Contact</a>
						</td>
					</tr>
				</tbody>
			</table>

			<!-- Footer Section -->
			<table
				role="presentation"
				class="main-container"
				width="600"
				cellpadding="0"
				cellspacing="0"
				border="0"
			>
				<tr>
					<td class="footer">
						<p class="footer-address">
							La Persona<br />
							2 Lat Phrao 85 Alley, Khlong Chaokhun Sing,<br />
							Wang Thonglang, Bangkok 10310
						</p>
						<div class="social-icons">
							<a href="https://www.la-persona.com/" class="social-icon">
								<img
									src="https://www.la-persona.com/images/email/icon-lp.png"
									alt="Twitter/X"
									width="24"
									height="24"
								/>
							</a>
							<a href="https://www.la-persona.com/" class="social-icon">
								<img
									src="https://www.la-persona.com/images/email/icon-facebook.png"
									alt="Facebook"
									width="24"
									height="24"
								/>
							</a>
							<a href="https://www.la-persona.com/" class="social-icon">
								<img
									src="https://www.la-persona.com/images/email/icon-linkedin.png"
									alt="LinkedIn"
									width="24"
									height="24"
								/>
							</a>
						</div>
					</td>
				</tr>
			</table>
		</center>
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
