/// <reference lib="webworker" />
import { findWords, parseDictionary } from "./finder";

/** Messages the worker sends back to the page. */
export type WorkerResponse =
  | { type: "ready"; total: number }
  | { type: "result"; letters: string; words: string[] };

let dictionary: string[] = [];

// Load the dictionary once when the worker starts. The input on the page stays
// disabled until we post the "ready" message back.
async function loadDictionary(): Promise<void> {
  const response = await fetch(`${import.meta.env.BASE_URL}en.txt`);
  const text = await response.text();
  dictionary = parseDictionary(text);
  post({ type: "ready", total: dictionary.length });
}

self.onmessage = (event: MessageEvent<string>) => {
  const letters = event.data;
  post({ type: "result", letters, words: findWords(dictionary, letters) });
};

function post(message: WorkerResponse): void {
  (self as DedicatedWorkerGlobalScope).postMessage(message);
}

void loadDictionary();
