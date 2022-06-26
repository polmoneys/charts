import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import Group from './Group';
import styles from '../Chart.module.css';

const Stack = (props: Charts) => {
    const { values, height, onClick, stroke, width } = props;

    return (
        <Group stroke={stroke}>
            {values
                .sort((a, b) => a.value - b.value)
                .map(({ label, color, raw, value, id }: Value) => {
                    return (
                        <rect
                            onClick={() => onClick({ raw, label })}
                            className={styles.pointer}
                            key={id}
                            fill={color}
                            width={width}
                            height={Number(height) - value}
                            rx="0"
                        />
                    );
                })}
        </Group>
    );
};
export default Stack;
Stack.displayName = 'Stack';
