<script>
	let { data } = $props();
</script>

<div class="relative z-10 h-[100svh] w-screen">
	<!-- Spline Scene -->
	<iframe
		title="Spline Scene"
		src={data.person.spline}
		class="absolute left-0 top-0 z-0 h-full w-full"
		frameborder="0"
		allow="autoplay"
	></iframe>
	<!-- Contents -->
	<div class="absolute bottom-8 left-0 flex w-full flex-row justify-center gap-2 px-4">
		<!-- Phone -->
		<a aria-label="phone" href="tel:{data.person.phone}">
			<div
				class="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-900 active:border-neutral-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#e8eaed"
					><path
						d="M777.61-140q-113.07 0-227.19-52.58-114.11-52.58-209.88-148.34-95.38-95.77-147.96-209.7Q140-664.54 140-777.61q0-18 12-30.2Q164-820 182-820h130.46q15.15 0 26.73 9.89 11.58 9.88 14.73 24.42L376.85-668q2.38 16.38-1 28.15-3.39 11.77-12.16 19.77l-92.38 89.93q22.3 40.84 50.96 77.27 28.65 36.42 62.04 69.57 32.92 32.93 70 61.16 37.08 28.23 80.08 52.54l89.76-90.54q9.39-9.77 22.74-13.7 13.34-3.92 27.73-1.92l111.07 22.62q15.15 4 24.73 15.46t9.58 26V-182q0 18-12.19 30-12.2 12-30.2 12Z"
					/></svg
				>
			</div>
		</a>
		<!-- Website -->
		<a aria-label="website" href={data.person.website}>
			<div
				class="flex h-16 w-16 items-center justify-center rounded-full border border-neutral-900 active:border-neutral-100"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					height="24px"
					viewBox="0 -960 960 960"
					width="24px"
					fill="#e8eaed"
					><path
						d="M480-100q-78.15 0-147.5-29.96t-120.96-81.58q-51.62-51.61-81.58-120.96T100-480q0-78.77 29.96-147.81t81.58-120.65q51.61-51.62 120.96-81.58T480-860q78.77 0 147.81 29.96t120.65 81.58q51.62 51.61 81.58 120.65T860-480q0 78.15-29.96 147.5t-81.58 120.96q-51.61 51.62-120.65 81.58T480-100Zm0-60.85q30.62-40.61 51.54-81.92 20.92-41.31 34.08-90.31H394.38q13.93 50.54 34.47 91.85 20.53 41.31 51.15 80.38Zm-77.46-11q-23-33-41.31-75.03-18.31-42.04-28.46-86.2H197.08q31.69 62.31 85 104.7 53.31 42.38 120.46 56.53Zm154.92 0q67.15-14.15 120.46-56.53 53.31-42.39 85-104.7H627.23q-12.08 44.54-30.39 86.58-18.3 42.04-39.38 74.65ZM171.92-393.08h148.7q-3.77-22.3-5.47-43.73-1.69-21.42-1.69-43.19 0-21.77 1.69-43.19 1.7-21.43 5.47-43.73h-148.7q-5.77 20.38-8.84 42.38-3.08 22-3.08 44.54t3.08 44.54q3.07 22 8.84 42.38Zm208.69 0h198.78q3.76-22.3 5.46-43.34 1.69-21.04 1.69-43.58t-1.69-43.58q-1.7-21.04-5.46-43.34H380.61q-3.76 22.3-5.46 43.34-1.69 21.04-1.69 43.58t1.69 43.58q1.7 21.04 5.46 43.34Zm258.77 0h148.7q5.77-20.38 8.84-42.38 3.08-22 3.08-44.54t-3.08-44.54q-3.07-22-8.84-42.38h-148.7q3.77 22.3 5.47 43.73 1.69 21.42 1.69 43.19 0 21.77-1.69 43.19-1.7 21.43-5.47 43.73Zm-12.15-233.84h135.69Q730.85-690 678.5-731.62q-52.35-41.61-121.04-56.92 23 34.92 40.92 76.39 17.93 41.46 28.85 85.23Zm-232.85 0h171.24q-13.93-50.16-35.04-92.43-21.12-42.27-50.58-79.8-29.46 37.53-50.58 79.8-21.11 42.27-35.04 92.43Zm-197.3 0h135.69q10.92-43.77 28.85-85.23 17.92-41.47 40.92-76.39-69.08 15.31-121.23 57.12-52.16 41.8-84.23 104.5Z"
					/>
				</svg>
			</div>
		</a>
		<!-- Save Contact -->
		<a
			href={data.person.vcf}
			download="{data.person.id}.vcf"
			class="text-md flex flex-grow items-center justify-center rounded-full bg-neutral-900 px-3 py-2 text-center font-light text-white active:bg-neutral-100 active:text-black sm:hidden"
		>
			Save Contact
		</a>
	</div>
</div>
