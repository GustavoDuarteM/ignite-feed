import { Avatar } from './Avatar';
import styles from './Sidebar.module.css'
import { PencilLine } from "@phosphor-icons/react";

export function SideBar() {
  return(
  <aside className={styles.sidebar}>
    <img
      className={styles.cover} 
      src="https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=435&q=50" 
    />
    <div className={styles.profile}>
      <Avatar src="https://github.com/GustavoDuarteM.png"/>
      <strong>Gustavo Darte</strong>
      <span>Web Developer</span>
    </div>
    <footer>
      <a href="#">
        <PencilLine size={20}/>
        Editar seu perfil
      </a>
    </footer>
  </aside>  
  );
}