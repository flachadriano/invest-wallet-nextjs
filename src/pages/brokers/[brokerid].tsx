import BrokerForm from '@/components/forms/broker-form';
import putApi from '@/lib/put-api';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';

export default function BrokerEditPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);
    putApi(`/api/brokers/${router.query.brokerid}`, data)
      .then(res => {
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          router.push('/brokers');
        }
      })  
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <BrokerForm
      title="Alterar corretora"
      loading={loading}
      onHandleSubmit={onSave}
      errorMessage={errorMessage}
    />
  );
}
