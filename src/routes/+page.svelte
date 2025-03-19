<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import Lenis from 'lenis';

	onMount(async () => {
		const { ScrollTrigger } = await import('gsap/ScrollTrigger');
		gsap.registerPlugin(ScrollTrigger);

		const lenis = new Lenis();

		function raf(time: number) {
			lenis.raf(time);
			ScrollTrigger.update();
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		const wheel = document.querySelector('.cards') as HTMLDivElement;
		const cards = gsap.utils.toArray('.card') as HTMLDivElement[];
		const total = cards.length;
		const slice = (2 * Math.PI) / total;
		const radius = window.innerWidth * 0.75;
		const centerX = wheel.offsetWidth / 2;
		const centerY = wheel.offsetHeight / 2;

		gsap.set(wheel, {
			y: centerY * 4.5
		});

		cards.forEach((card, i) => {
			const angle = i * slice;
			const initialRotation = angle * (180 / Math.PI) + 90;
			const x = centerX + radius * Math.cos(angle);
			const y = centerY + radius * Math.sin(angle);

			gsap.set(card, {
				left: x,
				top: y,
				rotate: initialRotation
			});
		});

		gsap.to(wheel, {
			rotate: () => -360,
			ease: 'none',
			duration: cards.length,
			transformOrigin: 'center center',
			scrollTrigger: {
				start: 0,
				end: 'max',
				scrub: 1,
				invalidateOnRefresh: true
			}
		});

		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: '#scroll-wrapper',
				start: 'top top',
				end: 'bottom bottom',
				scrub: 3
				// markers: true
			}
		});

		tl.from('.s1-t1', { scale: 2.4, opacity: 0 })

			// stop for a second
			.to({}, { duration: 1 })

			.to('.s1-t1', { scale: 0.5, opacity: 0 })
			.from('.s2-t1, .s2-t2', { y: '24rem', opacity: 0, stagger: 0.05 })
			.from('.s2-img1', { y: '210%', opacity: 0 }, '<')

			// stop for a second
			.to({}, { duration: 1 })

			.to('.s2-t1, .s2-t2', { opacity: 0, stagger: 0.05 })
			.to('.s2-img1', { y: '-210%', opacity: 0 }, '<')

			.from('.s3-t1,.s3-t2, .s3-t3', { y: '24rem', opacity: 0, stagger: 0.05 })
			.from('.s3-img1', { y: '200%', opacity: 0 }, '<')

			// stop for a second
			.to({}, { duration: 1 })

			.to('.s3-t3', { opacity: 0 })
			.from('.s3-t4', { opacity: 0 })
			.from('.s3-img2', { y: '200%', opacity: 0 }, '<')
			.from('.s3-scan-1', { opacity: 0 }, '<75%')

			// stop for a second
			// .to({}, { duration: 1 })

			.from('.s3-scan-2', { opacity: 0 })
			.to('.s3-scan-2', { opacity: 0 })
			.to('.s3-scan-2', { opacity: 1 })
			.to('.s3-scan-2', { opacity: 0 })

			// stop for a second
			.to({}, { duration: 1 })

			.from('.s3-video', { opacity: 0 })

			// stop for a second
			.to({}, { duration: 2 })

			.set('.s3-img1', { opacity: 0 })
			.to('.s3-img2', { y: '-200%', opacity: 0 })
			.to('.s3-t1,.s3-t2, .s3-t4', { opacity: 0, stagger: 0.05 }, '<50%');
	});
</script>

