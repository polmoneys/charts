import { useState } from 'react';
import Stick from 'react-stick';
import ChartProps from './interfaces/Chart';
import { Value } from './interfaces/Values';
import UIState from './interfaces/UIState';
import Base from './Base';
import Charts from './Charts';
import initialOptions, { initialUIState, noMedianVariants } from './initial';
import Toolbar from './Charts/Toolbar';
import styles from './Chart.module.css';

const Chart = (props: ChartProps) => {
    const { datum, options = initialOptions } = props;

    const [base, setBase] = useState<Base | null>(null);
    const isChartReady = base !== null;

    const [uiState, setUIState] = useState<UIState>(initialUIState);
    const uiOut = () => setUIState(initialUIState);
    const tooltipIn = ({ label, raw }: any) => setUIState({ message: `${label} - ${raw}`, displayed: true, type: 'tooltip' });

    const mountRef = (ref: any) => {
        if (ref && base === null) {
            const rect = ref.getBoundingClientRect();
            const { width, height } = rect;
            const instance = new Base(datum, {
                ...options,
                svg: {
                    ...options.svg,
                    width,
                    height: Math.floor(height),
                },
            });
            setBase(instance);
        }
    };

    const {
        ui: { border, bg },
        variant,
    } = options;

    const isSeries = variant === 'series';
    return (
        <Stick
            component="article"
            className={styles.root}
            sameWidth
            autoFlipVertically
            node={
                <Charts.Caption
                    {...uiState}
                    source={base?.svgProps['aria-label']}
                    displayed={uiState.type === 'caption'}
                    onClick={uiOut}
                    theme={{ ...options.ui, chartBg: options.chart.bg }}
                />
            }
            position="top center"
            onClickOutside={uiOut}
        >
            <Charts.Tooltip {...uiState} displayed={uiState.type === 'tooltip'} onClick={uiOut} theme={options.ui} />
            <Toolbar displayed={isChartReady}>
                <button
                    onClick={() =>
                        base?.chart.values !== undefined
                            ? setUIState((prev) => ({
                                  message: prev.displayed ? '' : isSeries ? (base?.chart.values[0] as Array<Value>) : base?.chart.values,
                                  displayed: !prev.displayed,
                                  type: prev.displayed ? 'initial' : 'caption',
                              }))
                            : {}
                    }
                    style={{ border, backgroundColor: bg }}
                >
                    <span className={styles.visuallyHidden}> Toggle info</span>
                </button>
            </Toolbar>

            <svg ref={mountRef} {...base?.svgProps}>
                {isChartReady && [
                    !noMedianVariants.includes(variant) && (
                        <Charts.Median
                            key="median"
                            {...base.chartMedian}
                            onClick={({ median }: { median: number }) =>
                                setUIState((prev) => ({
                                    message: prev.displayed ? '' : `Median value ${median.toString()}`,
                                    displayed: !prev.displayed,
                                    type: prev.displayed ? 'initial' : 'tooltip',
                                }))
                            }
                            displayed={options.median}
                        />
                    ),
                    {
                        skyScraper: <Charts.SkyScraper key="skyscraper" {...base.chart} onClick={tooltipIn} />,
                        cube: <Charts.Cube key="cube" {...base.chart} onClick={tooltipIn} />,
                        pyramid: <Charts.Pyramid key="pyramid" {...base.chart} onClick={tooltipIn} />,
                        skyline: <Charts.Skyline key="skyline" {...base.chart} onClick={tooltipIn} />,
                        bar: <Charts.Bar key="bar" {...base.chart} onClick={tooltipIn} />,
                        peak: <Charts.Peak key="peak" {...base.chart} onClick={tooltipIn} />,
                        area: <Charts.Area key="area" {...base.chart} onClick={tooltipIn} />,
                        series: <Charts.Series key="series" {...base.chart} onClick={tooltipIn} />,
                        line: <Charts.Line key="line" {...base.chart} onClick={tooltipIn} />,
                        rect: <Charts.Rect key="rect" {...base.chart} onClick={tooltipIn} />,
                        pie: <Charts.Pie key="pie" {...base.chart} onClick={tooltipIn} />,
                        stack: <Charts.Stack key="stack" {...base.chart} onClick={tooltipIn} />,
                        dots: <Charts.Dots key="dots" {...base.chart} onClick={tooltipIn} />,
                    }[variant],
                ]}
            </svg>
        </Stick>
    );
};

Chart.displayName = 'Chart';

export default Chart;
export { initialOptions };
