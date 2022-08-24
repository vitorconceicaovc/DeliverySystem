import { GetServerSideProps } from 'next';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput';
import { getTenantResponse, useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';


const Home = (data: Props) => {


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
                <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}} ></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}} ></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: data.tenant.mainColor}} ></div>
              </div>
            </div>
          </div>
          <div className={styles.headerBottom} >
            <SearchInput
              mainColor={data.tenant.mainColor}
              onSearch={handleSearch}
            />
          </div>
        </header>
        <Banner/>
        <div className={styles.grid}>
          <ProductItem
            data={{ 
              id: 1,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
            mainColor={data.tenant.mainColor}
            secondColor={data.tenant.secondColor}
          />
          <ProductItem
            data={{ 
              id: 2,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
            mainColor={data.tenant.mainColor}
            secondColor={data.tenant.secondColor}
          />
          <ProductItem
            data={{ 
              id: 3,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
            mainColor={data.tenant.mainColor}
            secondColor={data.tenant.secondColor}
          />
          <ProductItem
            data={{ 
              id: 4,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
            mainColor={data.tenant.mainColor}
            secondColor={data.tenant.secondColor}
          />
          <ProductItem
            data={{ 
              id: 5,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
            mainColor={data.tenant.mainColor}
            secondColor={data.tenant.secondColor}
          />
          
        </div>

    </div>
  )
}

export default Home;

type Props = {
  tenant: getTenantResponse
}

//erro da aula 36

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi();

  //GET TENANT
  const tenant = await api.getTenant(tenantSlug as string);
  if(!tenant) {
    return {
      redirect: {
        destination: '/'
      }
    }
  }


  return {
    props: {
      tenant
    }
  }
}