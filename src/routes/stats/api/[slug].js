import { nanoid } from 'nanoid';

const fn = (method, path, code) => {
	const id = nanoid(42);
	const colors = {
		201: 'green',
		302: 'yellow',
		403: 'red',
		504: 'red'
	};

	if (!code) {
		let keys = Object.keys(colors);
		let n = keys.length;
		n = ~~(Math.random() * n);
		code = keys[n];
	}

	return {
		body: {
			id,
			code,
			color: colors[code],
			method,
			path,
			loading: true
		}
	};
};

export async function get({ method, path, body }) {
	return fn(method, path, body?.status);
}

export async function post({ method, path, body }) {
	return fn(method, path, body?.status);
}

export async function put({ method, path, body }) {
	return fn(method, path, body?.status);
}

export async function del({ method, path, body }) {
	return fn(method, path, body?.status);
}

export async function patch({ method, path, body }) {
	return fn(method, path, body?.status);
}
