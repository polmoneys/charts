import { useState } from 'react';
import Stick from 'react-stick';
import ChartProps from './interfaces/Chart';
import Base from './Base';
import Charts from './Charts';
import initialOptions from './initialOptions';
import styles from './Chart.module.css';

const Chart = (props: ChartProps) => {
    const { datum, options = initialOptions } = props;

    const [base, setBase] = useState<Base | null>(null);

    const [tooltip, setTooltip] = useState<{
        label: string;
        value: string;
        display: boolean;
    }>({ value: '', label: '', display: false });

    const [legend, setLegend] = useState({
        label: '',
        display: false,
    });

    const mountRef = (ref: any) => {
        if (ref && base === null) {
            const rect = ref.getBoundingClientRect();
            const { width, height, left } = rect;
            const instance = new Base(datum, {
                ...options,
                svg: {
                    ...options.svg,
                    width,
                    height: Math.floor(height),
                    left: left.toString(),
                },
            });
            setBase(instance);
        }
    };

    const tooltipIn = ({ label, raw }: any) => setTooltip({ label, value: raw, display: true });
    const tooltipMedianIn = ({ median }: any) => setTooltip({ label: 'Median', value: median, display: true });

    const tooltipOut = () => {
        setTooltip({ label: '', value: '', display: false });
    };
    const legendOut = () => {
        setLegend({ label: '', display: false });
    };

    const isChartReady = base !== null;
    const uiBorder = { border: `${options.stroke.width}px solid ${options.stroke.color}` };
    return (
        <Stick
            component="article"
            className={styles.root}
            // inline
            // align="top center"
            sameWidth
            autoFlipVertically
            node={<Charts.Legend onClick={legendOut} {...legend} theme={{ ...options.theme.ui, ...uiBorder }} />}
            position="top center"
            onClickOutside={() => setLegend({ label: '', display: false })}
        >
            {isChartReady && (
                <button
                    onClick={() => {
                        setLegend((prev) => ({ label: base?.svgProps['aria-label'], display: !prev.display }));
                    }}
                    style={{ ...uiBorder, backgroundColor: options.theme.areaBg }}
                    className={styles.toggle}
                >
                    <span className={styles.visuallyHidden}> Toggle</span>
                </button>
            )}
            {tooltip.display && <Charts.Tooltip {...tooltip} onClick={tooltipOut} theme={{ ...options.theme.ui, ...uiBorder }} />}
            <svg ref={mountRef} {...base?.svgProps}>
                {isChartReady && [
                    options.variant !== 'series' && options.theme.median && <Charts.Median key="median" {...base.chartMedian} onClick={tooltipMedianIn} />,
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
                    }[options.variant],
                ]}
            </svg>
        </Stick>
    );
};

Chart.displayName = 'Chart';

export default Chart;
export { initialOptions };
