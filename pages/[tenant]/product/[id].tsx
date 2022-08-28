import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { Header } from '../../../components/Header';
import { useAppContext } from '../../../contexts/AppContext';
import { useApi } from '../../../libs/useApi';
import styles from '../../../styles/Product-id.module.css';
import { Product } from '../../../types/Product';
import { Tenant } from '../../../types/Tenant';


const Product = (data: Props) => {

  const {tenant, setTenant} = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant)
  }, [] )

  

  return (
    <div className={styles.container}>
       <Head>
            <title>{data.product.name} | {data.tenant.name}</title>
       </Head>

       <div className={styles.headerArea}>
            <Header
                color={data.tenant.mainColor}
                backHref={`/${data.tenant.slug}`}
                title='Product'
                invert
            
            />
       </div>

       <div className={styles.headerBg} style={{backgroundColor:data.tenant.mainColor}} >

       </div>

       <div className={styles.productImage}>
            <img src={data.product.image} alt="" />
       </div>

       ...

    </div>
  )
}

export default Product;

type Props = {
  tenant: Tenant,
  product: Product
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug, id } = context.query;
  const api = useApi(tenantSlug as string );

  //GET TENANT
  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false  }
    }
  }

  // Get Product

  const product = await api.getProduct(id as string);

  return {
    props: {
      tenant,
      product
    }
  }
}