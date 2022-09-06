export const BASIC: Array<number> = [730, 1260, 6060];
export const ELECRATE: Array<number> = [78.2, 147.2, 215.5];

export const NUGIN_STEP: { summer: Array<number>; other: Array<number> } = {
  summer: [0, 300, 450],
  other: [0, 200, 400],
};
export const NUGIN_ERR: { summer: Array<number>; other: Array<number> } = {
  summer: [300, 150, Infinity],
  other: [200, 200, Infinity],
};
