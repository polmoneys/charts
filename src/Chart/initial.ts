import Options from './interfaces/Options';
import Computed from './interfaces/Computed';
import UIState from './interfaces/UIState';

const initialOptions: Options = {
    about: {
        source: '',
        title: '',
        labelX: 'Stock price',
        labelY: 'Time in months',
    },
    svg: {
        height: '80',
        viewBox: { x: '0', y: '2' },
        width: '80',
    },
    stroke: {
        color: '#333',
        width: 1,
        round: true,
    },
    chart: {
        area: 'rgb(227, 255, 168)',
        topSpace: 10,
        bg: '#f9f9f9',
        border: '1px solid transparent',
        shades: ['rgba(69, 255, 188,1)', 'rgba(227, 255, 168,1)'],
    },
    ui: {
        bg: 'rgb(227, 255, 168)',
        color: '#222',
        border: '1px solid #222',
    },
    median: false,
    variant: 'line',
};

export default initialOptions;

export const initialComputed: Computed = {
    height: 0,
    max: 0,
    median: 0,
    min: 0,
    origin: { x: 0, y: 0 },
    spacing: 0,
    stroke: {
        color: 'blue',
        width: 1,
        round: true,
    },
    values: [],
    width: 0,
    total: 0,
};

export const initialUIState: UIState = {
    type: 'initial',
    message: '',
    displayed: false,
};

export const noMedianVariants = ['series', 'pie', 'dots'];
