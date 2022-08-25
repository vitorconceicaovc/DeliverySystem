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
import styles from '../../styles/Forget.module.css';
import { Tenant } from '../../types/Tenant';


const Forget = (data: Props) => {

const {tenant, setTenant} = useAppContext();

useEffect(()=>{
setTenant(data.tenant)
}, [] )

const router = useRouter()


const [email, setEmail] = useState('');

const handleSubmit = () => {
    router.push(`/${data.tenant.slug}/forget-success`);
}





return (
<div className={styles.container}>
    
    <Head>
        <title>Forgot the password | {data.tenant.name}</title>
    </Head>
    <Header color={data.tenant.mainColor} backHref={`/${data.tenant.slug}/login`} />

    <div className={styles.header}>{data.tenant.name}</div>



    <div className={styles.title}>Forgot your password?</div>


    <div 
    className={styles.subtitle}
    style={{borderBottomColor: data.tenant.mainColor}}


    >
    fill in the field with your email and receive the necessary instructions to reset your password</div>



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
        <Button
        color={data.tenant.mainColor}
        label="Submit"
        onClick={handleSubmit}
        fill
        />
    </div>

    </div>

   


</div>
)
}

export default Forget;

type Props = {
tenant: Tenant
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