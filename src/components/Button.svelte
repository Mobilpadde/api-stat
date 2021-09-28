<script>
	export let click = () => {};

	export let green = false;
	export let yellow = false;
	export let red = false;
</script>

<button
	on:click|preventDefault={click}
	class="w-full border-gray-50 h-10 my-2 uppercase rounded border-solid border-4 {green && 'bg-green-500'}
	{yellow && 'bg-yellow-500'}
	{red && 'bg-red-500'}
	{!green && !yellow && !red && 'bg-gray-50'}">
	<slot />
</button>
