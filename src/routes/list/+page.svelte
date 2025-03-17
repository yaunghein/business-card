<script>
	import data from '$lib/data';
</script>

<div class="grid gap-4 p-20">
	{#each data as item (item.id)}
		<a href="/{item.id}">{item.id}</a>
	{/each}
</div>
