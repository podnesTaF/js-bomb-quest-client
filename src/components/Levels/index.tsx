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
        <div className={styles.stepper}>
            {modules.map((module, i) => (
                <>
                    <div key={module.id} onClick={() => history.push('/modules/' + module.id)}  className={clsx(styles.step, styles.available)}>
                        <div className={styles.stepNumber}>
                            {module.id}
                        </div>
                        <div className={styles.stepTitle}>
                            <h3>{module.attributes.name}</h3>
                        </div>
                    </div>
                    {i < modules.length - 1 && <div className={styles.stepDivider} />}
                </>
            ))}
        </div>
    );
};

export default Levels;