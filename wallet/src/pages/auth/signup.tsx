import { SyntheticEvent } from "react";
import { useRef } from "react";

export default function SignupPage() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const onHandleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;
    const data = { name, email, password };

    fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  };

  return (
    <div>
      <h1>Quero me cadastrar</h1>
      <form onSubmit={onHandleSubmit}>
        <div>
          <label>Nome</label>
          <input name="name" ref={nameRef} />
        </div>
        <div>
          <label>E-mail</label>
          <input name="email" type="email" ref={emailRef} />
        </div>
        <div>
          <label>Senha</label>
          <input name="password" type="password" ref={passwordRef} />
        </div>
        <button type="submit">Criar meu usuário</button>
      </form>
    </div>
  );
}
