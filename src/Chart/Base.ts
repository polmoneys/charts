import Options from './interfaces/Options';
import Computed from './interfaces/Computed';
import Values, { Value, Series } from './interfaces/Values';
import Charts from './interfaces/Charts';
import { initialComputed } from './initial';
import { roundTo } from './utils';

export default class Base {
    computed: Computed;
    #options: Options;
    accessibility: any;
    datum: Values;

    constructor(datum: Values, options: Options) {
        this.datum = [];
        this.computed = initialComputed;
        this.#options = options;
        this.accessibility = { title: '' };
        this.init(datum);
    }

    get chart() {
        const { height, stroke, origin, spacing, values, width, area, min, max } = this.computed;
        const {
            chart: { shades, bg },
        } = this.#options;
        return {
            values,
            height,
            stroke,
            origin,
            spacing,
            width,
            shades,
            area,
            min,
            max,
            bg,
        } as Charts;
    }
    get chartMedian() {
        const { height, stroke, origin, spacing, median, width, values } = this.computed;
        return {
            height,
            stroke,
            origin,
            spacing,
            median,
            width,
            values,
        };
    }

    get svgProps() {
        const {
            svg: { viewBox, height, width },
            chart: { bg, border },
        } = this.#options;
        return {
            'aria-label': this.accessibility.title,
            style: {
                backgroundColor: bg,
                overflow: 'visible',
                border,
            },
            viewBox: `${viewBox.x} ${viewBox.y} ${width} ${height}`,
            width: '100%',
            height,
        };
    }

    init(datum: Values) {
        this.datum = datum;
        const {
            stroke,
            chart: {
                area,
                shades: [colorStart, colorEnd],
            },
            svg,
            variant,
        } = this.#options;
        const isSeries = variant === 'series';
        const isPie = variant === 'pie';

        const min = isSeries ? this.min(datum.flat()) : this.min(datum);
        const max = isSeries ? this.max(datum.flat()) : this.max(datum);
        const spacing = this.step(isSeries);
        let median = 0;
        let total = 0;

        let values: Values = [];
        if (isSeries) {
            values = (datum as Series).map((nestedDatum: Array<Value>) => {
                const subDatum = nestedDatum.map((data: Value, index: number) => ({
                    ...data,
                    raw: data.value,
                    value: this.peak(data.value as number, min, max),
                    color: this.shade(index, colorStart, colorEnd),
                }));
                return subDatum;
            });
            this.accessibility = { ...this.createAccessibleText(values as Series, true) };
        }

        const origin = this.origin(spacing);

        if (!isSeries) {
            total = (datum as Array<Value>).map((d) => d.value).reduce((previousValue: number, nextValue: number) => previousValue + nextValue, 0);
            values = (datum as Array<Value>).map((data: Value, index: number) => ({
                ...data,
                raw: data.value,
                ...(isPie && { percent: roundTo((data.value / total) * 100, 0) / 100 }),
                value: isPie ? roundTo((data.value / total) * 100, 0) / 100 : this.peak(data.value as number, min, max),
                color: this.shade((index * (isPie ? 33 : 14)) / 100, colorStart, colorEnd),
            }));
            median = this.median(values);
            this.accessibility = { ...this.createAccessibleText(values as Array<Value>) };
        }

        this.computed = {
            ...this.computed,
            min,
            max,
            values,
            spacing,
            median,
            origin,
            height: Number(svg.height),
            width: Number(svg.width),
            stroke,
            area,
            ...(isPie && {
                total,
            }),
        };
    }

    createAccessibleText(values: Values, isSeries: boolean = false) {
        const { min, max } = this.computed;
        const { about } = this.#options;

        if (about.title) {
            this.accessibility = { title: about.title };
            return { title: about.title };
        }

        const source = about.source ? `Data source is from ${about.source}` : 'From a non specified source';
        let title = '';
        if (!isSeries) {
            const lowerLabel = (values as Array<Value>).find((v: Value) => v.raw === min)?.label;
            const peakLabel = (values as Array<Value>).find((v: Value) => v.raw === max)?.label;
            title = `${source} compares ${values.length} values. It's max value ${max} is from ${peakLabel}. The lowest value ${min}, is from ${lowerLabel}.`;
        } else {
            title = `${source} compares ${values.length} trends series consisting of ${values[0].length} values each.`;
        }
        if (about.labelX) {
            title += ` ${about.labelX} on the X axis.`;
        }
        if (about.labelY) {
            title += ` ${about.labelY} on the Y axis.`;
        }
        this.accessibility = { title };
        return { title };
    }

    scale(num: number, minAllowed: number, maxAllowed: number, min: number, max: number) {
        return ((num - minAllowed) * (max - min)) / (maxAllowed - minAllowed) + min;
    }

    peak(value: number, min: number, max: number) {
        const {
            chart: { topSpace },
            svg: { height },
        } = this.#options;

        return roundTo(this.scale(value, min, max, 0, value < topSpace ? Number(height) : Number(height) - topSpace), 0);
    }

    step(isSeries: boolean) {
        const {
            svg: { width },
        } = this.#options;
        if (isSeries) {
            const maxSeries = (this.datum as Series).reduce(
                (acc: Array<Value>, next: Array<Value>) => (acc = acc.length > next.length ? acc : next),
                []
            ).length;
            return roundTo(Number(width) / maxSeries, 0);
        }
        return roundTo(Number(width) / this.datum.length, 0);
    }

    origin(step: number) {
        const {
            variant,
            svg: { height },
        } = this.#options;
        let origin = {
            x: 0,
            y: height,
        };

        if (variant === 'area') {
            origin = {
                ...origin,
                x: step,
            };
        }

        return origin;
    }

    min(datum: Values) {
        const min = Math.min(...datum.map((i: Value) => i.value));
        this.computed = { ...this.computed, min } as Computed;
        return min;
    }

    max(datum: Values) {
        const max = Math.max(...datum.map((i: Value) => i.value));
        this.computed = { ...this.computed, max } as Computed;
        return max;
    }

    median(values: Values) {
        const sorted = (values as Array<Value>).map((d) => d.value).sort((a: any, b: any) => a - b);
        const mid = Math.floor(sorted.length / 2);
        return Math.floor(sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid]);
    }

    shade = (p: number, c0: string, c1: string) => {
        var i = parseInt,
            r = Math.round,
            P = 1 - p,
            [a, b, c, d] = c0.split(','),
            [e, f, g, h] = c1.split(','),
            x = d || h;
        d = x ? ',' + (!d ? h : !h ? d : r((parseFloat(d) * P + parseFloat(h) * p) * 1000) / 1000 + ')') : ')';
        return (
            'rgb' +
            (x ? 'a(' : '(') +
            r(i(a[3] == 'a' ? a.slice(5) : a.slice(4)) * P + i(e[3] == 'a' ? e.slice(5) : e.slice(4)) * p) +
            ',' +
            r(i(b) * P + i(f) * p) +
            ',' +
            r(i(c) * P + i(g) * p) +
            d
        );
    };
}
