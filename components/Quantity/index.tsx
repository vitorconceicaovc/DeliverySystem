import { type } from 'os'
import { useEffect, useState } from 'react';
import { useFormatter } from '../../libs/useFormatter';
import styles from './styles.module.css'

type Props = {
    color: string;
    count: number;
    onUpdateCount: (newCount: number) => void;
    min?: number;
    max?: number;
}

export const Quantity = ({ color, count, onUpdateCount, min, max }: Props) => {

    const formatter = useFormatter();

    const [canRemove, setCanRemove] = useState(false);
    const [canAdd, setCanAdd] = useState(false);

    useEffect(()=>{
        setCanRemove(( !min || (min && count > min) ) ? true : false );
        setCanAdd(( !max || (max && count < max) ) ? true : false );
    },[count, min, max]);

    const handleRemove = () => {
        if(canRemove) {
            onUpdateCount(count -1)
        }
        
    }

    const handleAdd= () => {
        if(canAdd) {
            onUpdateCount(count +1)
        }
        
    }




    return(
        <div className={styles.container}>
            <div 
                className={styles.button}
                onClick={handleRemove}
                style={{
                    color: canRemove? '#FFF' : '#96A3AB',
                    backgroundColor: canRemove? color : '#F2F4F5'
                }}
            >-</div>
            <div className={styles.qt}>{formatter.formatQuantity(count, 1)}</div>
            <div 
                className={styles.button}
                onClick={handleAdd}
                style={{
                    color: canAdd? '#FFF' : '#96A3AB',
                    backgroundColor: canAdd? color : '#F2F4F5'
                }}
            >+</div>
        </div>
    )
}