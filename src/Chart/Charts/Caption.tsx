import { Fragment } from 'react';
import { Value } from '../interfaces/Values';
import UIProps from '../interfaces/UIProps';
import styles from '../Chart.module.css';

const Caption = (props: UIProps) => {
    const {
        message,
        source,
        onClick,
        displayed,
        theme: { chartBg, border },
    } = props;
    if (!displayed) return <Fragment />;

    return (
        <ol
            onClick={() => onClick()}
            style={{
                backgroundColor: chartBg,
                border,
            }}
            className={styles.caption}
        >
            <li>{source}</li>

            {(message as Array<Value>).map((content) => {
                return (
                    <li
                        key={content.id}
                        style={{
                            color: content.color,
                        }}
                    >
                        <svg viewBox="0 0 10 10" width="10" height="10">
                            <circle strokeWidth="0" fill={content.color} cx={5} cy={5} r="4" />
                        </svg>
                        {content.label} {content.raw}
                    </li>
                );
            })}
        </ol>
    );
};

export default Caption;

Caption.displayName = 'Caption';
