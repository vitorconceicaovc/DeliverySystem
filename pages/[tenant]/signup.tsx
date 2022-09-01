import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/SignUp.module.css';
import { Tenant } from '../../types/Tenant';


const SignUp = (data: Props) => {

  const {tenant, setTenant} = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant)
  }, [] )

  const router = useRouter();

  const [name, setName] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = () => {
    
  }

  const handleSighUp = () => {
    router.push(`/${data.tenant.slug}/signup`);
  }



  return (
    <div className={styles.container}>
        
      <Head>
          <title>SighUp | {data.tenant.name}</title>
      </Head>
      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

      <div className={styles.header}>{data.tenant.name}</div>

      <div 
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}


      >fill in the fields to create your registration.</div>



      <div className={styles.line}></div>

      <div className={styles.formArea}>

        <div className={styles.inputArea}>

          <InputField
            color={data.tenant.mainColor}
            placeholder='Type your name'
            value={name}
            onChange={setName}
          />

        </div>

        <div className={styles.inputArea}>

          <InputField
            color={data.tenant.mainColor}
            placeholder='Type your e-mail'
            value={email}
            onChange={setEmail}
          />

        </div>

        <div className={styles.inputArea}>

          <InputField
            color={data.tenant.mainColor}
            placeholder='Type your password'
            value={password}
            onChange={setPassword}
            password
          />

        </div>

        <div className={styles.inputArea}>
          <Button
            color={data.tenant.mainColor}
            label="Register"
            onClick={handleSubmit}
            fill
          />
        </div>

      </div>

      <div 
        className={styles.forgetArea}
      >
        Already Registered? <Link href={`/${data.tenant.slug}/login`} ><a style={{color:data.tenant.mainColor}} >LogIn</a></Link>  
      </div>

      
    </div>
  )
}

export default SignUp;

type Props = {
  tenant: Tenant
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