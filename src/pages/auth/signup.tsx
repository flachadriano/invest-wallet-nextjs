import Head from 'next/head';
import { useRouter } from 'next/router';
import { FormEvent, useState } from 'react';
import { Box, Button, Container, FormLabel, TextField } from '@mui/material';

import SubmitButton from '@/components/submit-button';
import ErrorMessage from '@/components/error-message';
import Title from '@/components/title';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);

    setLoading(true);
    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
      .then((res: any) => {
        if (res.error) {
          setErrorMessage(res.error);
        } else {
          router.push('/auth/signin');
        }
      })
      .catch(e => setErrorMessage(e.message))
      .finally(() => setLoading(false));
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Head>
        <title>Tá investido - Cadastrar</title>
      </Head>

      <Title>Quero me cadastrar</Title>

      <Box component="form" onSubmit={onHandleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel>Nome</FormLabel>
        <TextField name="name" required />
      
        <FormLabel>E-mail</FormLabel>
        <TextField name="email" type="email" required />
      
        <FormLabel>Senha</FormLabel>
        <TextField name="password" type="password" required />
      
        <SubmitButton loading={loading}>Cadastrar</SubmitButton>
      </Box>

      <ErrorMessage>{errorMessage}</ErrorMessage>
      <Button onClick={() => router.push('/auth/signin')} sx={{ mt: 2 }}>Já tenho conta</Button>
    </Container>
  );
}
