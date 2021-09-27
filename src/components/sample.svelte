<script>
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { flip } from 'svelte/animate';
	import { nanoid } from 'nanoid';

	const colors = {
		200: 'green',
		302: 'yellow',
		503: 'red'
	};
	const methods = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'];
	const paths = ['/user/{username}', '/jwt/refresh', '/api/orders', '/embed'];

	const generate = () => {
		let keys = Object.keys(colors);
		let n = keys.length;

		n = ~~(Math.random() * n);
		const code = keys[n];
		const color = colors[code];

		n = methods.length;
		n = ~~(Math.random() * n);
		const method = methods[n];

		n = paths.length;
		n = ~~(Math.random() * n);
		const path = paths[n];

		const id = nanoid();
		return {
			id,
			color,
			code,
			method,
			path,
			loading: true
		};
	};

	const generateProcess = () => {
		messages = [generate(), ...messages.slice(0, messages.length - 1)];

		setTimeout(loadProcess, ~~(Math.random() * 2500) + 500);
		setTimeout(generateProcess, ~~(Math.random() * 5000) + 500);
	};

	const loadProcess = () => {
		messages = [...messages].map((x) => ({ ...x, loading: false }));
	};

	$: messages = new Array(7).fill({}).map(() => {
		const g = generate();
		return { ...g, loading: false };
	});

	onMount(generateProcess);
</script>

<div class="bg-gray-50 filter drop-shadow w-full h-full rounded-lg overflow-hidden">
	<ul>
		<li class="flex flex-row font-bold text-lg py-4 border-b bg-gray-100 border-gray-200 shadow-sm">
			<span class="block w-2/10" />
			<span class="block w-2/10">Code</span>
			<span class="block w-2/10">Method</span>
			<span class="block w-4/10">Path</span>
		</li>
		{#each messages as msg (msg.id)}
			<li
				class="flex flex-row py-4"
				in:fade={{ key: msg.id, duration: 750 }}
				out:fade={{ key: msg.id, duration: 250 }}
				animate:flip>
				<span class="block w-2/10 text-center">
					<span
						class="inline-block w-3 h-3 rounded-full {msg.loading ? 'bg-gray-500' : `${msg.color === 'green' && 'bg-green-500'}
						${msg.color === 'yellow' && 'bg-yellow-500'}
						${msg.color === 'red' && 'bg-red-500'}`} transition duration-500 ease-in-out" />
				</span>
				<span
					class="block w-2/10 {msg.loading ? 'text-gray-500' : `${msg.color === 'green' && 'text-green-500'}
                    ${msg.color === 'yellow' && 'text-yellow-500'}
                    ${msg.color === 'red' && 'text-red-500'}`} transition duration-500 ease-in-out">
					{msg.loading ? 'XXX' : msg.code}
				</span>
				<span class="block w-2/10">{msg.method}</span>
				<span class="block w-4/10">{msg.path}</span>
			</li>
		{/each}
	</ul>
</div>
