import { Fragment } from 'react';
import Charts from '../interfaces/Charts';
import Computed from '../interfaces/Computed';
import styles from '../Chart.module.css';

interface Props extends Omit<Charts, 'areaBg'>, Pick<Computed, 'height' | 'median' | 'width'> {
    displayed: boolean;
}

const Median = (props: Props) => {
    const { onClick, width, height, stroke, median, displayed } = props;
    if (!displayed) return <Fragment />;

    return (
        <line
            aria-hidden="true"
            strokeWidth={stroke.width}
            x1="0"
            y1={Number(height) - Number(median)}
            x2={Number(width) - 20}
            y2={Number(height) - Number(median)}
            onClick={() => onClick({ median })}
            stroke={stroke.color}
            className={styles.pointer}
        />
    );
};
export default Median;
Median.displayName = 'Median';
