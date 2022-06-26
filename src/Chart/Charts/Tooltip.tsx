import { Fragment } from 'react';
import UIProps from '../interfaces/UIProps';
import styles from '../Chart.module.css';

const Tooltip = (props: UIProps) => {
    const {
        displayed,
        message,
        onClick,
        theme: { bg, color, border },
    } = props;
    if (!displayed) return <Fragment />;

    return (
        <button
            onClick={() => onClick()}
            style={{
                backgroundColor: bg,
                color,
                border,
            }}
            className={styles.tooltip}
        >
            {message as string}
        </button>
    );
};

export default Tooltip;

Tooltip.displayName = 'Tooltip';
