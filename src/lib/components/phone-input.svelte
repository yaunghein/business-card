<script lang="ts">
	import { fly } from 'svelte/transition';
	import { countries } from 'country-codes-flags-phone-codes';
	import clickOutside from '$lib/utils/click-outside';

	let { phone = $bindable('') } = $props();

	let dialCode = $state(countries.find((c) => c.code === 'TH')?.dialCode);
	let search = $state('');
	let searchFocus = $state(false);
	let filteredCountries = $derived(
		search
			? countries.filter(
					(c) =>
						c.name.toLowerCase().includes(search.toLowerCase()) ||
						c.code.toLowerCase().includes(search.toLowerCase())
				)
			: countries
	);
	let open = $state(false);

	$effect(() => {
		if (!open) {
			search = '';
		}
	});
</script>

<label
	use:clickOutside={() => (open = false)}
	class="flex flex-col gap-3 text-xs font-light tracking-[0.1rem]"
	for="phone"
>
	Phone Number
	<div class="relative">
		<!-- Power Search Start -->
		<button
			type="button"
			onclick={() => (open = !open)}
			class="absolute left-0 top-0 aspect-square w-[2.8rem] sm:w-[3.13rem]"
		>
			<span class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">{dialCode}</span>
			<div class="absolute right-0 top-1/2 h-4/5 w-[1px] -translate-y-1/2 bg-white/10"></div>
		</button>

		{#if open}
			<div
				transition:fly={{ y: '10%', opacity: 0, duration: 400 }}
				class="absolute left-0 top-[calc(3.13rem+0.5rem)] w-full border border-white/10 bg-dark"
			>
				<div class="relative">
					<input
						type="text"
						bind:value={search}
						onfocus={() => (searchFocus = true)}
						onblur={() => (searchFocus = false)}
						placeholder="Search Countries"
						class="h-[2.8rem] w-full appearance-none border-b border-white/10 bg-transparent px-4 pl-10 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-white/20 focus:outline-none sm:h-[3.13rem] sm:px-6 sm:pl-10"
					/>
					<div
						class="absolute left-3 top-1/2 aspect-square size-5 -translate-y-1/2 transition duration-300 {searchFocus
							? 'text-white'
							: 'text-white/10'}"
					>
						<svg
							width="100%"
							height="100%"
							viewBox="0 0 24 24"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M16.3099 15.5612L20.4239 19.6762L19.5759 20.5242L15.4529 16.4012C14.0607 17.5492 12.2789 18.1152 10.4793 17.9811C8.67978 17.847 7.00154 17.0232 5.79484 15.6814C4.58814 14.3397 3.9462 12.5838 4.00298 10.7802C4.05977 8.97658 4.81089 7.26455 6.0996 6.00141C7.38831 4.73826 9.11504 4.02159 10.9195 4.00095C12.7239 3.98031 14.4665 4.6573 15.7838 5.89064C17.1011 7.12397 17.8912 8.81837 17.9892 10.6202C18.0872 12.4221 17.4856 14.1922 16.3099 15.5612ZM16.7999 11.0002C16.7999 9.46192 16.1888 7.98666 15.1011 6.89895C14.0134 5.81124 12.5382 5.20017 10.9999 5.20017C9.46164 5.20017 7.98639 5.81124 6.89868 6.89895C5.81097 7.98666 5.1999 9.46192 5.1999 11.0002C5.1999 12.5384 5.81097 14.0137 6.89868 15.1014C7.98639 16.1891 9.46164 16.8002 10.9999 16.8002C12.5382 16.8002 14.0134 16.1891 15.1011 15.1014C16.1888 14.0137 16.7999 12.5384 16.7999 11.0002Z"
								fill="currentColor"
							/>
						</svg>
					</div>
				</div>

				<div
					class="hide-scrollbar flex max-h-[10rem] flex-col items-start gap-4 overflow-scroll p-4 sm:max-h-[12.25rem]"
				>
					{#if filteredCountries.length}
						{#each filteredCountries as country (country.code)}
							<button
								type="button"
								onclick={() => {
									dialCode = country.dialCode;
									console.log(country.dialCode);
									open = false;
								}}
								class="w-full text-left"
							>
								<span>{country.flag}</span>
								<span>{country.name}</span>
							</button>
						{/each}
					{:else}
						<span>No country found.</span>
					{/if}
				</div>
			</div>
		{/if}
		<!-- Power Search End -->
		<input
			name="phone"
			id="phone"
			type="phone"
			autocomplete="off"
			required
			bind:value={phone}
			onfocus={() => (open = false)}
			class="h-[2.8rem] w-full appearance-none border border-white/10 bg-transparent pl-[3.75rem] pr-4 text-sm font-light tracking-[0.1rem] transition duration-500 placeholder:text-xs placeholder:tracking-[0.1rem] placeholder:text-white/20 hover:border-white/20 focus:border-white/50 focus:outline-none sm:h-[3.13rem] sm:pl-[4.5rem] sm:pr-6"
		/>
		<input type="hidden" name="dialCode" value={dialCode} />
	</div>
</label>
