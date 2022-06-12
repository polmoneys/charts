import styles from '../Chart.module.css';

const Tooltip = (props: { label: string; value: string; onClick: () => void; display: boolean; theme: { bg: string; color: string; border: string } }) => {
    const {
        label,
        value,
        onClick,
        theme: { bg, color, border },
    } = props;
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
            {label} : {value}
        </button>
    );
};

export default Tooltip;

Tooltip.displayName = 'Tooltip';
