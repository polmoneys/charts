import Variants from '../interfaces/Variants';

export default interface Options {
    about: {
        source: string;
        title: string;
        labelX: string;
        labelY: string;
    };
    svg: {
        height: string | number;
        viewBox: { x: string; y: string };
        width: string | number;
    };
    stroke: {
        width: number;
        color: string;
        round: boolean;
    };
    chart: {
        area: string;
        bg: string;
        border: string;
        shades: Array<string>;
        topSpace: number;
    };
    ui: {
        bg: string;
        color: string;
        border: string;
    };
    median: boolean;
    variant: Variants;
}
