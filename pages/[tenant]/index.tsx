import SearchInput from '../../components/SearchInput';
import styles from '../../styles/Home.module.css';


const Home = () => {

  const handleSearch = (searchValue: string) => {
    console.log(`You are looking for ${searchValue}`)    
  }

  return (
    <div className={styles.container}>
        <header className={styles.header} >
          <div className={styles.headerTop} >
            <div className={styles.headerTopLeft} >
              <div className={styles.headerTitle} >Be Welcome</div>
              <div className={styles.headerSubTitle} >What do you want today?</div>
            </div>
            <div className={styles.headerTopRight} >
              <div className={styles.menuButton} >
                <div className={styles.menuButtonLine} ></div>
                <div className={styles.menuButtonLine} ></div>
                <div className={styles.menuButtonLine} ></div>
              </div>
            </div>
          </div>
          <div className={styles.headerBottom} >
            <SearchInput
              mainColor='#FB9400'
              onSearch={handleSearch}
            />
          </div>
        </header>
    </div>
  )
}

export default Home;