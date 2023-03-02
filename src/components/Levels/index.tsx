import React from 'react';
import styles from './Levels.module.css';
import clsx from 'clsx';
import {useHistory} from "react-router";
import {IModule} from "../../models/IModule";
import ModuleItem from "../ModuleItem";

interface LevelsProps {
    modules: IModule[];
}

const Levels: React.FC<LevelsProps> = ({modules}) => {
    const history = useHistory();

    return (
        <div className={styles.stepper}>
            {modules.map((module, i) => (
                <ModuleItem key={module.id} module={module} />
            ))}
        </div>
    );
};

export default Levels;