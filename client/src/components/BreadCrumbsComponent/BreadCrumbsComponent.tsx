import * as React from 'react';
import { useSelector } from 'react-redux';
import { setCurrentDir } from '../../redux/slices/filesSlice';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './BreadCrumbsComponent.module.scss'

export const BreadCrumbsComponent = React.memo(() => {
  const dispatch = useAppDispatch()
  const pathStack = useSelector((state: RootState) => state.files.pathStack)
  const mappedStack = pathStack.map(elem => <li onClick={() => clickHandler(elem)} key={elem}>{elem ? elem : 'root'}</li>)

  function clickHandler(name: string) {
    dispatch(setCurrentDir(name))
  }
  console.log("bread перерисовка")
  return (
    <div className={styles.main}>
      <ul>
        {mappedStack}
      </ul>
    </div>
  );

})