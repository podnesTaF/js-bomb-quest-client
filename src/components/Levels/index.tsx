import React from 'react';
import styles from './Levels.module.css';
import clsx from 'clsx';
import {useHistory} from "react-router";
import {IModule} from "../../models/IModule";

interface LevelsProps {
    modules: IModule[];
}

const Levels: React.FC<LevelsProps> = ({modules}) => {
    const history = useHistory();

    return (
        <div className={styles.container}>
            {modules.map((module, i) => (
                <div key={module.id} onClick={() => history.push('/modules/' + module.id)}  className={clsx(styles.level, styles.available)}>
                    <h3>{module.attributes.name}</h3>
                    <div className={styles.circle}></div>
                    {i === 0 &&
                        <div className={styles.connector}></div>}
                    {i === 1 &&  <div className={styles.connectorOdd}></div>}
                    {i === 2 &&  <div className={styles.connectorLast}></div>}
                </div>
            ))}
        </div>
    );
};

export default Levels;