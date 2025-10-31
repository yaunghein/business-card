<script lang="ts">
	let { text } = $props();
</script>

<div
	class="relative w-full overflow-hidden leading-[0.8] tracking-[0.1rem] opacity-90 transition-all duration-500 group-hover:opacity-100"
>
	<span class="sr-only">{text}</span>

	<div
		class="relative text-center !font-normal uppercase !text-inherit transition-all duration-500 group-hover:-translate-y-[100%]"
		aria-hidden="true"
	>
		{text}
	</div>
	<div
		class="absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-center !font-normal uppercase !text-inherit transition-all duration-500 group-hover:-translate-y-[100%]"
		aria-hidden="true"
	>
		{text}
	</div>
</div>
