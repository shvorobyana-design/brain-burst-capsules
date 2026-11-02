import { describe, it, expect } from "vitest";
import { findAnswer } from "@/lib/capsuleAssistant";

const data = {
  theory: "Річка має витік і гирло. Басейн річки — територія, з якої вона збирає воду. Найдовша річка України — Дніпро.",
  keyTerms: [{ term: "Гирло", definition: "Місце впадіння річки" }],
  examples: ["Дніпро впадає в Чорне море"],
  facts: ["Ніл — одна з найдовших річок світу"],
};

describe("capsule assistant", () => {
  it("answers a free-form topic question from theory", () => {
    expect(findAnswer("яка найдовша річка України?", data, "Річки", "ua")).toContain("Дніпро");
  });
  it("matches a key term by word form", () => {
    expect(findAnswer("що таке гирло", data, "Річки", "ua")).toContain("Місце впадіння");
  });
  it("never returns empty for unknown questions", () => {
    expect(findAnswer("xyz qwerty", data, "Річки", "ua").length).toBeGreaterThan(20);
  });
});
