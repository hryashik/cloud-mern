import { AvatarAlert } from '../../components/AvatarAlert/AvatarAlert'
import styles from './Profile.module.scss'

const Profile: React.FC = () => {
  return (
    <div className={styles.main}>
      <h1>profile</h1>
      <AvatarAlert />
    </div>
  )
}

export default Profile