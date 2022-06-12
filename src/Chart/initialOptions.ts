import Options from './interfaces/Options';

const initialOptions: Options = {
    about: {
        source: '',
        title: '',
    },
    axis: {
        labelX: '',
        labelY: '',
    },
    svg: {
        height: '80',
        left: '0',
        viewBox: { x: '0', y: '2' },
        width: '80',
    },
    stroke: {
        color: 'blue',
        width: 1,
    },
    theme: {
        areaBg: 'rgb(227, 255, 168)',
        chartBg: 'rgba(0,0,0,.1)',
        ui: {
            bg: 'rgb(227, 255, 168)',
            color: '#222',
        },
        legend: true,
        minValues: 10,
        round: true,
        shades: ['rgba(69, 255, 188,1)', 'rgba(227, 255, 168,1)'], // "rgb(255, 107, 107)"
        topSpace: 10,
        median: false,
    },
    variant: 'line',
};

export default initialOptions;

export const initialComputed = {
    height: 0,
    max: 0,
    median: 0,
    min: 0,
    origin: { x: 0, y: 0 },
    round: true,
    spacing: 0,
    stroke: {
        color: 'blue',
        width: 1,
    },
    values: [],
    width: 0,
};
