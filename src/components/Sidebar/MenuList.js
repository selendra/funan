import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routes } from '../../routes';
import docs from "assets/sidebar-icons/docs.svg";
import about from "assets/sidebar-icons/about.svg";
import setting from "assets/sidebar-icons/setting.svg";

const buttomMenus = [
  {
    icon: docs,
    name: "Docs",
    path: "https://docs.selendra.org/",
    disable: false,
    external: true,
  },
  {
    icon: about,
    name: "About",
    path: "https://www.selendra.org/about",
    disable: false,
    external: true,
  },
  {
    icon: setting,
    name: "Settings",
    path: "/settings",
    disable: false,
    external: false,
  },
];

export default function MenuList() {
  const location = useLocation();
  const active = (path) => path === location.pathname;

  const sidebarTop = routes.map((i) => {
    if(!i.name) return null;
    return {
      key: i.path,
      icon: 
        <img 
          className='sidebar-itemIcon' 
          style={active(i.path) ? {filter: 'grayscale(0%)'} : {}} 
          src={i.icon} alt='' width={40} height={40} 
        />,
      label: (
        <Link to={i.path}>
          <p className={`sidebar-itemTitle ${active(i.path) && 'sidebar-itemActive'}`}>{i.name}</p>
        </Link>
      ),
    }   
  })

  const sidebarBottom = buttomMenus.map((i) => {
    return {
      key: i.path,
      icon: 
        <img 
          className='sidebar-itemIcon' 
          style={active(i.path) ? {filter: 'grayscale(0%)'} : {}} 
          src={i.icon} alt='' width={40} height={40} 
        />,
      label: (
        i.external ?
        <a href={i.path} target='_blank' rel="noreferrer">
          <p className={`sidebar-itemTitle ${active(i.path) && 'sidebar-itemActive'}`}>{i.name}</p>
        </a>
        :
        <Link to={i.path}>
          <p className={`sidebar-itemTitle ${active(i.path) && 'sidebar-itemActive'}`}>{i.name}</p>
        </Link>
      ),
    } 
  })

  return (
    <div>
      <Menu
        className="sidebar-menu sidebar-top"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarTop}
      />

      <Menu
        className="sidebar-menu"
        mode="inline"
        selectedKeys={[location.pathname]}
        items={sidebarBottom}
      />
    </div>
  );
}
