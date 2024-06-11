import { persisted } from 'svelte-persisted-store';

// https://github.com/joshnuss/svelte-persisted-store
export const currentChatId = persisted('currentChat', '');
export const enabledModels = persisted(
	'enabledModels',
	{},
	{
		beforeWrite: (value) => Object.fromEntries(Object.entries(value).filter(([, value]) => value))
	}
);
export const messagesCache = persisted('messages', []);
export const settings = persisted('uiSettings', {
	darkMode: true,
	sidebarOpen: false,
	rotate1: false,
	rotate2: false,
	queries: 1,
	collapse: true
});
