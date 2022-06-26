import Values from '../interfaces/Values';

export default interface Computed {
    min: number;
    max: number;
    values: Values;
    spacing: number;
    median: number;
    origin: any;
    width: string | number;
    height: string | number;
    area?: string;
    stroke: {
        round: boolean;
        width: number;
        color: string;
    };
    total?: number;
}
