import { getCookie } from 'cookies-next';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { Banner } from '../../components/Banner';
import { ProductItem } from '../../components/ProductItem';
import SearchInput from '../../components/SearchInput';
import { Sidebar } from '../../components/Sidebar';
import { useAppContext } from '../../contexts/app';
import { useAuthContext } from '../../contexts/auth';
import { UseApi } from '../../libs/useApi';
import styles from '../../styles/Home.module.css';
import { Product } from '../../types/Product';
import { Tenant } from '../../types/Tenant';
import { User } from '../../types/User';
import NoItemsIcon from '../../public/assets/noitems.svg'


const Home = (data: Props) => {

  const {setToken, setUser} = useAuthContext();

  const {tenant, setTenant} = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant);
    setToken(data.token);
    if(data.user) setUser(data.user);
  }, [] );

  const [products, setProducts] = useState<Product[]>(data.products);

  const [sidebarOpen, setSidebarOpen] = useState(false)

  //searsh
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchText, setSearchText] = useState('');
  const handleSearch = (value: string) => setSearchText(value)
  useEffect(() => {
      let newFilteredProducts: Product[] = [];
      for (let product of data.products) {
        if (product.name.toLowerCase().indexOf(searchText.toLocaleLowerCase()) > -1) {
          newFilteredProducts.push(product)
        }
      }
      setFilteredProducts(newFilteredProducts);
  }, [searchText]);
  

  return (
    <div className={styles.container}>
        <header className={styles.header} >
          <div className={styles.headerTop} >
            <div className={styles.headerTopLeft} >
              <div className={styles.headerTitle} >Be Welcome</div>
              <div className={styles.headerSubTitle} >What do you want today?</div>
            </div>
            <div className={styles.headerTopRight} >
              <div 
                className={styles.menuButton} 
                onClick={() => setSidebarOpen(true)}
              >
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}} ></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}} ></div>
                <div className={styles.menuButtonLine} style={{backgroundColor: tenant?.mainColor}} ></div>
              </div>
              <Sidebar
                  tenant={data.tenant}
                  open={sidebarOpen}
                  onClose={() => setSidebarOpen(false) }
              />
            </div>
          </div>
          <div className={styles.headerBottom} >
            <SearchInput
              onSearch={handleSearch}
            />
          </div>
        </header>

        {searchText && 
          <>
        
            <div className={styles.searchText}>
              Looking for <strong>{searchText}</strong>
            </div>

            {filteredProducts.length > 0 &&
            
              <div className={styles.grid}>
                {filteredProducts.map((item, index) => (
                  <ProductItem
                  key={index}
                  data={item}
                  />
                ))}

              </div>
            }

            {filteredProducts.length === 0 && 
            
              <div className={styles.noProducts}>
                <NoItemsIcon color='#E0E0E0'/>
                <div className={styles.noProductsText}>Oops! There are no intes with this name</div>
              </div>  
            }
        
          </>
        }

        {!searchText && <>
        
          <Banner/>

            <div className={styles.grid}>

              {products.map((item, index) => (
                <ProductItem
                key={index}
                data={item}
                />
              ))}

            </div>
        
        </>}
        

    </div>
  )
}

export default Home;

type Props = {
  tenant: Tenant;
  products: Product[];
  token: string;
  user: User | null;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = UseApi(tenantSlug as string );

  //GET TENANT
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false  } }
  }

  // Get Logged User
  const token = getCookie('token', context)
  const user = await api.authorizeToken(token as string);

  // Get Products

  const products = await api.getAllProduct();

  return {
    props: {
      tenant,
      products,
      user,
      token
    }
  }
}