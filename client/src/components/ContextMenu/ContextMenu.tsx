import { contextMenuType } from '../../pages/Main/Main'
import styles from './ContextMenu.module.scss'


type ContextProps = {
  contextMenu: { visible: boolean, coordinates: number[] }
  contextMenuDelete: () => void
  contextMenuRename: () => void
  hiddenContext: () => void
}

export const ContextMenu: React.FC<ContextProps> = (
  { contextMenu, contextMenuDelete, contextMenuRename, hiddenContext }) => {
  const x = contextMenu.coordinates[0]
  const y = contextMenu.coordinates[1]
  return (
    <div
      className={styles.wrapper}
      onClick={hiddenContext}
      onContextMenu={(e) => e.preventDefault()}>
      <ul
        className={styles.contextMenu}
        onClick={(e) => e.stopPropagation()}
        style={{ left: x, top: y }}
      >
        <li onClick={contextMenuRename}>Переименовать</li>
        <li onClick={contextMenuDelete}>Удалить</li>
      </ul>
    </div>
  )
}