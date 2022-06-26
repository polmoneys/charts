import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import Group from './Group';
import styles from '../Chart.module.css';

const Peak = (props: Charts) => {
    const { values, onClick, origin, spacing, stroke } = props;

    return (
        <Group stroke={stroke}>
            {values.map(({ color, label, raw, value, id }: Value, index: number) => {
                const face = `${origin.x + index * spacing},${origin.y}`;
                const face2 = `${origin.x + index * spacing + spacing / 2},${value > 0 ? origin.y - value : origin.y - 10}`;
                const face3 = `${origin.x + index * spacing + spacing},${origin.y}`;
                const shape = `${face} ${face2} ${face3}`;

                return <polygon key={id} className={styles.pointer} points={shape} fill={color} onClick={() => onClick({ raw, label })} />;
            })}
        </Group>
    );
};
export default Peak;
Peak.displayName = 'Peak';