<section class="h-[100svh]">
	<div
		class="flex h-full flex-col items-center justify-between px-6 pb-9 pt-6 sm:px-[4.5rem] sm:pb-14 sm:pt-14"
	>
		<header class="flex w-full items-center justify-between">
			<div aria-label="La Persona Logo" class="h-3 w-[8.7rem] sm:h-4 sm:w-[11.56rem]">
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 186 16"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path d="M0 0.239807H1.704V14.2238H10.944V15.7518H0V0.239807Z" fill="white" />
					<path
						d="M21.3034 0.239807H23.3673L29.7514 15.7518H27.8874L25.9354 10.8798H18.6234L16.6474 15.7518H14.8713L21.2954 0.239807H21.3034ZM25.3354 9.41581L22.2793 1.81581L19.2234 9.41581H25.3434H25.3354Z"
						fill="white"
					/>
					<path
						d="M46.4316 0.239807H54.0316C57.0636 0.239807 59.1916 2.2318 59.1916 5.0478C59.1916 7.8638 57.0396 9.79181 54.0316 9.79181H49.3996V15.7518H46.4316V0.239807ZM53.7036 7.3118C55.2076 7.3118 56.2076 6.4238 56.2076 5.0718C56.2076 3.7198 55.2076 2.8078 53.7036 2.8078H49.4076V7.30381H53.7036V7.3118Z"
						fill="white"
					/>
					<path
						d="M66.7366 0.239807H78.5045V2.8318H69.7045V6.66381H75.4885V9.16781H69.7045V13.1598H78.5925V15.7518H66.7366V0.239807Z"
						fill="white"
					/>
					<path
						d="M86.2556 0.239807H93.6556C96.7996 0.239807 98.9755 2.1918 98.9755 4.9838C98.9755 6.9758 97.7596 8.57581 95.9196 9.27981L99.3356 15.7518H96.0316L92.9516 9.70381H89.2316V15.7518H86.2635V0.239807H86.2556ZM93.4156 7.26381C94.9436 7.26381 95.9835 6.3758 95.9835 5.0238C95.9835 3.6718 94.9436 2.8078 93.4156 2.8078H89.2236V7.26381H93.4156Z"
						fill="white"
					/>
					<path
						d="M105.271 13.272L107 11.144C108.776 12.736 110.391 13.448 112.271 13.448C114.311 13.448 115.616 12.608 115.616 11.32C115.616 10.168 114.839 9.61605 112.887 9.28005L109.959 8.76805C107.231 8.30405 105.863 6.90405 105.863 4.64805C105.863 1.80805 108.168 0.0160522 111.848 0.0160522C114.112 0.0160522 116.48 0.816045 118.208 2.18405L116.616 4.40005C114.952 3.11205 113.359 2.52004 111.671 2.52004C109.855 2.52004 108.679 3.27205 108.679 4.42405C108.679 5.46405 109.344 5.97605 111.032 6.24005L113.848 6.70405C117.016 7.21605 118.544 8.65605 118.544 11.048C118.544 14.04 115.991 15.9681 112.071 15.9681C109.591 15.9681 107.103 14.9921 105.271 13.2641V13.272Z"
						fill="white"
					/>
					<path
						d="M125.2 8C125.2 3.52 128.792 0 133.376 0C137.96 0 141.552 3.52 141.552 8C141.552 12.48 137.96 16 133.376 16C128.792 16 125.2 12.48 125.2 8ZM138.496 8C138.496 5.008 136.28 2.728 133.376 2.728C130.472 2.728 128.256 5.008 128.256 8C128.256 10.992 130.472 13.272 133.376 13.272C136.28 13.272 138.496 10.992 138.496 8Z"
						fill="white"
					/>
					<path
						d="M149.153 0.239807H151.993L159.945 10.6798V0.239807H162.737V15.7518H160.121L151.945 4.9838V15.7518H149.153V0.239807Z"
						fill="white"
					/>
					<path
						d="M175.864 0.239807H179.296L185.616 15.7518H182.4L180.76 11.5598H174.2L172.56 15.7518H169.456L175.864 0.239807ZM179.856 9.15181L177.504 3.12781L175.136 9.15181H179.856Z"
						fill="white"
					/>
				</svg>
			</div>
			<button
				class="hidden rounded-full bg-white px-6 py-5 text-sm font-bold capitalize leading-none text-dark sm:block"
			>
				Contact Us
			</button>
			<a href="/" class="size-9 sm:hidden">
				<span class="sr-only">Email Us</span>
				<svg
					width="100%"
					height="100%"
					viewBox="0 0 39 39"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect width="39" height="39" rx="19.5" fill="white" />
					<path
						d="M11.8077 27C11.3026 27 10.875 26.825 10.525 26.475C10.175 26.125 10 25.6974 10 25.1923V13.8077C10 13.3026 10.175 12.875 10.525 12.525C10.875 12.175 11.3026 12 11.8077 12H27.1923C27.6974 12 28.125 12.175 28.475 12.525C28.825 12.875 29 13.3026 29 13.8077V25.1923C29 25.6974 28.825 26.125 28.475 26.475C28.125 26.825 27.6974 27 27.1923 27H11.8077ZM19.5 20.0577L11.5 14.9423V25.1923C11.5 25.2821 11.5288 25.3558 11.5865 25.4135C11.6442 25.4712 11.7179 25.5 11.8077 25.5H27.1923C27.2821 25.5 27.3558 25.4712 27.4135 25.4135C27.4712 25.3558 27.5 25.2821 27.5 25.1923V14.9423L19.5 20.0577ZM19.5 18.5L27.3463 13.5H11.6537L19.5 18.5ZM11.5 14.9423V13.5V25.1923C11.5 25.2821 11.5288 25.3558 11.5865 25.4135C11.6442 25.4712 11.7179 25.5 11.8077 25.5H11.5V14.9423Z"
						fill="#121212"
					/>
				</svg>
			</a>
		</header>

		<h1
			class="max-w-[40rem] text-center text-base font-light uppercase leading-[1.1] tracking-[0.2rem] sm:text-[2rem] sm:tracking-[0.3rem]"
		>
			<span class="font-bold">Elevate Your Presence</span> with a Bespoke Digital Experience Test
		</h1>
		<button
			class="rounded-full bg-white px-6 py-5 text-xs font-bold capitalize leading-none text-dark sm:text-sm"
		>
			Explore our craft
		</button>
	</div>
