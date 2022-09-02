import { useAuthContext } from '../../contexts/auth'
import { Tenant } from '../../types/Tenant';
import { Button } from '../Button';
import styles from './styles.module.css'
import CloseIcon from './close.svg'
import { SidebarMenuItem } from '../SidebarMenuItem';
import { useRouter } from 'next/router';

type Props = {
    tenant: Tenant;
    open: boolean;
    onClose: () => void;
}

export const Sidebar = ({tenant, open, onClose}: Props) => {

    const { user, setToken } = useAuthContext();

    const router = useRouter();

    return (
        <div 
            className={styles.container}
            style={{
                width: open ? '100vw' : '0'
            }}
        >
            <div className={styles.area}>
                <div className={styles.header}>
                    <div 
                        className={styles.loginArea}
                        style={{ borderBottomColor: tenant.mainColor }}
                        >
                        {user &&
                            <div className={styles.userInfo}>
                                <strong>{user.name}</strong>
                                ultimo pedido a y dias
                            </div>
                        }
                        {!user &&
                            <Button
                                color={tenant.mainColor}
                                label='LogIn'
                                onClick={() => router.push(`/${tenant.slug}/login`)}
                                fill
                            />
                        }
                    </div>
                    <div 
                        className={styles.closeBtn}
                        style={{color: tenant.mainColor}}
                        onClick={onClose}
                    ><CloseIcon/></div>
                </div>
                <div className={styles.line}></div>
                <div className={styles.menu}>
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon='menu'
                        label='Menu'
                        onClick={() => {onClose()}}
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon='cart'
                        label='Bag'
                        onClick={() => router.push(`/${tenant.slug}/cart`)}
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon='fav'
                        label='Favorites'
                        onClick={() => {}}
                        disabled
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon='order'
                        label='My requests'
                        onClick={() => router.push(`/${tenant.slug}/orders`)}
                    />
                    <SidebarMenuItem
                        color={'#6A7D8B'}
                        icon='config'
                        label='settings'
                        onClick={() => {}}
                        disabled
                    />
                    
                </div>
                <div className={styles.menuBottom}>
                    {user && 
                        <SidebarMenuItem
                            color={'#6A7D8B'}
                            icon='logout'
                            label='LogOut'
                            onClick={() => {
                                setToken('')
                                onClose();
                            }}
                        />
                    }
                </div>
            </div>
        </div>
    )
}