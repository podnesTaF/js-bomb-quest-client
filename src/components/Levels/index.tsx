import React from 'react';
import styles from './Levels.module.css';
import clsx from 'clsx';
import {useHistory} from "react-router";


const Levels = () => {
    const history = useHistory();

    return (
        <div className={styles.container}>
            <div onClick={() => history.push('/js-promises')}  className={clsx(styles.level, styles.available)}>
                <h3>JS Promises</h3>
                <div className={styles.circle}></div>
                <div className={styles.connector}></div>
            </div>
            <div className={styles.level}>
                <h3>Event Loop</h3>
                <div className={styles.circle}></div>
                <div className={styles.connectorOdd}></div>
            </div>
            <div className={styles.level}>
                <h3>React hooks essentials</h3>
                <div className={styles.circle}></div>
                <div className={styles.connectorLast}></div>
            </div>
            <div className={styles.level}>
                <h3>React renders</h3>
                <div className={styles.circle}></div>
            </div>
        </div>
    );
};

export default Levels;