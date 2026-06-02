import "./style.css";
import { filterByRequired } from "./finder";
import type { WorkerResponse } from "./finder.worker";

const lettersInput = document.querySelector<HTMLInputElement>("#letters")!;
const requiredInput = document.querySelector<HTMLInputElement>("#required")!;
const statusEl = document.querySelector<HTMLParagraphElement>("#status")!;
const resultsEl = document.querySelector<HTMLUListElement>("#results")!;

const worker = new Worker(new URL("./finder.worker.ts", import.meta.url), {
  type: "module",
});

// All words the worker found for the current letters, before the optional
// "required letters" filter is applied.
let matches: string[] = [];
let dictionarySize = 0;

worker.onmessage = (event: MessageEvent<WorkerResponse>) => {
  const message = event.data;

  if (message.type === "ready") {
    dictionarySize = message.total;
    lettersInput.disabled = false;
    requiredInput.disabled = false;
    lettersInput.focus();
    setStatus(`${formatNumber(dictionarySize)} words in the dictionary.`);
    return;
  }

  // Ignore stale results if the input changed while the worker was busy.
  if (message.letters !== lettersInput.value.trim().toLowerCase()) return;

  matches = message.words;
  render();
};

lettersInput.addEventListener("input", () => {
  worker.postMessage(lettersInput.value.trim().toLowerCase());
});

requiredInput.addEventListener("input", render);

function render(): void {
  const words = filterByRequired(matches, requiredInput.value);

  resultsEl.replaceChildren();

  if (lettersInput.value.trim() === "") {
    setStatus(`${formatNumber(dictionarySize)} words in the dictionary.`);
    return;
  }

  setStatus(
    words.length === 0
      ? "No words found."
      : `${formatNumber(words.length)} word${words.length === 1 ? "" : "s"} found.`,
  );

  const fragment = document.createDocumentFragment();
  for (const word of words) {
    const item = document.createElement("li");
    item.textContent = word;
    fragment.append(item);
  }
  resultsEl.append(fragment);
}

function setStatus(text: string): void {
  statusEl.textContent = text;
}

function formatNumber(value: number): string {
  return value.toLocaleString("en-US");
}
