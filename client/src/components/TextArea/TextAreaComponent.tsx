import { TextField } from "@mui/material"
import { useState } from "react"
import { useSelector } from "react-redux"
import { FileType } from "../../api/api"
import { changeAreaValue } from "../../redux/slices/textAreaSlice"
import { RootState, useAppDispatch } from "../../redux/store"

type TextAreaProps = {
  fileId: string
}

export const TextAreaComponent: React.FC<TextAreaProps> = ({ fileId }) => {
  const dispatch = useAppDispatch()
  const textArea = useSelector((state: RootState) => state.textArea)
  const file = useSelector((state: RootState) => state.files.files.find(el => el._id === fileId) as FileType)
  function changeValue(e: React.ChangeEvent<HTMLInputElement>) {
    dispatch(changeAreaValue(e.target.value))
  }
  return (
    <> {textArea.isSeen &&
      <TextField
        onDoubleClick={(e) => e.stopPropagation()}
        variant='standard'
        value={textArea.value}
        onChange={changeValue}
        sx={{ padding: '0 3px', width: '300px' }}
      />}

    </>
  )
}