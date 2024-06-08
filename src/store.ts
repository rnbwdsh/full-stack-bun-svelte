import {persisted} from 'svelte-persisted-store';

// https://github.com/joshnuss/svelte-persisted-store
export const currentChat = persisted('currentChat', "");
export const enabledModels = persisted('enabledModels', {}, {
    beforeWrite: (value) => Object.fromEntries(Object.entries(value).filter(([, value]) => value))
});
export const sidebarOpen = persisted('sideBarOpen', false);
export const darkMode = persisted('darkMode', false);