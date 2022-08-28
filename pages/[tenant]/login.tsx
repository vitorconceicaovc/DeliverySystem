import { GetServerSideProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { InputField } from '../../components/InputField';
import { useAppContext } from '../../contexts/AppContext';
import { useApi } from '../../libs/useApi';
import styles from '../../styles/Login.module.css';
import { Tenant } from '../../types/Tenant';


const Login = (data: Props) => {

  const {tenant, setTenant} = useAppContext();

  useEffect(()=>{
    setTenant(data.tenant)
  }, [] )

  const router = useRouter()


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
          <title>Login | {data.tenant.name}</title>
      </Head>
      <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}`} />

      <div className={styles.header}>{data.tenant.name}</div>

      <div 
        className={styles.subtitle}
        style={{borderBottomColor: data.tenant.mainColor}}


      >Use your credentials to login.</div>



      <div className={styles.line}></div>

      <div className={styles.formArea}>

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
            label="LogIn"
            onClick={handleSubmit}
            fill
          />
        </div>

      </div>

      <div 
        className={styles.forgetArea}
        style={{borderBottomColor: data.tenant.mainColor}}
      >
        Forgot your password? <Link href={`/${data.tenant.slug}/forget`} ><a style={{color:data.tenant.mainColor}} >Click here</a></Link>  
      </div>

      <div className={styles.line}></div>

      <div className={styles.signupArea}>
        <Button
          color={data.tenant.mainColor}
          label="Register"
          onClick={handleSighUp}
        />
      </div>


    </div>
  )
}

export default Login;

type Props = {
  tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { tenant: tenantSlug } = context.query;
  const api = useApi(tenantSlug as string );

  const tenant = await api.getTenant();
  if (!tenant) {
    return { redirect: { destination: '/', permanent: false  } }
  }


  return {
    props: {
      tenant
    }
  }
}