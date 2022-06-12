import Variants from '../interfaces/Variants';

// Input
export default interface Options {
    about: {
        source: string;
        title: string;
    };
    axis: {
        labelX: string;
        labelY: string;
    };
    svg: {
        height: string | number;
        left: string;
        viewBox: { x: string; y: string };
        width: string | number;
    };
    stroke: {
        width: number;
        color: string;
    };
    theme: {
        areaBg: string;
        chartBg: string;
        legend: boolean;
        minValues: number;
        round: boolean;
        shades: Array<string>;
        ui: {
            bg: string;
            color: string;
        };
        topSpace: number;
        median: boolean;
    };
    variant: Variants;
}
