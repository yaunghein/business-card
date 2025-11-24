<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { enhance } from '$app/forms';
	import Lenis from 'lenis';
	import gsap from 'gsap';
	import Logo from '$lib/components/svgs/logo.svelte';
	import AnimatedText from '$lib/components/animated-text.svelte';
	import TwoColumn from '$lib/components/two-column.svelte';
	import Bespoke from '$lib/components/icons/bespoke.svelte';
	import Timeless from '$lib/components/icons/timeless.svelte';
	import DirectMessage from '$lib/components/icons/direct-message.svelte';
	import Seamless from '$lib/components/icons/seamless.svelte';
	import CheckboxChecked from '$lib/components/icons/checkbox-checked.svelte';
	import CheckboxUnchecked from '$lib/components/icons/checkbox-unchecked.svelte';
	import type { SubmitFunction } from './$types';

	const SECTIONS = {
		MASTERPIECES: 'masterpieces',
		HOW_IT_WORKS: 'how-it-works',
		WHY_US: 'why-us',
		COMMISSION_US: 'commission-us'
	};

	let isHeaderVisible = $state(true);

	type currentSectionType = (typeof SECTIONS)[keyof typeof SECTIONS] | null;
	let currentSection: currentSectionType = $state(null);

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

		// header visibility check
		ScrollTrigger.create({
			trigger: 'header',
			start: 'top top',
			end: 'bottom top',
			onEnter: () => (isHeaderVisible = true),
			onLeave: () => (isHeaderVisible = false),
			onEnterBack: () => (isHeaderVisible = true)
		});

		// sections visibility check
		const sections = Object.values(SECTIONS)
			.map((id) => {
				const element = document.getElementById(id);
				return element as HTMLDivElement;
			})
			.filter(Boolean) as HTMLDivElement[];

		sections.forEach((section, index) => {
			ScrollTrigger.create({
				trigger: section,
				start: 'top 50%',
				end: 'bottom 50%',
				onEnter: () => (currentSection = section.id as currentSectionType),
				onLeave: () => (currentSection = null),
				onEnterBack: () => (currentSection = section.id as currentSectionType),
				onLeaveBack: () => index === 0 && (currentSection = null)
			});
		});
	});

	const navItems = [
		{ label: 'The Masterpieces', href: `#${SECTIONS.MASTERPIECES}` },
		{ label: 'How It Works', href: `#${SECTIONS.HOW_IT_WORKS}` },
		{ label: 'Why Us?', href: `#${SECTIONS.WHY_US}` },
		{ label: 'commission Us', href: `#${SECTIONS.COMMISSION_US}` }
	];
	const masterpieces = [
		{ image: '/images/iPhone 13-1.webp', alt: 'Demo 1' },
		{ image: '/images/iPhone 13-2.webp', alt: 'Demo 2' },
		{ image: '/images/iPhone 13-3.webp', alt: 'Demo 3' }
	];

	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let error = $state('');

	const submit: SubmitFunction = ({ formData }) => {
		const { email, firstname, customer_groups } = Object.fromEntries(formData);
		if (!email || !firstname || !customer_groups) {
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
	<div class="flex items-center justify-center border-b border-white/10 py-7 sm:py-[3.25rem]">
		<div class="aspect-[1/0.09] w-32 sm:w-[11.6rem]">
			<Logo />
		</div>
	</div>
</header>

<nav
	class="sticky top-0 z-10 hidden items-center justify-between bg-dark px-4 sm:flex sm:px-[4.5rem]"
>
	{#each navItems as item}
		<a
			href={item.href}
			class="group relative py-6 text-sm font-light uppercase leading-[1.1] tracking-[0.28rem]"
		>
			<AnimatedText text={item.label} />
			<div
				class="absolute inset-0 top-auto h-[1px] w-full bg-white transition-all duration-1000 {currentSection ===
				item.href.split('#')[1]
					? 'scale-x-100'
					: 'scale-x-0'}"
			></div>
		</a>
	{/each}
	<div
		class="absolute inset-0 top-auto h-[1px] w-full bg-white/10 transition-all duration-1000 {isHeaderVisible
			? 'scale-x-0'
			: 'scale-x-100'}"
	></div>
</nav>

<section class="">
	<h1
		class="mx-auto mb-[12.5rem] mt-[12.75rem] max-w-[20rem] text-center text-xl font-light uppercase leading-[1.1] tracking-[0.2rem] sm:max-w-[48rem] sm:text-[2.5rem] sm:tracking-[0.3rem]"
	>
		Elevate Your Presence with a Bespoke Digital Experience
	</h1>
	<div
		class="mb-[3.5rem] flex flex-col items-center justify-center gap-3 sm:mb-[7.5rem] sm:flex-row sm:gap-5"
	>
		<a
			href="/"
			class="group w-[15rem] rounded-full border border-white/10 py-3 text-xs font-light uppercase leading-[1] tracking-[0.1rem] transition-all duration-500 hover:bg-white hover:text-dark sm:w-[19.05rem] sm:py-4 sm:text-sm"
		>
			<AnimatedText text="explore our craft" />
		</a>
		<a
			href="/"
			class="group w-[15rem] rounded-full border border-white/10 py-3 text-xs font-light uppercase leading-[1] tracking-[0.1rem] transition-all duration-500 hover:bg-white hover:text-dark sm:w-[19.05rem] sm:py-4 sm:text-sm"
		>
			<AnimatedText text="commission your card" />
		</a>
	</div>
</section>

<section class="py-[3.5rem] sm:py-[7.5rem]" id={SECTIONS.MASTERPIECES}>
	<h2
		class="mx-auto mb-[4.5rem] max-w-[20rem] text-center text-xl font-light uppercase leading-[1.5] tracking-[0.2rem] sm:max-w-[40rem] sm:text-[2.5rem] sm:tracking-[0.3rem]"
	>
		Every Card, <br />a Masterpiece
	</h2>
	<p
		class="mx-auto mb-[6rem] max-w-[18rem] text-center text-sm font-light leading-normal sm:max-w-[18rem]"
	>
		Experience the elegance of a card tailored to your identity. From the sleek phone wallpaper to
		the interactive 3D design, each element reflects your brand with precision and style.
	</p>
	<div class="hidden items-center justify-center gap-20 sm:flex">
		{#each masterpieces as masterpiece}
			<img src={masterpiece.image} alt={masterpiece.alt} class="aspect-[1/2.02] w-[15.25rem]" />
		{/each}
	</div>
	<img
		src={masterpieces[1].image}
		alt={masterpieces[1].alt}
		class="mx-auto aspect-[1/2.02] w-[15.25rem] sm:hidden"
	/>
</section>

<section class="py-[3.5rem] sm:py-[7.5rem]" id={SECTIONS.HOW_IT_WORKS}>
	<div
		class="sm:min-h-auto flex min-h-[100svh] items-center justify-center sm:block sm:py-[23.5rem]"
	>
		<h2
			class="mx-auto mb-[4.5rem] max-w-[20rem] text-center text-xl font-light uppercase leading-[1.5] tracking-[0.2rem] sm:max-w-[40rem] sm:text-[2.5rem] sm:tracking-[0.3rem]"
		>
			Tailored for You,<br /> Step by Step
		</h2>
	</div>
	<div class="flex flex-col gap-16 px-4 sm:gap-[7.5rem] sm:px-[4.5rem]">
		<TwoColumn />
		<TwoColumn isReversed={true} />
		<TwoColumn />
	</div>
</section>

<section class="py-[3.5rem] sm:py-[7.5rem]" id={SECTIONS.WHY_US}>
	<h2
		class="mx-auto mb-[1.5rem] max-w-[20rem] text-center text-xl font-light uppercase leading-[1.5] tracking-[0.2rem] sm:mb-[4.5rem] sm:max-w-[40rem] sm:text-[2.5rem] sm:tracking-[0.3rem]"
	>
		Why Choose Us?
	</h2>

	<div class="flex flex-col items-stretch justify-center px-4 sm:flex-row sm:px-0">
		<div class=" border-white/10 px-14 py-20 sm:border-l">
			<div class="mb-7 aspect-square w-20">
				<Bespoke />
			</div>
			<h3 class="mb-3 text-base font-light uppercase leading-[1.5] tracking-[0.2rem]">
				Bespoke Design
			</h3>
			<p class="max-w-[14.5rem] text-sm font-light leading-normal">
				Your card, your identity, brought to life in 3D.
			</p>
		</div>
		<div class="border-t border-white/10 px-14 py-20 sm:border-l sm:border-t-0">
			<div class="mb-7 aspect-square w-20">
				<Seamless />
			</div>
			<h3 class="mb-3 text-base font-light uppercase leading-[1.5] tracking-[0.2rem]">
				Seamless Experience
			</h3>
			<p class="max-w-[14.5rem] text-sm font-light leading-normal">
				Save contact details with one tap.
			</p>
		</div>
		<div class="border-t border-white/10 px-14 py-20 sm:border-l sm:border-t-0">
			<div class="mb-7 aspect-square w-20">
				<Timeless />
			</div>
			<h3 class="mb-3 text-base font-light uppercase leading-[1.5] tracking-[0.2rem]">
				Timeless Elegance
			</h3>
			<p class="max-w-[14.5rem] text-sm font-light leading-normal">
				A solution that evolves with you.
			</p>
		</div>
	</div>
</section>

<section class="pb-[3.5rem] pt-0 sm:pb-[7.5rem] sm:pt-[7.5rem]" id={SECTIONS.COMMISSION_US}>
	<h2
		class="mx-auto mb-[4.5rem] max-w-[20rem] text-center text-xl font-light uppercase leading-[1.5] tracking-[0.2rem] sm:max-w-[40rem] sm:text-[2.5rem] sm:tracking-[0.3rem]"
	>
		Your Brand Deserves<br /> the Best.
	</h2>
	<!-- <div
		class="hs-form-frame mx-auto max-w-[34rem]"
		data-region="na2"
		data-form-id="418657fc-e08b-4981-a0e9-6410f2b7c0f9"
		data-portal-id="243709896"
	></div> -->
	{#if isSuccess}
		<div class="mx-auto grid min-h-96 w-full max-w-[39.88rem] gap-8 px-4 sm:px-0">
			<div class="flex flex-col items-center justify-center gap-8">
				<div
					class="text-center text-sm font-light uppercase leading-normal tracking-[0.1rem] sm:text-sm"
				>
					INQUIRY RECEIVED.
				</div>
				<span
					class="max-w-[18rem] text-center text-xs font-light leading-normal tracking-[0.1rem] sm:max-w-[19rem] sm:text-sm"
				>
					Your bespoke digital identity begins now. Our team will reach out personally within the
					day.
				</span>
				<button
					onclick={() => (isSuccess = false)}
					class="group mt-2 w-[7rem] place-self-center rounded-full border border-white/10 py-3 text-xs font-light uppercase leading-[1] tracking-[0.1rem] transition-all duration-500 hover:bg-white hover:text-dark sm:mt-2 sm:w-[7rem] sm:py-3 sm:text-xs"
				>
					<AnimatedText text="Got it!" />
				</button>
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
			<div class="relative h-[2.8rem] w-full sm:h-[3.13rem]">
				<select
					name="customer_groups"
					required
					class="h-full w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 focus:border-white/50 focus:outline-none sm:px-6"
				>
					<option value="">Choose Your Experience Tier</option>
					<option value="Founders' Club (Limited Offer)">Founders' Club (Limited Offer)</option>
					<option value="Single Card">Single Card</option>
					<option value="Multiple Cards">Multiple Cards</option>
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
	class="mt-10 flex flex-row-reverse flex-wrap-reverse items-center justify-center gap-[2rem] px-[4.5rem] pb-10 sm:mt-0 sm:flex-row sm:justify-between"
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
