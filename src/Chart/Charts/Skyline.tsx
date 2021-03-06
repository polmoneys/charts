import Charts from '../interfaces/Charts';
import Group from './Group';
import styles from '../Chart.module.css';

const Skyline = (props: Charts) => {
    const { values, onClick, origin, spacing, stroke } = props;

    return (
        <Group stroke={stroke}>
            {values.map(({ color, label, raw, value, id }: any, index: number) => {
                const originFix = {
                    ...origin,
                    x: origin.x + index * spacing,
                };

                const minPeak = 10;

                const p1 = `${originFix.x},${originFix.y}`;
                const p2 = `${originFix.x},${originFix.y - value - minPeak}`;
                const p3 = `${originFix.x + spacing},${originFix.y - value}`;
                const p4 = `${originFix.x + spacing},${originFix.y - value}`;
                const p5 = `${originFix.x + spacing},${originFix.y}`;

                const shape = `${p1} ${p2} ${p3} ${p4} ${p5}`;

                return <polygon key={id} points={shape} fill={color} className={styles.pointer} onClick={() => onClick({ raw, label })} />;
            })}
        </Group>
    );
};
export default Skyline;
Skyline.displayName = 'Skyline';
