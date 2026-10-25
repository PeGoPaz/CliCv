/**
 * Tab completion the way a shell does it: one match completes, several extend
 * the input to what they have in common and, when that adds nothing, are
 * listed so the user can see the choices.
 */
export interface Completion {
  value: string;
  /** Set when the matches should be shown: more than one, and no progress made. */
  candidates?: string[];
}

export function complete(input: string, commands: readonly string[]): Completion {
  const typed = input.trimStart().toLowerCase();
  // Only the command itself is completed, not its arguments ("theme dra").
  if (!typed || /\s/.test(typed)) return { value: input };

  const matches = commands.filter((c) => c.startsWith(typed));
  if (matches.length === 0) return { value: input };
  if (matches.length === 1) return { value: matches[0] };

  let common = matches[0];
  for (const m of matches) {
    while (!m.startsWith(common)) common = common.slice(0, -1);
  }
  if (common.length > typed.length) return { value: common };
  return { value: input, candidates: [...matches].sort() };
}
