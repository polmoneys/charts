import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import Group from './Group';
import styles from '../Chart.module.css';

const Cube = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke, shades } = props;

    const scaling = 0.5;

    return (
        <Group round={round} stroke={stroke}>
            {values.map(({ label, raw, value, color }: Value, index: number) => {
                const originFix = {
                    x: origin.x + index * spacing,
                    y: Number(height) - (115 + value) * scaling,
                };

                const vertex = {
                    y: 29 * scaling,
                    yy: 57 * scaling,
                    yyy: (87 + value) * scaling,
                    yyyy: (115 + value) * scaling,
                    x: 50 * scaling,
                    xx: 100 * scaling,
                };
                const faces = [
                    `M ${originFix.x},${originFix.y + vertex.y} 
                    L 
                    ${originFix.x}, ${originFix.y + vertex.yyy}
                    ${originFix.x + vertex.x}, ${originFix.y + vertex.yyyy}
                    ${originFix.x + vertex.x}, ${originFix.y + vertex.yy}
                    ${originFix.x},${originFix.y + vertex.y}
                    z`,

                    `M ${originFix.x},${originFix.y + vertex.y} 
                    L 
                    ${originFix.x + vertex.x}, ${originFix.y + vertex.yy}
                    ${originFix.x + vertex.xx}, ${originFix.y + vertex.y}
                    ${originFix.x + vertex.x}, ${originFix.y}
                    ${originFix.x},${originFix.y + vertex.y}
                    z`,
                    `M ${originFix.x + vertex.x},${originFix.y + vertex.yy} 
                    L 
                    ${originFix.x + vertex.x}, ${originFix.y + vertex.yyyy}
                    ${originFix.x + vertex.xx}, ${originFix.y + vertex.yyy}
                    ${originFix.x + vertex.xx}, ${originFix.y + vertex.y}
                    ${originFix.x + vertex.x},${originFix.y + vertex.yy}
                    z
                    `,
                ];

                return (
                    <g key={index} className={styles.pointer} onClick={() => onClick({ raw, label })}>
                        {faces.map((f, i) => (
                            <path key={`${i}-face`} d={f} fill={color} />
                        ))}
                    </g>
                );
            })}
        </Group>
    );
};
export default Cube;
Cube.displayName = 'Cube';
