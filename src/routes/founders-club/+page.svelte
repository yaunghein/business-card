<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import Logo from '$lib/components/svgs/logo.svelte';
	import AnimatedText from '$lib/components/animated-text.svelte';
	import type { SubmitFunction } from './$types';

	onMount(async () => {
		const lenis = new Lenis();
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		function raf(time: number) {
			lenis.raf(time);
			ScrollTrigger.update();
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);
	});

	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let error = $state('');

	const submit: SubmitFunction = ({ formData }) => {
		const { email, firstname } = Object.fromEntries(formData);
		if (!email || !firstname) {
			return;
		}
		isSubmitting = true;

		return async ({ result }) => {
			switch (result.type) {
				case 'success':
					isSuccess = true;
					break;
				case 'error':
					error = result.error?.message || 'An error occurred';
					break;
			}
			isSubmitting = false;
		};
	};
</script>

<svelte:head>
	<script src="https://js-na2.hsforms.net/forms/embed/243709896.js" defer></script>
</svelte:head>

<header class="z-10 bg-dark px-4 sm:px-[4.5rem]">
	<div class="flex items-center justify-center py-16 sm:py-[5rem]">
		<div class="aspect-[1/0.09] w-32 sm:w-[11.6rem]">
			<Logo />
		</div>
	</div>
</header>

<section
	class="flex min-h-[calc(100svh-16rem)] items-center justify-center pb-[3.5rem] sm:pb-[3.5rem] sm:pt-0"
>
	<!-- <h2
		class="mx-auto mb-[4.5rem] max-w-[20rem] text-center text-xl font-light uppercase leading-[1.5] tracking-[0.2rem] sm:max-w-[40rem] sm:text-[2.5rem] sm:tracking-[0.3rem]"
	>
		Your Brand Deserves<br /> the Best.
	</h2> -->
	<!-- <div
		class="hs-form-frame mx-auto max-w-[34rem]"
		data-region="na2"
		data-form-id="418657fc-e08b-4981-a0e9-6410f2b7c0f9"
		data-portal-id="243709896"
	></div> -->
	{#if isSuccess}
		<div
			class="mx-auto flex min-h-full w-full max-w-[39.88rem] items-center justify-center gap-8 px-4 sm:px-0"
		>
			<div class="flex h-full flex-col items-center justify-center gap-8">
				<div
					class="text-center text-sm font-light uppercase leading-normal tracking-[0.1rem] sm:text-sm"
				>
					Application received.
				</div>
				<span
					class="-mt-1 max-w-[18rem] text-center text-xs font-light leading-normal tracking-[0.1rem] sm:max-w-[20rem] sm:text-sm"
				>
					The journey to your bespoke digital identity begins now. Expect a personal introduction
					from our team within the day to elevate your digital presence.
				</span>
				<a
					href="/"
					class="group mt-2 w-[7rem] place-self-center rounded-full border border-white/10 py-3 text-xs font-light uppercase leading-[1] tracking-[0.1rem] transition-all duration-500 hover:bg-white hover:text-dark sm:mt-2 sm:w-[7rem] sm:py-3 sm:text-xs"
				>
					<AnimatedText text="Got it!" />
				</a>
			</div>
		</div>
	{:else}
		<form
			method="POST"
			use:enhance={submit}
			class="mx-auto grid w-full max-w-[39.88rem] gap-8 px-4 sm:px-0"
		>
			<input
				name="email"
				type="email"
				placeholder="Email"
				autocomplete="off"
				required
				class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
			/>
			<input
				name="firstname"
				type="text"
				placeholder="First Name"
				autocomplete="off"
				required
				class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
			/>
			<input
				name="lastname"
				type="text"
				placeholder="Last Name"
				autocomplete="off"
				class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
			/>
			<input
				name="phone"
				type="phone"
				placeholder="Phone Number"
				autocomplete="off"
				class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
			/>
			<input
				name="prefer_contact_address"
				type="text"
				placeholder="Social Profile (Optional)"
				autocomplete="off"
				class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
			/>
			<input
				name="company"
				type="text"
				placeholder="Company Name (Optional)"
				autocomplete="off"
				class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
			/>
			<div class="relative h-[2.8rem] w-full sm:h-[3.13rem]">
				<select
					name="hs_seniority"
					class="h-full w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 focus:border-white/50 focus:outline-none sm:px-6"
				>
					<option value="">Professional Title</option>
					<option value="Business Owner">Business Owner</option>
					<option value="Director">Director</option>
					<option value="Manager">Manager</option>
					<option value="Executive">Executive</option>
					<option value="Entry Role">Entry Role</option>
				</select>
				<div class="absolute right-2 top-1/2 aspect-square w-6 -translate-y-1/2 sm:right-3">
					<svg
						width="100%"
						height="100%"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<mask
							id="mask0_926_75"
							style="mask-type:alpha"
							maskUnits="userSpaceOnUse"
							x="0"
							y="0"
							width="24"
							height="24"
						>
							<rect width="24" height="24" fill="#D9D9D9" />
						</mask>
						<g mask="url(#mask0_926_75)">
							<path d="M12 15L7 10H17L12 15Z" fill="currentColor" />
						</g>
					</svg>
				</div>
			</div>
			<textarea
				name="message"
				placeholder="Message"
				autocomplete="off"
				class="min-h-[6.63rem] w-full appearance-none border border-white/10 bg-transparent px-4 py-[0.8rem] text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:px-6"
			></textarea>

			<div class="flex cursor-pointer items-start gap-3 sm:gap-6">
				<span class="text-xs font-light leading-normal tracking-[0.1rem] sm:text-sm">
					By submitting this form, you'll receive replies, occasional updates, exclusive offers, and
					stories from our world of digital elegance. We only share what's meaningful & no spam,
					ever. Your information stays private and secure.
				</span>
			</div>

			{#if error}
				<div class="flex cursor-pointer items-start gap-3 sm:gap-6">
					<span class="text-xs font-light leading-normal tracking-[0.1rem] text-red-600 sm:text-sm">
						{error}
					</span>
				</div>
			{/if}

			<button
				class="group mt-5 w-[15rem] place-self-center rounded-full border border-white/10 py-3 text-xs font-light uppercase leading-[1] tracking-[0.1rem] transition-all duration-500 hover:bg-white hover:text-dark sm:mt-10 sm:w-[19.05rem] sm:py-4 sm:text-sm"
			>
				<AnimatedText text={isSubmitting ? 'Submitting...' : 'Submit'} />
			</button>
		</form>
	{/if}
</section>

<footer
	class="mt-5 flex flex-row-reverse flex-wrap-reverse items-center justify-center gap-[2rem] px-[4.5rem] pb-10 sm:mt-0 sm:flex-row sm:justify-between"
>
	<div class="mr-auto w-full text-xs font-light uppercase leading-normal text-white/30 sm:w-auto">
		© la persona. All rights reserved.
	</div>
	<a
		href="https://www.facebook.com/share/15cAByXMcX/"
		target="_blank"
		class="group text-xs font-light uppercase leading-normal"
	>
		<AnimatedText text="Facebook" />
	</a>
	<a
		href="https://www.linkedin.com/company/la-persona-mm/"
		target="_blank"
		class="group text-xs font-light uppercase leading-normal"
	>
		<AnimatedText text="LinkedIn" />
	</a>
</footer>
