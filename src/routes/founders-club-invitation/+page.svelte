<script lang="ts">
	import { onMount } from 'svelte';
	import { fly } from 'svelte/transition';
	import { Application } from '@splinetool/runtime';
	import AnimatedText from '$lib/components/animated-text.svelte';

	let showBtn = $state(false);
	let startTimeout = $state(false);
	const DELAY_TO_SHOW_BTN = 5000;

	onMount(() => {
		const canvas = document.querySelector('canvas') as HTMLCanvasElement;
		const spline = new Application(canvas);
		spline.load('https://prod.spline.design/BRffABXw-tBWEeFA/scene.splinecode').then(() => {
			spline.addEventListener('mouseDown', () => {
				if (startTimeout) return;
				startTimeout = true;
				setTimeout(() => (showBtn = true), DELAY_TO_SHOW_BTN);
			});
		});
	});
</script>

<div class="relative z-10 h-[100dvh] w-screen overflow-hidden bg-white">
	<canvas class="absolute inset-0 h-full w-full"></canvas>
	{#if showBtn}
		<a
			in:fly={{ y: '100%', opacity: 0, duration: 1000 }}
			href="/founders-club"
			class="group absolute bottom-9 left-1/2 w-[15rem] -translate-x-1/2 rounded-full border border-dark py-3 text-xs font-light uppercase leading-[1] tracking-[0.1rem] text-dark transition-all duration-500 hover:bg-dark hover:text-white sm:w-[19.05rem] sm:py-4 sm:text-sm"
		>
			<AnimatedText text="Reserve your place" />
		</a>
	{/if}
</div>
