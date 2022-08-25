import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput';
import { useAppContext } from '../../contexts/AppContext';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Tenant } from '../../types/Tenant';


const Home = (data: Props) => {

  const {tenant, setTenant} = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant)
  }, [] )


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
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}} ></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}} ></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}} ></div>
              </div>
            </div>
          </div>
          <div className={styles.headerBottom} >
            <SearchInput
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
          />
          <ProductItem
            data={{ 
              id: 1,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
          />
          <ProductItem
            data={{ 
              id: 1,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
          />
          <ProductItem
            data={{ 
              id: 1,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
          />
          <ProductItem
            data={{ 
              id: 1,
              image: '/tmp/burguer.png',
              categoryName: 'Traditional',
              name: 'Texas Burguer',
              price: '€ 8.50'
            }}
          />
         
          
        </div>

    </div>
  )
}

export default Home;

type Props = {
  tenant: Tenant
}

//erro da aula 36

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string );

  //GET TENANT
  const tenant = await api.getTenant();
  if (!tenant) {
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