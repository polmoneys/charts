import Charts from '../interfaces/Charts';
import { colorize } from '../utils';
import Group from './Group';

const SkyScraper = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke, shades } = props;

    const scaling = 0.5;

    return (
        <Group round={round} stroke={stroke}>
            {values.map(({ label, raw, value }: any, index: number) => {
                const magicNumbers = {
                    // TOOD: Naming will be hard
                    min: 29,
                    max: 115,
                    fixTop: 19,
                };
                const peak = Number(height) - (magicNumbers.max + value) * scaling;

                const originFix = {
                    x: origin.x + index * spacing,
                    y: peak,
                };

                const vertex = {
                    y: magicNumbers.min * scaling,
                    yy: 57 * scaling,
                    yyy: (87 + value) * scaling,
                    yyyy: (magicNumbers.max + value) * scaling,
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
        z`,
                ];

                const originFixTop = {
                    x: origin.x + index * spacing,
                    y: Number(peak) - magicNumbers.fixTop,
                };

                const vertexTop = {
                    y: 58 * scaling,
                    yy: 87 * scaling,
                    x: 51 * scaling,
                    xx: 100 * scaling,
                };

                const facesTop = [
                    `M ${originFixTop.x + vertexTop.x},${originFixTop.y} 
      L 
      ${originFixTop.x}, ${originFixTop.y + vertexTop.y}
      ${originFixTop.x + vertexTop.x}, ${originFixTop.y + vertexTop.yy}
      z
      `,
                    `M ${originFixTop.x + vertexTop.x},${originFixTop.y} 
       ${originFixTop.x + vertexTop.x}, ${originFixTop.y + vertexTop.yy}
       ${originFixTop.x + vertexTop.xx},${originFixTop.y + vertexTop.y}
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
                        <g
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            {faces.map((f, i) => (
                                <path d={f} key={`${i}-face-base`} fill={colorize((i * 16) / 100, shades?.[1])} />
                            ))}
                        </g>
                        <g>
                            {facesTop.map((f, i) => (
                                <path d={f} key={`${i}-face-pyramid`} fill={colorize((i * 16) / 100, shades?.[1])} />
                            ))}
                        </g>
                    </g>
                );
            })}
        </Group>
    );
};
export default SkyScraper;

SkyScraper.displayName = 'SkyScraper';
