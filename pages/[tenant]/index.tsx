import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';


const Home = (data: Props) => {

  const {tenant, setTenant} = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant)
  }, [] );

  const [products, setProducts] = useState<Product[]>(data.products);

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

          {products.map((item, index) => (
            <ProductItem
            key={index}
            data={item}
            />
          ))}

          
          
        </div>

    </div>
  )
}

export default Home;

type Props = {
  tenant: Tenant,
  products: Product[]
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string );

  //GET TENANT
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false  } }
  }

  // Get Products

  const products = await api.getAllProduct();

  return {
    props: {
      tenant,
      products
    }
  }
}