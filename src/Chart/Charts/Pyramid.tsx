import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import Group from './Group';
import styles from '../Chart.module.css';

const Pyramid = (props: Charts) => {
    const { values, height, onClick, origin, spacing, stroke } = props;

    const scaling = 0.5;

    return (
        <Group stroke={stroke}>
            {values.map(({ label, raw, value, color }: Value, index: number) => {
                const peak = Number(height) - (87 + value) * scaling;

                const originFix = {
                    x: origin.x + index * spacing,
                    y: peak,
                };

                const vertex = {
                    y: (58 + value) * scaling,
                    yy: (87 + value) * scaling,
                    x: 51 * scaling,
                    xx: 100 * scaling,
                };

                const faces = [
                    `M ${originFix.x + vertex.x},${originFix.y} 
                    L 
                    ${originFix.x}, ${originFix.y + vertex.y}
                    ${originFix.x + vertex.x}, ${originFix.y + vertex.yy}
                    z`,
                    `M ${originFix.x + vertex.x},${originFix.y} 
                    ${originFix.x + vertex.x}, ${originFix.y + vertex.yy}
                    ${originFix.x + vertex.xx},${originFix.y + vertex.y}
                    z`,
                ];
                return faces.map((f, i) => (
                    <path d={f} key={`${i}-face-pyramid`} fill={color} className={styles.pointer} onClick={() => onClick({ raw, label })} />
                ));
            })}
        </Group>
    );
};
export default Pyramid;
Pyramid.displayName = 'Pyramid';
