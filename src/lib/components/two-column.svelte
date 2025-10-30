<script lang="ts">
	export let isReversed = false;
</script>

<div class="flex flex-col {isReversed ? 'sm:flex-row-reverse' : 'sm:flex-row'}">
	<div class="aspect-[1/0.75] sm:w-1/2">
		<img src="/images/placeholder.png" alt="" class="h-full w-full object-cover" />
	</div>
	<div class="flex flex-col justify-center sm:w-1/2 sm:pl-[11.7rem]">
		<h3
			class="mb-2 mt-5 text-base font-light uppercase leading-[1.5] tracking-[0.2rem] sm:mb-10 sm:mt-0 sm:text-[2rem] sm:tracking-[0.3rem]"
		>
			Discover
		</h3>
		<p class="max-w-[16rem] text-sm font-light leading-normal">
			Schedule a meeting with us and discuss the possibilities.
		</p>
	</div>
</div>
