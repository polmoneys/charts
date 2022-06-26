import { useMemo } from 'react';
import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import { roundTo, unwrapArray } from '../utils';
import Marker from './Marker';
import Group from './Group';

const Series = (props: Charts) => {
    const { values, height, onClick, origin, spacing, stroke } = props;

    const markers = useMemo(() => {
        return values.map((datum: any) =>
            datum.map(({ color, label, raw, value, id }: Value, index: number) => {
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
            })
        );
    }, [values, height, onClick, origin.x, spacing, stroke]);

    return (
        <Group stroke={stroke}>
            {values.map((datum: any, i: number) =>
                datum.map(({ color, value, id }: Value, index: number) => {
                    // @ts-ignore
                    const end = !values[i][index + 1]
                        ? // @ts-ignore
                          values[i][index].value
                        : // @ts-ignore
                          unwrapArray(values[i][index + 1]).value;
                    if (values[i].length === index + 1) {
                        const shape = `M ${origin.x + spacing * index},${Number(height) - value}
                        L ${origin.x + spacing * index}, ${Number(height) - end} `;
                        return <path key={id} strokeWidth={stroke.width} stroke={color} d={shape} />;
                    }
                    const shape = `M ${origin.x + spacing * index},${Number(height) - value}
                    L ${origin.x + spacing * (index + 1)}, ${Number(height) - end} `;
                    return <path key={id} strokeWidth={stroke.width} stroke={color} d={shape} />;
                })
            )}
            {markers}
        </Group>
    );
};
export default Series;

Series.displayName = 'Series';
