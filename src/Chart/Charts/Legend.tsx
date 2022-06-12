import { Fragment } from 'react';
import styles from '../Chart.module.css';

const Legend = (props: { label: string; onClick: () => void; display: boolean; theme: { bg: string; color: string; border: string } }) => {
    const {
        label,
        onClick,
        display,
        theme: { bg, color, border },
    } = props;
    if (!display) return <Fragment />;
    return (
        <button
            className={styles.legend}
            style={{
                backgroundColor: bg,
                color,
                border,
            }}
            onClick={() => onClick()}
        >
            {label}
        </button>
    );
};

export default Legend;
Legend.displayName = 'Legend';
