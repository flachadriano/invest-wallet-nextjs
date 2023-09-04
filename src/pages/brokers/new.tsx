import BrokerForm from '@/components/forms/broker-form';
import postApi from '@/lib/post-api';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export default function BrokerNewPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const onSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);
    postApi('/api/brokers', data)
      .then((res: any) => {
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          router.push('/brokers');
        }
      })  
      .catch((e: any) => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <BrokerForm
      title="Adicionar Corretora"
      loading={loading}
      onHandleSubmit={onSave}
      errorMessage={errorMessage}
    />
  );
}
