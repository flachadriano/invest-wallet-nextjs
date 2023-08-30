import { LoadingButton } from "@mui/lab";
import { Alert, Box, Button, FormGroup, FormLabel, TextField } from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { SyntheticEvent, useState } from "react";
import { useRef } from "react";

export default function SigninPage() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ loading, setLoading ] = useState(false);

  const onHandleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    setErrorMessage('');
    setLoading(true);

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    signIn('credentials', { redirect: false, email, password })
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
    <Box sx={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <h1>Entrar</h1>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <FormGroup>
          <div>
            <FormLabel>E-mail</FormLabel><br/>
            <TextField ref={emailRef} type="email" />
          </div>
          <div>
            <FormLabel>Senha</FormLabel><br/>
            <TextField ref={passwordRef} type="password" />
          </div>
          {errorMessage && <FormLabel sx={{ mt: 1, color: "red" }}>{errorMessage}</FormLabel>}
          <LoadingButton sx={{mt: 1}} variant="contained" loading={loading} loadingPosition="end" onClick={onHandleSubmit}>
            <span>Entrar</span>
          </LoadingButton>
        </FormGroup>
        </Box>
    </Box>
  );
}
