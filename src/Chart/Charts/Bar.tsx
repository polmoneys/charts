import Charts from '../interfaces/Charts';
import Group from './Group';

const Bar = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke } = props;

    const spacingOffset = 10;
    const bottomOffset = 6;

    return (
        <Group round={round} stroke={stroke}>
            {values.map(({ color, label, raw, value, id }: any, index: number) => {
                const shape = `M ${spacingOffset + origin.x + index * spacing},${Number(height) - bottomOffset}  
             L ${spacingOffset + origin.x + index * spacing}, ${Number(height) - value - bottomOffset} `;
                return (
                    <path
                        key={id}
                        style={{ cursor: 'pointer' }}
                        d={shape}
                        stroke={color}
                        strokeWidth={stroke.width * 6}
                        onClick={() => onClick({ raw, label })}
                    />
                );
            })}
        </Group>
    );
};
export default Bar;
Bar.displayName = 'Bar';
