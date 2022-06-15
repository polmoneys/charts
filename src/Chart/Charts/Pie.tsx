import { useMemo, ReactNode } from 'react';
import Group from './Group';
import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import { toPercent } from '../utils';
import styles from '../Chart.module.css';

const Pie = (props: Charts) => {
    const { values, width, height, onClick, round = true, stroke } = props;

    const size = 60;

    let cumulativePercent = 0;

    const slices = useMemo(() => {
        let paths: Array<ReactNode> = [];

        (values as Array<Value>).forEach((slice: Value) => {
            const [startX, startY] = toPercent(cumulativePercent);
            cumulativePercent += slice.percent;
            const [endX, endY] = toPercent(cumulativePercent);

            // if the slice is more than 50%, take the large arc (the long way around)
            const largeArcFlag = slice.percent > 0.5 ? 1 : 0;

            const d = [
                `M ${startX * size} ${startY * size}`,
                // Arc (size is same as radius)
                `A ${size} ${size} 0 ${largeArcFlag} 1 ${endX * size} ${endY * size}`,
                `L 0 0`,
            ].join(' ');

            paths.push(
                <path
                    key={slice.id}
                    d={d}
                    className={styles.pointer}
                    onClick={() =>
                        onClick({
                            raw: slice.raw,
                            label: slice.label,
                            value: slice.value,
                        })
                    }
                    fill={slice.color}
                />
            );
        });
        return paths;
    }, [values, size]);

    return (
        <Group round={round} stroke={stroke} transform={`translate(${Number(width) / 2},${Number(height) / 2})`}>
            {slices}
        </Group>
    );
};
export default Pie;
