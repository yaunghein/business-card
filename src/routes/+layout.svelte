<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>La Persona</title>

	<link rel="apple-touch-icon" sizes="57x57" href="favicons/apple-icon-57x57.png" />
	<link rel="apple-touch-icon" sizes="60x60" href="favicons/apple-icon-60x60.png" />
	<link rel="apple-touch-icon" sizes="72x72" href="favicons/apple-icon-72x72.png" />
	<link rel="apple-touch-icon" sizes="76x76" href="favicons/apple-icon-76x76.png" />
	<link rel="apple-touch-icon" sizes="114x114" href="favicons/apple-icon-114x114.png" />
	<link rel="apple-touch-icon" sizes="120x120" href="favicons/apple-icon-120x120.png" />
	<link rel="apple-touch-icon" sizes="144x144" href="favicons/apple-icon-144x144.png" />
	<link rel="apple-touch-icon" sizes="152x152" href="favicons/apple-icon-152x152.png" />
	<link rel="apple-touch-icon" sizes="180x180" href="favicons/apple-icon-180x180.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="favicons/android-icon-192x192.png" />
	<link rel="icon" type="image/png" sizes="32x32" href="favicons/favicon-32x32.png" />
	<link rel="icon" type="image/png" sizes="96x96" href="favicons/favicon-96x96.png" />
	<link rel="icon" type="image/png" sizes="16x16" href="favicons/favicon-16x16.png" />
	<link rel="manifest" href="favicons/manifest.json" />
	<meta name="msapplication-TileColor" content="#121212" />
	<meta name="msapplication-TileImage" content="favicons/ms-icon-144x144.png" />
	<meta name="theme-color" content="#121212" />

	<!-- Open Graph -->
	<meta property="og:type" content="website" />
	<meta property="og:title" content="La Persona" />
	<!-- <meta
		property="og:description"
		content="La Persona is a platform that allows you to create and share your digital business card with your friends and family."
	/> -->
	<meta property="og:url" content="https://imgsrc.io/guides/open-graph-meta-tags" />

	<meta property="og:image" content="/og.png" />
	<meta property="og:image:width" content="1050" />
	<meta property="og:image:height" content="600" />

	<!-- Twitter/X -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="La Persona" />
	<!-- <meta
		name="twitter:description"
		content="La Persona is a platform that allows you to create and share your digital business card with your friends and family."
	/> -->
	<meta name="twitter:image" content="/og.png" />
	<meta name="twitter:image:width" content="1050" />
	<meta name="twitter:image:height" content="600" />
</svelte:head>

{@render children()}
