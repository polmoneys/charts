export const roundTo = (n: number, precision: number) => Math.round(n * 10 ** precision) / 10 ** precision;

export const unwrapArray = (arg: unknown) => (Array.isArray(arg) ? arg[0] : arg);

export const toPercent = (percent: number) => {
    const x = Math.cos(2 * Math.PI * percent);
    const y = Math.sin(2 * Math.PI * percent);
    return [x, y];
};
