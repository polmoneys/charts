import './styles.css';
import Chart, { initialOptions } from './Chart/Chart';
import { variantNames } from './Chart/interfaces/Variants';
import { Fragment, ReactNode } from 'react';

const unstyleOptions = {
    ...initialOptions,
    stroke: {
        ...initialOptions.stroke,
        color: 'transparent',
    },
    theme: {
        ...initialOptions.theme,
        shades: ['rgba(0,0,0,.1)', 'rgba(0,0,0,.3)'],
        chartBg: '#f9f9f9',
    },
};

const strokeOptions = {
    ...unstyleOptions,
    stroke: {
        color: 'rgba(0,0,0,.8)',
        width: 2,
    },
    theme: {
        ...unstyleOptions.theme,
        median: true,
    },
};

const colorsOptions = {
    ...initialOptions,
    stroke: {
        ...initialOptions.stroke,
        width: 3,
    },
};

function App() {
    return (
        <main>
            <header>
                <h1>
                    CH <span className="color-accent-1"> X</span>
                    <span className="color-accent-2">X</span> TS{' '}
                </h1>
            </header>

            <List>
                <li> Extensible SVG React Charts </li>
            </List>

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
                <Chart
                    datum={STOCKS_PIE}
                    options={{
                        ...initialOptions,
                        variant: 'pie',
                    }}
                />
            </section>

            <List>
                <li>Notes:</li>
                <li>Typescript, themable stroke, viewBox, dimensions,color shading, median ...</li>
                <li>
                    Chart 'caption' is supercharged with <a href="https://github.com/signavio/react-stick">react-stick</a>.
                </li>
                <li>
                    Code on{' '}
                    <a href="" className="github">
                        Github
                    </a>
                </li>
            </List>

            <br />
            <section>
                {variantNames
                    .filter((variant) => variant !== 'bar' && variant !== 'pie')
                    .map((variant) => (
                        <Chart
                            datum={variant === 'series' ? STOCKS_SERIES : STOCKS}
                            key={variant.trim().toLowerCase()}
                            options={{ ...strokeOptions, variant }}
                        />
                    ))}
                <Chart datum={STOCKS_PIE} options={{ ...strokeOptions, variant: 'pie' }} />
            </section>

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
