<script lang="ts">
	import Menu from '$lib/components/icons/menu.svelte';
	import Phone from '$lib/components/icons/phone.svelte';
	import Close from '$lib/components/icons/close.svelte';
	import World from '$lib/components/icons/world.svelte';
	import ArrowDown from '$lib/components/icons/arrow-down.svelte';
	import DirectMessage from '$lib/components/icons/direct-message.svelte';

	let { data } = $props();

	let isMenuOpen = $state(false);

	const iconMap = {
		world: World,
		arrowDown: ArrowDown,
		directMessage: DirectMessage
	} as const;
</script>

<svelte:head>
	<title>{data.person.name} | La Persona</title>
</svelte:head>

<div class="relative z-10 h-[100svh] w-screen overflow-hidden">
	<!-- Spline Scene -->
	<iframe
		title="Spline Scene"
		src={data.person.spline}
		class="absolute left-0 top-0 z-0 h-full w-full"
		frameborder="0"
		allow="autoplay"
	></iframe>
	<div
		class="absolute bottom-8 left-0 right-0 flex w-full gap-3 px-5 transition duration-[750ms] sm:mx-auto sm:max-w-96 {isMenuOpen
			? 'translate-y-full'
			: 'translate-y-0'}"
	>
		<a
			href={data.person.vcf}
			download="{data.person.id}.vcf"
			class="grid flex-1 place-items-center rounded-full border border-white/10 bg-white/10 text-sm font-bold"
		>
			Save Contact
		</a>
		<button
			onclick={() => (isMenuOpen = !isMenuOpen)}
			class="grid aspect-square w-[3.25rem] shrink-0 place-items-center rounded-full border border-white/10 bg-white/10"
		>
			<div class="aspect-square w-6">
				<Menu />
			</div>
		</button>
		<!-- <a
			aria-label="phone"
			href="tel:{data.person.phone}"
			class="grid aspect-square w-[3.25rem] shrink-0 place-items-center rounded-full border border-white/10 bg-white/10"
		>
			<div class="aspect-square w-6">
				<Phone />
			</div>
		</a> -->
	</div>

	<div
		class="fixed inset-0 top-auto -mb-[1px] w-full scale-[1.005] rounded-t-xl border border-white/10 bg-[#121212] py-6 transition duration-[750ms] sm:mx-auto sm:max-w-[26rem] {isMenuOpen
			? 'translate-y-0'
			: 'translate-y-full'}"
	>
		<div>
			<button
				onclick={() => (isMenuOpen = false)}
				class="absolute right-4 top-4 grid aspect-square w-8 place-items-center rounded-full border border-white/10 bg-white/10 transition duration-[750ms] {isMenuOpen
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<div class="aspect-square w-[0.62rem]">
					<Close />
				</div>
			</button>
			<div
				class="text-center text-sm font-bold transition duration-[750ms] {isMenuOpen
					? 'opacity-100'
					: 'opacity-0'}"
			>
				Explore
			</div>
			<div
				class="hide-scrollbar mt-8 flex items-center justify-center gap-3 overflow-x-scroll px-5"
			>
				{#each data.person.links as link, index}
					{@const isImage = link.icon.includes('.')}
					{#if isImage}
						<a
							href={link.href}
							class="flex shrink-0 flex-col items-center gap-4 transition duration-[750ms] {isMenuOpen
								? 'opacity-100'
								: 'opacity-0'}"
							style="transition-delay: {(index + 1) * 100}ms"
						>
							<div class="grid aspect-square w-[4.56rem] overflow-hidden rounded-full bg-white/10">
								<img
									src={link.icon}
									alt={link.label}
									class="aspect-square h-full w-full object-cover"
								/>
							</div>
							<div class="max-w-[4rem] text-center text-xs leading-[1.1]">{link.label}</div>
						</a>
					{:else}
						{@const IconComponent = iconMap[link.icon as keyof typeof iconMap]}
						<a
							href={link.href}
							class="flex shrink-0 flex-col items-center gap-4 transition duration-[750ms] {isMenuOpen
								? 'opacity-100'
								: 'opacity-0'}"
							style="transition-delay: {(index + 1) * 100}ms"
						>
							<div
								class="grid aspect-square w-[4.56rem] place-items-center rounded-full bg-white/10"
							>
								<div class="aspect-square w-8">
									{#if IconComponent}
										<IconComponent />
									{/if}
								</div>
							</div>
							<div class="max-w-[4rem] text-center text-xs leading-[1.1]">{link.label}</div>
						</a>
					{/if}
				{/each}
			</div>
		</div>
	</div>
</div>
