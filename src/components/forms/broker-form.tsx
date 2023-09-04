import { FormEvent } from 'react';
import { Box, Container, FormLabel, TextField } from '@mui/material';
import SubmitButton from '../submit-button';
import Title from '../title';
import ErrorMessage from '../error-message';

interface BrokerFormProps {
  title: string
  onHandleSubmit: (event: FormEvent<HTMLFormElement>) => void
  loading: boolean
  errorMessage?: string
}

export default function BrokerForm({ title, onHandleSubmit, loading, errorMessage }: BrokerFormProps) {
  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Title>{title}</Title>

      <Box component="form" onSubmit={onHandleSubmit} sx={{ display: 'flex', flexDirection: 'column' }}>
        <FormLabel>Nome</FormLabel>
        <TextField name="acronym" />

        <FormLabel>Razão Social</FormLabel>
        <TextField name="name" />

        <FormLabel>CNPJ</FormLabel>
        <TextField name="cnpj" />

        <SubmitButton loading={loading}>Salvar</SubmitButton>
      </Box>

      <ErrorMessage>{errorMessage}</ErrorMessage>
    </Container>
  );
}
