import SortComponent from "../SortComponent/SortComponent"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";
import { ChangeEvent } from "react";
import { outDir, uploadFileThunk } from "../../redux/slices/filesSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from './MainOptions.module.scss'
import React from "react";
import { useSelector } from "react-redux";
import path from "path";
type MainOptionsProps = {
  setVisiblePopUp: (bool: boolean) => void
  currentDir: string
}

export const MainOptions: React.FC<MainOptionsProps> = React.memo(({ setVisiblePopUp, currentDir }) => {
  const dispatch = useAppDispatch()
  const pathStack = useSelector((state: RootState) => state.files.pathStack)

  function backClickHandler() {
    if (pathStack.length > 1) {
      dispatch(outDir())
    }
  }
  async function uploadFileHandler(event: ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files
    if (fileList) {
      const files = Array.from(fileList)
      files.forEach(file => dispatch(uploadFileThunk({ file, currentDir })))
    }
  }
  console.log('Перерисовка мейнопшнс')
  return (
    <header>
      <div className={styles.leftSide}>
        <div>
          <ArrowBackIcon
            color={pathStack.length > 1 ? 'primary' : 'disabled'}
            onClick={backClickHandler}
            style={{ cursor: pathStack.length > 1 ? 'pointer' : '' }}
          />
        </div>
        <div>
          <Button
            className={styles.createDirButton}
            variant="outlined"
            color="primary"
            onClick={() => setVisiblePopUp(true)}
          >
            Создать папку
          </Button>
        </div>
        <div>
          <Button variant="contained" component="label">
            Загрузить файл
            <input hidden accept="image/*" multiple type="file" onChange={uploadFileHandler} />
          </Button>
        </div>
      </div>
      <div className={styles.rightSide}>
        <SortComponent />
      </div>
    </header>
  )
}
)
export default React.memo(MainOptions)