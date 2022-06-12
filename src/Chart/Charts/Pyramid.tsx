import Charts from '../interfaces/Charts';
import { colorize } from '../utils';
import Group from './Group';

const Pyramid = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke, shades } = props;

    const scaling = 0.5;

    return (
        <Group round={round} stroke={stroke}>
            {values.map(({ label, raw, value }: any, index: number) => {
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
                                <path d={f} key={`${i}-face-pyramid`} fill={colorize((i * 16) / 100, shades?.[0])} />
                            ))}
                        </g>
                    </g>
                );
            })}
        </Group>
    );
};
export default Pyramid;
Pyramid.displayName = 'Pyramid';
