import styles from '../Chart.module.css';

interface MarkerProps {
    circleX: number;
    circleY: number;
    raw: number;
    label: string;
    radius: number;
    strokeWidth: number;
    id: number;
    color: string;
    onClick: (params: any) => void;
}
const Marker = (props: MarkerProps) => {
    const { raw, label, circleX, circleY, radius, id, onClick, color, strokeWidth } = props;

    return (
        <circle
            key={id}
            onClick={() => onClick?.({ raw, label })}
            strokeWidth={strokeWidth}
            fill={color}
            cx={circleX}
            cy={circleY}
            r={radius}
            className={styles.marker}
        />
    );
};

export default Marker;
Marker.displayName = 'Marker';
