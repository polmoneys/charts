import { Fragment, ReactNode } from 'react';
import styles from '../Chart.module.css';

interface Props {
    children: ReactNode;
    displayed: boolean;
}
const Toolbar = (props: Props) => {
    const { children, displayed = false } = props;
    if (!displayed) return <Fragment />;
    return <div className={styles.toolbar}>{children}</div>;
};

export default Toolbar;

Toolbar.displayName = 'Toolbar';
