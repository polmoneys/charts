import { useMemo } from 'react';
import Charts from '../interfaces/Charts';
import { Value } from '../interfaces/Values';
import Group from './Group';
import styles from '../Chart.module.css';

const Rect = (props: Charts) => {
    const { values, height, onClick, origin, spacing, stroke } = props;
    const minPeak = 4;

    const rects = useMemo(() => {
        return values.map(({ label, color, value, raw, id }: Value, index: number) => {
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
                    className={styles.pointer}
                    fill={color}
                    style={{
                        transform: 'rotateX(180deg)',
                    }}
                />
            );
        });
    }, [values, height, origin.x, spacing, stroke]);

    return <Group stroke={stroke}>{rects}</Group>;
};
export default Rect;
Rect.displayName = 'Rect';
