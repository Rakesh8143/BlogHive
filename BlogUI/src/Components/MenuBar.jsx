import { NavLink } from 'react-router-dom'
import '../Styles/MenuBar.css'

const MenuBar = () => {
  return (
    <aside className='sidebar'>
      <nav>
        <ul className="menu-list">
          <li>
            <NavLink to='/' className="menu-link">🏠 Home</NavLink>
          </li>
          <li>
            <NavLink to='/myposts' className="menu-link">✍️ My Blogs</NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  )
}

export default MenuBar
