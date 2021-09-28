<script>
	import { generateId } from 'zoo-ids';

	import Sample from '../components/Sample.svelte';

	const id = generateId(null, {
		caseStyle: 'lowercase',
		numAdjectives: 3,
		delimiter: '-'
	});
</script>

<div class="my-8">
	<Sample />
</div>

<a href={`/stats/${id}`}>
	<button
		class="w-full h-10 my-2 uppercase border-4 border-solid rounded border-gray-50 bg-gray-50">
		Get it!
	</button>
</a>
