import { useMemo } from 'react';
import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import { roundTo, unwrapArray } from '../utils';
import Marker from './Marker';
import Group from './Group';

const Line = (props: Charts) => {
    const { values, height, onClick, origin, round, spacing, stroke } = props;

    const lines = useMemo(() => {
        return values.map(({ color, value, id }: Value, index: number) => {
            if (index + 1 === values.length) {
                const shape = `M ${origin.x + index * spacing},${Number(height) - value}
                L ${origin.x + index * spacing}, ${Number(height) - value}`;
                //last
                return <path key={id} stroke={color} strokeWidth={stroke.width} d={shape} />;
            }
            const shape = `M ${origin.x + index * spacing},${Number(height) - value}
            L ${origin.x + spacing * (index + 1)}, ${Number(height) - unwrapArray(values[index + 1]).value}`;
            return <path key={id} strokeWidth={stroke.width} stroke={color} d={shape} />;
        });
    }, [values, height, origin.x, spacing, stroke]);

    const markers = useMemo(() => {
        return values.map(({ color, label, raw, value, id }: any, index: number) => {
            const markerProps = {
                color,
                circleX: roundTo(origin.x + index * spacing, 0),
                circleY: roundTo(Number(height) - value, 0),
                radius: 2 * stroke.width,
                strokeWidth: stroke.width,
                raw,
                value,
                id,
                label,
                onClick,
            };
            return <Marker key={id} {...markerProps} />;
        });
    }, [values, height, onClick, origin.x, spacing, stroke]);

    return (
        <Group round={round} stroke={stroke}>
            {lines}
            {markers}
        </Group>
    );
};
export default Line;
Line.displayName = 'Line';
