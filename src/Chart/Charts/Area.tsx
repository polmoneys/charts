import { useMemo } from 'react';
import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import { roundTo } from '../utils';
import Marker from './Marker';
import Group from './Group';

function Area(props: Charts) {
    const { values, height, onClick, origin, round = true, spacing, stroke, areaBg } = props;

    const markers = useMemo(() => {
        return values.map(({ color, label, raw, value, id }: Value, index: number) => {
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
    const shape = `${values
        .map((value: Value) => value.value)
        .map((value: number, index: any) => `${origin.x + index * spacing},${Number(height) - value}`)
        .join(' ')}
            ${origin.x + (values.length - 1) * spacing},${height}
            0,${height}
            `;
    return (
        <Group round={round} stroke={stroke}>
            <polygon strokeWidth={stroke.width} stroke={stroke.color} fill={areaBg} points={shape} />
            {markers}
        </Group>
    );
}
export default Area;
Area.displayName = 'Area';