</section>

<section
	class="relative overflow-hidden pb-[4.5rem] pt-16 text-center sm:flex sm:items-end sm:justify-center sm:pb-0 sm:pt-0"
>
	<div
		class="cards absolute left-1/2 top-[0rem] hidden aspect-square w-[31.25rem] -translate-x-1/2 items-center justify-center sm:flex"
	>
		{#each Array.from({ length: 12 }, (_, i) => i) as i}
			<div
				class="card absolute left-0 top-0 aspect-[25/15] w-[25rem] -translate-x-1/2 -translate-y-1/2"
			>
				<div class="h-full w-full animate-pulse bg-neutral-800"></div>
			</div>
		{/each}
	</div>
	<h2
		class="mx-auto mb-16 max-w-[12rem] text-center text-base font-light uppercase leading-[1.1] tracking-[0.2rem] sm:hidden sm:text-[2rem] sm:tracking-[0.3rem]"
	>
		Every Card,<span class="font-bold"><br />a Masterpiece</span>
	</h2>
	<p class="mx-auto max-w-[18rem] text-center text-sm font-light leading-normal sm:pt-[42rem]">
		Experience the elegance of a card tailored to your identity. From the sleek phone wallpaper to
		the interactive 3D design, each element reflects your brand with precision and style.
	</p>
</section>

<div id="scroll-wrapper" class="relative h-[1000svh]">
	<section class="sticky inset-0 top-0 h-[100svh] overflow-hidden">
		<div
			class="s1-t1 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-base font-light uppercase leading-[1.1] tracking-[0.3rem] sm:text-[2rem]"
		>
			<span class="font-bold">Tailored for You,</span> Step by Step.
		</div>
	</section>
	<section class="sticky inset-0 top-0 h-[100svh]">
		<div
			class="flex h-full flex-col items-center px-6 py-16 text-center sm:grid sm:grid-cols-3 sm:px-0 sm:py-0 sm:text-left"
		>
			<div class="flex items-center justify-center sm:h-full">
				<div class="grid max-w-[14rem] gap-1 sm:gap-3">
					<h2 class="s2-t1 text-sm uppercase tracking-[0.13125rem]">
						<span class="font-bold">Bespoke</span> Design
					</h2>
					<p class="s2-t2 text-sm font-light leading-tight sm:leading-relaxed">
						Your card, your identity, brought to life in 3D.
					</p>
				</div>
			</div>
			<div
				class="absolute left-1/2 top-1/2 flex h-full w-[88%] -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:relative sm:w-auto"
			>
				<div class="s2-img1 aspect-[25/15] w-full bg-neutral-800 sm:w-[25rem]"></div>
			</div>
			<!-- <div class="flex h-full flex-col items-center justify-center"></div> -->
		</div>
	</section>
	<section class="sticky inset-0 top-0 h-[100svh]">
		<div
			class="flex h-full flex-col items-center justify-between px-6 py-6 text-center sm:grid sm:grid-cols-3 sm:px-0 sm:py-0 sm:text-left"
		>
			<div class="flex items-center justify-center sm:h-full">
				<div class="grid max-w-[14rem] gap-1 sm:gap-3">
					<h2 class="s3-t1 text-sm uppercase tracking-[0.13125rem]">
						<span class="font-bold">Seamless</span> Experience
					</h2>
					<p class="s3-t2 text-sm font-light leading-tight sm:leading-normal">
						Save contact information with a tap of a button,
					</p>
				</div>
			</div>
			<div
				class="absolute left-1/2 top-1/2 flex h-full -translate-x-1/2 -translate-y-1/2 items-center justify-center sm:relative"
			>
				<div
					class="s3-img1 relative aspect-[1/2.16] w-[10rem] overflow-hidden rounded-xl border border-light sm:w-[11.25rem]"
				>
					<img
						src="/images/s3-img1.jpg"
						alt=""
						class="absolute inset-0 h-full w-full object-cover"
					/>
				</div>
				<div
					class="s3-img2 absolute left-1/2 top-1/2 aspect-[1/2.15] w-[13rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-xl border border-light sm:w-[17.75rem]"
				>
					<img
						src="/images/s3-scan-1.png"
						alt=""
						class="s3-scan-1 absolute inset-0 h-full w-full"
					/>
					<img
						src="/images/s3-scan-2.png"
						alt=""
						class="s3-scan-2 absolute inset-0 h-full w-full"
					/>
					<video
						class="s3-video absolute inset-0 h-full w-full object-cover"
						controls={false}
						muted
						loop
						autoplay
					>
						<source src="/images/s3-video.mp4" type="video/mp4" />
						<track kind="captions" />
						Your browser does not support the video tag.
					</video>
				</div>
			</div>
			<div class="flex flex-col items-center justify-center sm:h-full">
				<div
					class="relative mx-auto h-[3rem] w-[8rem] text-sm font-light leading-relaxed sm:-translate-x-[2.81rem]"
				>
					<span
						class="s3-t3 absolute left-1/2 top-1/2 w-[8rem] -translate-x-1/2 -translate-y-1/2 leading-tight sm:hidden sm:leading-normal"
					>
						Pull up your custom lock screen...
					</span>
					<span
						class="s3-t4 absolute left-1/2 top-1/2 w-[6.88rem] -translate-x-1/2 -translate-y-1/2 leading-tight sm:hidden sm:leading-normal"
					>
						Scan it and see the magic...
					</span>
					<span class="s3-t3 absolute hidden sm:block"> Pull up your custom lock screen... </span>
					<span class="s3-t4 absolute hidden w-[6.88rem] sm:block">
						Scan it and see the magic...
					</span>
				</div>
			</div>
		</div>
	</section>
</div>

<section>
	<div
		class="flex flex-col items-center px-6 pb-16 pt-16 sm:px-[4.5rem] sm:pb-[12.5rem] sm:pt-[4.5rem]"
	>
		<h2
			class="max-w-[16rem] text-center text-base font-light uppercase leading-[1.1] tracking-[0.1rem] sm:max-w-[40rem] sm:text-[2rem] sm:tracking-[0.3rem]"
		>
			Get your <span class="font-bold">bespoke digital Business card</span> and start making connections...
		</h2>

		<div class="mt-[4.5rem] grid -translate-x-[2rem] gap-12 sm:mt-[12.5rem] sm:gap-[4.5rem]">
			<div class="grid grid-cols-2 gap-4 sm:gap-[8rem]">
				<div class="text-right text-xs font-light leading-normal sm:text-sm">Single Card:</div>
				<div class="grid gap-8">
					<div class="max-w-[17rem] text-xs font-light leading-normal sm:text-sm">
						<span class="font-bold">2,000</span> Baht per Card
					</div>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:gap-[8rem]">
				<div class="text-right text-xs font-light leading-normal sm:text-sm">Bulk Discounts:</div>
				<div class="grid gap-8">
					<div class="max-w-[17rem] text-xs font-light leading-normal sm:text-sm">
						Special rates for orders of 5 or more cards with the same design.
					</div>
					<div class="max-w-[17rem] text-xs font-light leading-none sm:text-sm">
						<span class="font-bold">8,000</span> Baht for 5 cards (1,600 Baht per card)
					</div>
					<div class="max-w-[17rem] text-xs font-light leading-none sm:-mt-5 sm:text-sm">
						<span class="font-bold">12,000</span> Baht for 7 cards (1,400 Baht per card)
					</div>
				</div>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:gap-[8rem]">
				<div class="text-right text-xs font-light leading-normal sm:text-sm">Referral Program:</div>
				<div class="grid gap-8">
					<div class="max-w-[17rem] text-xs font-light leading-normal sm:text-sm">
						Earn rewards for every successful referral. <span class="underline underline-offset-4">
							Contact us
						</span> to discuss.
					</div>
				</div>
			</div>
		</div>
	</div>
</section>

<section>
	<div class="flex flex-col items-center px-[4.5rem] pt-16 text-center sm:pt-0">
		<h2
			class="max-w-[30.19rem] text-center text-base font-light uppercase leading-[1.1] tracking-[0.1rem] sm:text-[2rem] sm:tracking-[0.3rem]"
		>
			Your Brand Deserves <span class="font-bold">the Best</span>
		</h2>
		<div
			class="my-16 aspect-[18/11] w-[18.88rem] animate-pulse bg-neutral-800 sm:my-[10.69rem]"
		></div>
		<div class="mb-8 flex flex-col items-center gap-8 sm:mb-14 sm:flex-row sm:gap-14">
			<button
				class="rounded-full bg-white px-6 py-5 text-xs font-bold capitalize leading-none text-dark sm:text-sm"
			>
				Get Your Card Now
			</button>
			<button
				class="sm:max-w-auto mx-auto max-w-[7rem] text-xs underline underline-offset-4 sm:text-sm"
			>
				Schedule a Free Consultation
			</button>
		</div>
		<p class="mb-6 text-[0.625rem] font-light leading-normal">
			COPYRIGHT © LA PERSONA 2025. ALL RIGHTS RESERVED.
		</p>
	</div>
</section>
