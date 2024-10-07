import { RenderUserInfo } from '@/components'
import styles from './style.module.scss'

export default function Home() {
  return (
    <div className={styles.page}>
      <RenderUserInfo />
    </div>
  )
}
