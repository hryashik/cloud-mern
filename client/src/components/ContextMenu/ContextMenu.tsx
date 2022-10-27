import { contextMenuType } from '../../pages/Main/Main'
import styles from './ContextMenu.module.scss'


type ContextProps = {
  contextMenu: { visible: boolean, coordinates: number[] }
  setContextMenu: ({ visible, coordinates }: contextMenuType) => void
  contextMenuDelete: () => void
  renameFile: () => void
}

export const ContextMenu: React.FC<ContextProps> = (
  { setContextMenu, contextMenu, contextMenuDelete, renameFile }) => {
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
        <li onClick={renameFile}>Переименовать</li>
        <li onClick={contextMenuDelete}>Удалить</li>
      </ul>
    </div>
  )
}