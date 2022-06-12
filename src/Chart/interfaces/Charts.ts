import Computed from '../interfaces/Computed';

export default interface Charts extends Pick<Computed, 'values' | 'stroke' | 'height' | 'origin' | 'spacing' | 'round' | 'width' | 'areaBg'> {
    onClick: (args: any) => void;
    shades?: Array<string>;
}
