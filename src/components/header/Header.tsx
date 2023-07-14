import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <header className={styles.header}>
            <div>
                <NavLink to='/'>
                    <img src={logo} alt="logo" />
                </NavLink>
            </div>
        </header>
    )
}

export default Header