import { useMemo } from 'react';
import Charts from '../interfaces/Charts';
import Marker from './Marker';
import Group from './Group';

const Rect = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke } = props;
    const minPeak = 4;

    const rects = useMemo(() => {
        return values.map(({ label, color, value, raw, id }: any, index: number) => {
            return (
                <rect
                    key={id}
                    strokeWidth={stroke.width}
                    width={spacing}
                    height={value > 0 ? value : minPeak}
                    x={origin.x + index * spacing}
                    y={-height}
                    onClick={() => onClick({ label, raw })}
                    stroke={stroke.color}
                    fill={color}
                    style={{
                        transform: 'rotateX(180deg)',
                        cursor: 'pointer',
                    }}
                />
            );
        });
    }, [values, height, origin.x, spacing, stroke]);

    return (
        <Group round={round} stroke={stroke}>
            {rects}
        </Group>
    );
};
export default Rect;
Rect.displayName = 'Rect';
