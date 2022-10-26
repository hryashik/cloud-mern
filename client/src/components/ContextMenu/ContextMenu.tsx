import { contextMenuType } from '../../pages/Main/Main'
import styles from './ContextMenu.module.scss'



type ContextProps = {
  contextMenu: { visible: boolean, coordinates: number[] }
  setContextMenu: ({ visible, coordinates }: contextMenuType) => void
}

export const ContextMenu: React.FC<ContextProps> = ({ setContextMenu, contextMenu }) => {
  const x = contextMenu.coordinates[0]
  const y = contextMenu.coordinates[1]
  function clickHandler() {
    setContextMenu({ visible: false, coordinates: [] })
  }
  return (
    <div
      className={styles.wrapper}
      onClick={clickHandler}
      onContextMenu={(e) => e.preventDefault()}>
      <ul
        className={styles.contextMenu}
        onClick={(e) => e.stopPropagation()}
        style={{ left: x, top: y }}
      >
        <li>Переименовать</li>
        <li>Удалить</li>
      </ul>
    </div>
  )
}