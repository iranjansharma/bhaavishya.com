import type { Tone } from "@/lib/tones";

/** CBSE-style grades. Change the bands here if your board uses a different scale. */
export type Grade = "A1" | "A2" | "B1" | "B2" | "C1" | "C2" | "D" | "E";

const BANDS: ReadonlyArray<readonly [number, Grade]> = [
  [91, "A1"],
  [81, "A2"],
  [71, "B1"],
  [61, "B2"],
  [51, "C1"],
  [41, "C2"],
  [33, "D"],
];

export function gradeFor(marks: number): Grade {
  for (const [min, grade] of BANDS) {
    if (marks >= min) return grade;
  }
  return "E";
}

export function gradeTone(grade: Grade): Tone {
  if (grade.startsWith("A")) return "mint";
  if (grade.startsWith("B")) return "brand";
  if (grade.startsWith("C")) return "marigold";
  return "coral";
}

export const GRADE_ORDER: Grade[] = ["A1", "A2", "B1", "B2", "C1", "C2", "D", "E"];
