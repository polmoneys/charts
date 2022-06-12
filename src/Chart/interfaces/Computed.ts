import Values from '../interfaces/Values';

// Output
export default interface Computed {
    min: number;
    max: number;
    values: Values;
    spacing: number;
    median: number;
    origin: any;
    width: string | number;
    height: string | number;
    round: boolean;
    areaBg?: string;
    stroke: {
        width: number;
        color: string;
    };
}
