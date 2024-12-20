import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase();
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((_) => {
	currentUser.set(pb.authStore.model);
});
