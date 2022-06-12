export const roundTo = (n: number, precision: number) => Math.round(n * 10 ** precision) / 10 ** precision;

export const unwrapArray = (arg: unknown) => (Array.isArray(arg) ? arg[0] : arg);

export const colorize = (p: any, c: any) => {
    var i = parseInt,
        r = Math.round,
        [a, b, c, d] = c.split(','),
        P = p < 0,
        t = P ? 0 : 255 * p,
        // @ts-ignore
        P = P ? 1 + p : 1 - p;
    // @ts-ignore
    return 'rgb' + (d ? 'a(' : '(') + r(i(a[3] == 'a' ? a.slice(5) : a.slice(4)) * P + t) + ',' + r(i(b) * P + t) + ',' + r(i(c) * P + t) + (d ? ',' + d : ')');
};
