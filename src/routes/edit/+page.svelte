<script lang="ts">
	import { onMount } from 'svelte';
	import { Application } from '@splinetool/runtime';

	let spline: Application | null = $state(null);
	let form = $state({
		firstname: 'min',
		lastname: 'htet myet'
	});

	onMount(() => {
		const canvas = document.querySelector('canvas') as HTMLCanvasElement;
		spline = new Application(canvas);
		spline.load('https://prod.spline.design/PjeLca3rs6T8FwE7/scene.splinecode');
	});

	$effect(() => {
		if (!spline) return;
		spline.setVariables({
			firstName: form.firstname.toUpperCase(),
			lastName: form.lastname.toUpperCase()
		});
	});
</script>

<div class="relative z-10 flex h-[100dvh]">
	<div class="relative flex-1 overflow-hidden">
		<canvas class="absolute inset-0 h-full w-full translate-x-32"></canvas>
	</div>

	<div class="flex flex-1 flex-col items-center justify-center gap-4">
		<input
			type="text"
			placeholder="First Name"
			autocomplete="off"
			bind:value={form.firstname}
			class="h-[2.4rem] w-1/2 appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
		/>
		<input
			type="text"
			placeholder="Last Name"
			autocomplete="off"
			bind:value={form.lastname}
			class="h-[2.4rem] w-1/2 appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-sm placeholder:tracking-[0.1rem] placeholder:text-white hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
		/>
	</div>
</div>
