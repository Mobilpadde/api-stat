<script>
	import { page } from '$app/stores';
	import axios from 'axios';

	import Stats from '../../components/Stats.svelte';
	import Button from '../../components/Button.svelte';

	const { slug } = $page.params;
	$: messages = [];

	const resp = (msg) => {
		messages = [msg, ...(messages || [])];

		setTimeout(() => {
			messages = messages.map((x) => (msg.id === x.id ? { ...x, loading: false } : x));
		}, 1000);
	};

	const request = (method, status = '') => {
		axios({
			method,
			url: `/stats/api/${slug}.json`,
			data: { status }
		})
			.then(({ data }) => resp(data))
			.catch(console.error);
	};
</script>

<div class="mx-4 my-4">
	<Stats bind:messages />
</div>

<div class="flex flex-col justify-between sm:flex-row">
	<div class="flex flex-col flex-1 mx-4">
		<Button click={() => request('get')}>get random</Button>
	</div>
	<div class="flex flex-col flex-1 mx-4">
		<Button click={() => request('post', 201)} green>post 201</Button>
		<Button click={() => request('post', 302)} yellow>post 302</Button>
		<Button click={() => request('post', 403)} red>post 403</Button>
		<Button click={() => request('post', 504)} red>post 504</Button>
	</div>
	<div class="flex flex-col flex-1 mx-4">
		<Button click={() => request('put', 201)} green>put 201</Button>
		<Button click={() => request('put', 302)} yellow>put 302</Button>
		<Button click={() => request('put', 403)} red>put 403</Button>
		<Button click={() => request('put', 504)} red>put 504</Button>
	</div>
	<div class="flex flex-col flex-1 mx-4">
		<Button click={() => request('delete', 201)} green>delete 201</Button>
		<Button click={() => request('delete', 302)} yellow>delete 302</Button>
		<Button click={() => request('delete', 403)} red>delete 403</Button>
		<Button click={() => request('delete', 504)} red>delete 504</Button>
	</div>
	<div class="flex flex-col flex-1 mx-4">
		<Button click={() => request('patch', 201)} green>patch 201</Button>
		<Button click={() => request('patch', 302)} yellow>patch 302</Button>
		<Button click={() => request('patch', 403)} red>patch 403</Button>
		<Button click={() => request('patch', 504)} red>patch 504</Button>
	</div>
</div>
