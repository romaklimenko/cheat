import { describe, expect, it } from "vitest";
import {
  canSpell,
  filterByRequired,
  findWords,
  normalize,
  parseDictionary,
} from "./finder";

describe("parseDictionary", () => {
  it("splits words on newlines and ignores blank lines", () => {
    expect(parseDictionary("aa\nbb\r\ncc\n")).toEqual(["aa", "bb", "cc"]);
  });
});

describe("canSpell", () => {
  it("returns true when the word can be spelled from the pool", () => {
    expect(canSpell("test", "aesttz")).toBe(true);
  });

  it("returns false when a letter is missing", () => {
    expect(canSpell("test", "aestz")).toBe(false);
  });

  it("consumes each letter only once", () => {
    expect(canSpell("aa", "a")).toBe(false);
    expect(canSpell("aa", "aa")).toBe(true);
  });
});

describe("findWords", () => {
  const dictionary = ["a", "at", "rat", "tar", "art", "star", "cat"];

  it("returns only spellable words", () => {
    expect(findWords(dictionary, "rats").sort()).toEqual(
      ["a", "art", "at", "rat", "star", "tar"].sort(),
    );
  });

  it("sorts by length descending, then alphabetically", () => {
    expect(findWords(dictionary, "rats")).toEqual([
      "star",
      "art",
      "rat",
      "tar",
      "at",
      "a",
    ]);
  });

  it("returns nothing for empty input", () => {
    expect(findWords(dictionary, "")).toEqual([]);
    expect(findWords(dictionary, "  ")).toEqual([]);
  });
});

describe("filterByRequired", () => {
  it("keeps words that contain every required letter", () => {
    const result = filterByRequired(["abc", "bcd", "cde", "def"], "bc");
    expect(result).toEqual(["abc", "bcd"]);
  });

  it("returns all words when no letters are required", () => {
    const words = ["abc", "bcd"];
    expect(filterByRequired(words, "")).toEqual(words);
  });
});

describe("normalize", () => {
  it("lowercases and strips non-letters", () => {
    expect(normalize("A B-c1!")).toBe("abc");
  });
});
