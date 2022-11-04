import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { changeSort, SortType } from '../../redux/slices/filesSlice';
import React, { ChangeEvent } from 'react';
import { RootState, useAppDispatch } from '../../redux/store';
import { useSelector } from 'react-redux';

export default function SortComponent() {
  const dispatch = useAppDispatch()
  const selectedSort = useSelector((state: RootState) => state.files.sortType)
  function onChangeSelect(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value as SortType
    dispatch(changeSort(value))
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Сортировка
        </InputLabel>
        <NativeSelect
          onChange={onChangeSelect}
          value={selectedSort}
        >
          <option value={'name'}>По названию</option>
          <option value={'type'}>По типу</option>
          <option value={'size'}>По размеру</option>
        </NativeSelect>
      </FormControl >
    </Box >
  );
}
