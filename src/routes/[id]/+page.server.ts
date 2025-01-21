import { error } from '@sveltejs/kit';
import data from '$lib/data';

export function load({ params }) {
	const person = data.find((person) => person.id === params.id);

	if (!person) error(404);

	return { person };
}
