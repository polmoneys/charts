import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import Group from './Group';
import styles from '../Chart.module.css';
import { roundTo } from '../utils';

const Dots = (props: Charts) => {
    const { values, onClick, stroke, spacing, origin, max, min } = props;
    return (
        <Group stroke={stroke}>
            {values
                .sort((a, b) => a.value - b.value)
                .map(({ color, label, raw, value, id }: Value, index: number) => {
                    const ratio = (min / max) * 100;
                    const r = roundTo(value / (ratio > 3 ? 3 : ratio), 2);
                    const radius = r <= 0 ? 1 : r;
                    const isFirstElement = index === 0;
                    const cx = roundTo(isFirstElement ? index * spacing + r / 2 : index * spacing, 2);
                    const cy = roundTo(origin.y / 2, 2);

                    return <circle key={id} className={styles.pointer} onClick={() => onClick({ raw, label })} cx={cx} cy={cy} r={radius} fill={color} />;
                })}
        </Group>
    );
};
export default Dots;
Dots.displayName = 'Dots';
