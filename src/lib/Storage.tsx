import { createStore, reconcile } from "solid-js/store";
import { createEffect, onMount } from "solid-js";
import { isServer } from "solid-js/web";

export function createPersistentStore<T extends object>(key: string, initialData: T) {
  // 1. Initialize with initialData to satisfy the Server
  const [store, setStore] = createStore<T>(initialData);

  // 2. On Mount (Client only), pull from localStorage
  onMount(() => {
    const saved = localStorage.getItem(key);
    if (saved) {
      try {
        setStore(reconcile(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse storage", e);
      }
    }
  });

  // 3. Save to localStorage whenever it changes (only runs on Client)
  createEffect(() => {
    if (!isServer) {
      localStorage.setItem(key, JSON.stringify(store));
    }
  });

  return [store, setStore] as const;
}