import { useRouter } from "next/router";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { FormEvent, useState } from "react";
import { Box, Button, Container, FormLabel, TextField } from "@mui/material";

import Title from "@/components/title";
import ErrorMessage from "@/components/error-message";
import SubmitButton from "@/components/submit-button";

export default function SigninPage() {
  const router = useRouter();
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const onHandleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const data = new FormData(event.currentTarget);
    const credentials = Object.fromEntries(data);

    signIn('credentials', { redirect: false, ...credentials })
      .then((evt) => {
        if (evt && evt.status == 401) {
          setErrorMessage('E-mail ou senha inválidos.');
        } else {
          router.push('/');
        }
      })
      .catch(() => setErrorMessage('Problemas ao realizar login.'))
      .finally(() => setLoading(false));
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Head>
        <title>Tá investido - Entrar</title>
      </Head>

      <Title>Entrar</Title>

      <Box component="form" onSubmit={onHandleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel>E-mail</FormLabel>
        <TextField name="email" type="email" />

        <FormLabel>Senha</FormLabel>
        <TextField name="password" type="password" />

        <SubmitButton loading={loading}>Entrar</SubmitButton>
        <Button onClick={() => router.push('/auth/signup')} sx={{ mt: 2 }}>Criar conta</Button>
      </Box>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
}
