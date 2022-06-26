import Computed from '../interfaces/Computed';

export default interface Charts extends Pick<Computed, 'values' | 'stroke' | 'height' | 'origin' | 'spacing' | 'width' | 'area' | 'total' | 'max' | 'min'> {
    onClick: (args: any) => void;
    shades?: Array<string>;
    bg: string;
}
