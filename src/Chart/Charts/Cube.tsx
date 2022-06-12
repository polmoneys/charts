import Charts from '../interfaces/Charts';
import { colorize } from '../utils';
import Group from './Group';

const Cube = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke, shades } = props;

    const scaling = 0.5;

    return (
        <Group round={round} stroke={stroke}>
            {values.map(({ label, raw, value }: any, index: number) => {
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
                    <g
                        key={index}
                        style={{
                            cursor: 'pointer',
                        }}
                        onClick={() => onClick({ raw, label })}
                    >
                        <g>
                            {faces.map((f, i) => (
                                <path key={`${i}-face`} d={f} fill={colorize((i * 16) / 100, shades?.[1])} />
                            ))}
                        </g>
                    </g>
                );
            })}
        </Group>
    );
};
export default Cube;
Cube.displayName = 'Cube';
