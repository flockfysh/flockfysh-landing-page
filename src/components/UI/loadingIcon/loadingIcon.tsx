import loadingIcon from '../../../images/icons/loading.svg';
import classes from './loadingIcon.module.css';

export default function LoadingIcon(props: React.ComponentPropsWithRef<'img'>) {
    return (
        <img src={ loadingIcon } alt={ 'Loading...' } { ...props }
             className={ `${classes.loadingIcon} ${props.className || ''}` }/>
    );
}
