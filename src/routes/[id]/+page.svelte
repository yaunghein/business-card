<script lang="ts">
	import { enhance } from '$app/forms';
	import Menu from '$lib/components/icons/menu.svelte';
	import Phone from '$lib/components/icons/phone.svelte';
	import Close from '$lib/components/icons/close.svelte';
	import World from '$lib/components/icons/world.svelte';
	import ArrowDown from '$lib/components/icons/arrow-down.svelte';
	import DirectMessage from '$lib/components/icons/direct-message.svelte';
	import AnimatedText from '$lib/components/animated-text.svelte';
	import type { SubmitFunction } from './$types';

	let { data } = $props();

	let isFormOpen = $state(false);
	let isMenuOpen = $state(false);

	const iconMap = {
		world: World,
		arrowDown: ArrowDown,
		directMessage: DirectMessage
	} as const;

	let formData = $state({ name: '', phone: '' });
	let isValid = $derived(!!formData.name && !!formData.phone);
	let isSubmitting = $state(false);
	let isSuccess = $state(false);
	let error = $state('');

	const submit: SubmitFunction = ({ formData }) => {
		const { name, phone } = Object.fromEntries(formData);
		if (!name || !phone) return;
		isSubmitting = true;

		return async ({ result }) => {
			console.log({ result });
			switch (result.type) {
				case 'success':
					if (result.data!.ok) {
						isSuccess = true;
					} else {
						error = result.data!.error?.message || 'An unexpected error.';
					}
					break;
			}
			isSubmitting = false;
		};
	};
</script>

<svelte:head>
	<title>{data.person.name} | La Persona</title>
</svelte:head>

<div class="relative z-10 h-[100dvh] w-screen overflow-hidden">
	<!-- Spline Scene -->
	<iframe
		title="Spline Scene"
		src={data.person.spline}
		class="absolute left-0 top-0 z-0 h-full w-full"
		frameborder="0"
		allow="autoplay"
	></iframe>
	<div
		class="absolute bottom-8 left-0 right-0 flex w-full gap-3 px-5 transition duration-[750ms] sm:mx-auto sm:max-w-96 {isMenuOpen ||
		isFormOpen
			? 'translate-y-full'
			: 'translate-y-0'}"
	>
		<!-- <a
			href={data.person.vcf}
			download="{data.person.id}.vcf"
			class="grid flex-1 place-items-center rounded-full border border-white/10 bg-white/10 text-sm font-bold"
		>
			Save Contact
		</a> -->
		<button
			onclick={() => (isFormOpen = !isFormOpen)}
			class="grid flex-1 place-items-center rounded-full border border-white/10 bg-white/10 text-sm font-bold"
		>
			Exchange Contact
		</button>
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
		class="fixed inset-0 top-auto -mb-[1px] h-[calc(100dvh-3.5rem)] w-full scale-[1.005] rounded-t-xl border border-white/10 bg-[#121212] transition duration-[750ms] sm:mx-auto sm:max-w-[26rem] {isFormOpen
			? 'translate-y-0'
			: 'translate-y-full'}"
	>
		<div class="flex h-full flex-col">
			<!-- <button
				onclick={() => (isFormOpen = false)}
				class="absolute right-4 top-4 grid aspect-square w-8 place-items-center rounded-full border border-white/10 bg-white/10 transition duration-[750ms] {isFormOpen
					? 'opacity-100'
					: 'opacity-0'}"
			>
				<div class="aspect-square w-[0.62rem]">
					<Close />
				</div>
			</button> -->
			<div
				class="flex items-center justify-center border-b border-white/10 py-6 text-center text-sm font-bold transition duration-[750ms] {isFormOpen
					? 'opacity-100'
					: 'opacity-0'}"
			>
				Exchange Contact
			</div>
			{#if isSuccess}
				<div class="flex flex-1 flex-col items-center justify-center gap-6">
					<div class="text-sm font-bold leading-none tracking-[0.1rem]">You're all set!</div>
					<p
						class="mx-auto max-w-[16rem] text-center text-xs font-light leading-[1.5] tracking-[0.1rem]"
					>
						Tap below to save {data.person.name}'s contact directly to your phone.
					</p>
				</div>
			{:else}
				<div class="hide-scrollbar flex-1 overflow-y-scroll">
					<div
						class="mx-auto max-w-[13rem] pt-8 text-center text-sm font-light leading-normal sm:max-w-[18rem]"
					>
						Share your information to receive this contact and stay connected.
					</div>
					<form
						use:enhance={submit}
						id="form"
						method="POST"
						autocomplete="off"
						class="flex flex-col gap-7 px-5 py-9"
					>
						<label class="flex flex-col gap-3 text-xs font-light tracking-[0.1rem]">
							Your Name
							<input
								name="name"
								type="text"
								autocomplete="off"
								required
								bind:value={formData.name}
								class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-white/20 hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
							/>
						</label>
						<label class="flex flex-col gap-3 text-xs font-light tracking-[0.1rem]">
							Phone Number
							<input
								name="phone"
								type="phone"
								autocomplete="off"
								required
								bind:value={formData.phone}
								class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-white/20 hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
							/>
						</label>
						<label class="flex flex-col gap-3 text-xs font-light tracking-[0.1rem]">
							Email Address (Optional)
							<input
								name="email"
								type="email"
								autocomplete="off"
								class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-white/20 hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
							/>
						</label>

						<label class="flex flex-col gap-3 text-xs font-light tracking-[0.1rem]">
							Company / Role (Optional)
							<input
								name="company"
								type="text"
								autocomplete="off"
								placeholder="eg. Designer at La Persona"
								class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent px-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-white/20 hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:px-6"
							/>
						</label>
						<input type="hidden" name="ownerEmail" value={data.person.email} />
					</form>
				</div>
			{/if}
			<div
				class="flex flex-col items-center justify-center gap-6 border-t border-white/10 px-5 py-8"
			>
				{#if isSuccess}
					<a
						href={data.person.vcf}
						download="{data.person.id}.vcf"
						class="w-full rounded-full border border-white/10 bg-white py-4 text-center text-xs font-bold leading-[1] tracking-[0.1rem] text-dark transition-all duration-500 disabled:bg-white/10 disabled:text-white/20"
					>
						Save Contact
					</a>
				{:else}
					<button
						type="submit"
						form="form"
						disabled={!isValid}
						class="w-full rounded-full border border-white/10 bg-white py-4 text-xs font-bold leading-[1] tracking-[0.1rem] text-dark transition-all duration-500 disabled:bg-white/10 disabled:text-white/20"
					>
						{isSubmitting ? 'Please wait...' : 'Exchange Contact'}
					</button>
				{/if}
				{#if error}
					<div class="flex cursor-pointer items-start gap-3 sm:gap-6">
						<span
							class="text-center text-xs font-light leading-normal tracking-[0.1rem] text-red-600 sm:text-sm"
						>
							{error}
						</span>
					</div>
				{/if}
				<button
					onclick={() => {
						isFormOpen = false;
						setTimeout(() => {
							isSuccess = false;
							error = '';
							formData = {
								name: '',
								phone: ''
							};
						}, 750);
					}}
					class="text-xs font-bold leading-[1] tracking-[0.1rem] underline underline-offset-4"
				>
					Exit
				</button>
			</div>
		</div>
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
			<div class="hide-scrollbar mt-8 flex justify-center gap-3 overflow-x-scroll px-5">
				{#each data.person.links as link, index}
					{@const isImage = link.icon.includes('.')}
					{#if isImage}
						<a
							href={link.href}
							target="_blank"
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
							target="_blank"
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
