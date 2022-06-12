import Charts from '../interfaces/Charts';
import Group from './Group';

const Peak = (props: Charts) => {
    const { values, onClick, origin, round, spacing, stroke } = props;

    return (
        <Group round={round} stroke={stroke}>
            {values.map(({ color, label, raw, value, id }: any, index: number) => {
                const p1 = `${origin.x + index * spacing},${origin.y}`;
                const p2 = `${origin.x + index * spacing + spacing / 2},${value > 0 ? origin.y - value : origin.y - 10}`;
                const p3 = `${origin.x + index * spacing + spacing},${origin.y}`;
                const d = `${p1} ${p2} ${p3}`;

                return <polygon key={id} style={{ cursor: 'pointer' }} points={d} fill={color} onClick={() => onClick({ raw, label })} />;
            })}
        </Group>
    );
};
export default Peak;
Peak.displayName = 'Peak';
