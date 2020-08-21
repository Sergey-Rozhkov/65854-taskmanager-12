export const COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
export const TASK_COUNT = 22;
export const TASK_COUNT_PER_STEP = 8;
export const BLANK_TASK = {
  color: COLORS[0],
  description: ``,
  dueDate: null,
  repeating: {
    mo: false,
    tu: false,
    we: false,
    th: false,
    fr: false,
    sa: false,
    su: false
  },
  isArchive: false,
  isFavorite: false
};
