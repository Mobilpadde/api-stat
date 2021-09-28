<script>
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';

    export let messages = [];
</script>

<div
    class="w-full overflow-hidden rounded-lg bg-gray-50 filter drop-shadow
    max-h-100 min-h-100"
>
    <ul>
        <li
            class="flex flex-row py-4 text-lg font-bold bg-gray-100 border-b
            border-gray-200 shadow-sm"
        >
            <span class="block w-1/8 sm:w-2/10"></span>
            <span class="block w-2/8 sm:w-2/10">Code</span>
            <span class="block w-2/8 sm:w-2/10">Method</span>
            <span class="block w-4/8 sm:w-4/10">Path</span>
        </li>

        {#each messages as msg (msg.id)}
            <li
                class="flex flex-row py-4 h-12 overflow-hidden"
                in:fade="{{ key: msg.id, duration: 750 }}"
                out:fade="{{ key: msg.id, duration: 250 }}"
                animate:flip
            >
                <span class="block text-center w-1/8 sm:w-2/10">
                    <span
                        class="inline-block w-3 h-3 rounded-full {msg.loading ? 'bg-gray-500' : `${msg.color === 'green' && 'bg-green-500'}
						${msg.color === 'yellow' && 'bg-yellow-500'}
						${msg.color === 'red' && 'bg-red-500'}`} transition duration-500 ease-in-out"
                    ></span>
                </span>
                <span
                    class="block w-2/8 sm:w-2/10 {msg.loading ? 'text-gray-500' : `${msg.color === 'green' && 'text-green-500'}
                    ${msg.color === 'yellow' && 'text-yellow-500'}
                    ${msg.color === 'red' && 'text-red-500'}`} transition
                    duration-500 ease-in-out"
                >
                    {msg.loading ? 'XXX' : msg.code}
                </span>
                <span class="block w-2/8 sm:w-2/10">{msg.method}</span>
                <span class="block w-4/8 sm:w-4/10">{msg.path}</span>
            </li>
        {/each}
    </ul>
</div>
