<script>
    import { onMount } from 'svelte';
    import { fade } from 'svelte/transition';
    import { flip } from 'svelte/animate';
    import { generateId } from 'zoo-ids';

    const colors = {
        201: 'green',
        302: 'yellow',
        403: 'red',
        504: 'red',
    };
    const methods = ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'];
    const paths = new Array(6).fill('/stats/api').map(
        (x) =>
            `${x}/${generateId(null, {
                caseStyle: 'lowercase',
                numAdjectives: 3,
                delimiter: '-',
            })}.json`,
    );

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

        const id = generateId(null, {
            caseStyle: 'lowercase',
            delimiter: '-',
        });

        return {
            id,
            color,
            code,
            method,
            path,
            loading: true,
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

<div
    class="w-full overflow-hidden rounded-lg bg-gray-50 filter drop-shadow
    max-h-100"
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
