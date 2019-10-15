import React, { useState } from 'react';
import api from "../../services/api";

/* 'history' é uma prop q pode ser usada para navegação*/
export default function Login({ history }) {
  const [email, setEmail] = useState('');

  async function handleSubmit(event) {
    // Desativando o funcionamento padrão. Com isto, quando clicar no botão a tela não será recarregada.
    event.preventDefault();

    // Enviando este email para o backend usando a api criada
    const response = await api.post('/sessions', { email });

    const { _id } = response.data;
    // Granvando o id do usuário no armazenamendo do navegador para que possamos acessar isto em toda a aplicação.
    localStorage.setItem('user', _id);

    history.push('/dashboard');
  }

  return(
    // Não usaremos <div> pois ela exige estilização. Colocaremos um Fragment (<> </>) só para envolver e o react aceitar sem erros.
    <>
      <p>
        Ofereça <strong>spots</strong> para programadores e encontre <strong>talentos</strong> para a sua empresa

        {/*Quando o formulário receber um submit ele ativa esta função*/}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">E-MAIL *</label>
          <input
            type="email"
            id="email"
            value={email}
            /*Toda vez que muda o valor isto aciona um evento. O valor do input está no event.target.value*/
            onChange={event => setEmail(event.target.value)}
            placeholder="Seu melhor e-mail"
          />
          <button className="btn" type="submit">Entrar</button>
        </form>
      </p>
    </>
  );
}