import './styles.css';
import Chart, { initialOptions } from './Chart/Chart';
import { variantNames } from './Chart/interfaces/Variants';
import { Fragment, ReactNode } from 'react';

const strokeOptions = {
    ...initialOptions,
    stroke: {
        ...initialOptions.stroke,
        color: 'rgba(0,0,0,.8)',
        width: 2,
    },
    chart: {
        ...initialOptions.chart,
        area: ' rgba(0,0,0,.2)',
        shades: ['rgba(0,0,0,.1)', 'rgba(0,0,0,.35)'],
    },
    ui: {
        ...initialOptions.ui,
        bg: 'rgb(255, 107, 107)',
        border: '2px solid transparent',
    },
    median: true,
};

const colorsOptions = {
    ...initialOptions,
    about: {
        ...initialOptions.about,
        title: 'Evolution of stock prices over time',
    },
    stroke: {
        ...initialOptions.stroke,
        width: 3,
    },
    chart: {
        ...initialOptions.chart,
        bg: 'silver',
    },
    ui: {
        ...initialOptions.ui,
        color: '#222',
        border: '3px solid #333',
    },
};

function App() {
    return (
        <main>
            <header>
                <h1>
                    CH <span className="color-accent-1">X</span>
                    <span className="color-accent-2">X</span>TS
                </h1>
            </header>
            <p className="github">
                <a href="https://github.com/polmoneys/charts">
                    <svg width="73" height="72" viewBox="-36 -36 146 144">
                        <path d="M36 0C16.119 0 0 16.12 0 36c0 15.905 10.315 29.402 24.621 34.16 1.799.334 2.379-.78 2.379-1.73v-6.703c-10.014 2.18-12.1-4.245-12.1-4.245-1.635-4.163-3.996-5.27-3.996-5.27-3.266-2.233.246-2.19.246-2.19 3.616.256 5.52 3.712 5.52 3.712 3.21 5.502 8.42 3.912 10.476 2.992.323-2.327 1.254-3.914 2.286-4.814-7.999-.908-16.401-3.996-16.401-17.792 0-3.931 1.406-7.142 3.71-9.662-.376-.908-1.607-4.57.345-9.527 0 0 3.023-.967 9.902 3.691 2.874-.797 5.953-1.198 9.012-1.213 3.059.015 6.143.416 9.017 1.213 6.874-4.658 9.891-3.691 9.891-3.691 1.96 4.957.727 8.619.355 9.527 2.308 2.52 3.706 5.73 3.706 9.662 0 13.828-8.423 16.872-16.439 17.763 1.29 1.116 2.47 3.31 2.47 6.668v9.879c0 .958.577 2.08 2.402 1.728C61.7 65.391 72 51.902 72 36 72 16.12 55.88 0 36 0z"></path>
                    </svg>
                </a>
            </p>
            {/* <List>
                <li>Notes:</li>
                <li>Typescript, themable stroke, viewBox, dimensions, color shading, median ...</li>
                <li>
                    Chart 'caption' is supercharged with <a href="https://github.com/signavio/react-stick">react-stick</a>.
                </li>
                <li>
                    Code on{' '}
                    <a href="" className="github">
                        Github
                    </a>
                    .
                </li>
            </List> */}
            <br />

            <section>
                {variantNames
                    .filter((variant) => variant !== 'bar' && variant !== 'pie')
                    .map((variant) => (
                        <Chart
                            datum={variant === 'series' ? STOCKS_SERIES : STOCKS}
                            key={variant.trim().toLowerCase()}
                            options={{ ...colorsOptions, variant }}
                        />
                    ))}
            </section>
            <br />

            <section>
                {variantNames
                    .filter((variant) => variant !== 'bar' && variant !== 'pie')
                    .map((variant) => (
                        <Chart
                            datum={variant === 'series' ? STOCKS_SERIES : STOCKS}
                            key={variant.trim().toLowerCase()}
                            options={{ ...strokeOptions, variant, ...(variant === 'stack' && { median: false }) }}
                        />
                    ))}
                <Chart datum={STOCKS_PIE} options={{ ...strokeOptions, variant: 'pie' }} />
            </section>

            <br />
            {/* <section>
                {variantNames
                    .filter((variant) => variant !== 'bar')
                    .map((variant, index: number) => (
                        <Chart
                            datum={variant === 'series' ? STOCKS_SERIES : STOCKS}
                            key={variant.trim().toLowerCase()}
                            options={{ ...unstyleOptions, variant }}
                        />
                    ))}
            </section> */}
        </main>
    );
}

export default App;

const List = ({ children }: { children: ReactNode }) => (
    <Fragment>
        <br />
        <ul>{children}</ul>
        <br />
    </Fragment>
);

let i = 50;

const STOCKS = [
    {
        id: i++,
        label: 'MSFT',
        value: 60,
    },
    {
        id: i++,
        label: 'AAPL',
        value: 120,
    },
    {
        id: i++,
        label: 'AMZN',
        value: 20,
    },
    {
        id: i++,
        label: 'GOOGL',
        value: 240,
    },
    {
        id: i++,
        label: 'FB',
        value: 70,
    },
    {
        id: i++,
        label: 'NKE',
        value: 30,
    },
    {
        id: i++,
        label: 'TSLA',
        value: 51,
    },
    {
        id: i++,
        label: 'PMYS',
        value: 150,
    },
];

const STOCKS_SERIES = [
    [
        {
            id: i++,
            label: 'MSFT',
            value: 60,
        },
        {
            id: i++,
            label: 'AAPL',
            value: 120,
        },
        {
            id: i++,
            label: 'AMZN',
            value: 20,
        },
        {
            id: i++,
            label: 'GOOGL',
            value: 240,
        },
        {
            id: i++,
            label: 'FB',
            value: 70,
        },
        {
            id: i++,
            label: 'NKE',
            value: 30,
        },
    ],
    [
        {
            id: i++,
            label: 'MSFT',
            value: 30,
        },
        {
            id: i++,
            label: 'AAPL',
            value: 180,
        },
        {
            id: i++,
            label: 'AMZN',
            value: 100,
        },
        {
            id: i++,
            label: 'GOOGL',
            value: 200,
        },
        {
            id: i++,
            label: 'FB',
            value: 90,
        },
        {
            id: i++,
            label: 'NKE',
            value: 50,
        },
    ],
    [
        {
            id: i++,
            label: 'MSFT',
            value: 50,
        },
        {
            id: i++,
            label: 'AAPL',
            value: 199,
        },
        {
            id: i++,
            label: 'AMZN',
            value: 120,
        },
        {
            id: i++,
            label: 'GOOGL',
            value: 190,
        },
        {
            id: i++,
            label: 'FB',
            value: 40,
        },
        {
            id: i++,
            label: 'NKE',
            value: 20,
        },
        {
            id: i++,
            label: 'PMYS',
            value: 40,
        },
    ],
];

const STOCKS_PIE = [
    {
        id: i++,
        label: 'MSFT',
        value: 60,
    },
    {
        id: i++,
        label: 'AAPL',
        value: 120,
    },
    {
        id: i++,
        label: 'AMZN',
        value: 20,
    },
];
