import React, { useState, useMemo } from 'react';
import api from '../../services/api'

import camera from '../../assets/camera.svg'

import './styles.css'

export default function New({ history }) {
  const [company, setCompany] = useState('');
  const [techs, setTechs] = useState('');
  const [price, setPrice] = useState('');
  const [thumbnail, setThumbnail] = useState(null);

  /*useMemo observa uma variável e toda vez que essa variavel muda ele gera um valor para outra variavel selecionada*/
  /*Por exemplo, colocamos para que quando thumbnail mudar, price também muda*/
  /*Como no useEffect! Primeiro parametro uma função e segundo parametro um array*/
  const preview = useMemo(
    () => {
      /*createObjectURL criar um URL para uma variavel temporaria que o upload ainda não foi feito.
      * Usaremos isto para apenas mostrar a imagem selecionada no imput*/
      return thumbnail ? URL.createObjectURL(thumbnail) : null
    },[thumbnail]);

  async function handleSubmit(event) {
    event.preventDefault();
    const user_id = localStorage.getItem('user');

      /*Como não usamos JSON e fim Mulpart Form, temos que criar uma estrutura de dadps data para adicionar os dados com append e
          depois enviar como um JSON*/
    const data = new FormData();
    data.append('thumbnail', thumbnail);
    data.append('company', company);
    data.append('techs', techs);
    data.append('price', price);


    await api.post('./spots', data, {
      headers: {user_id} // Arquivo de headers com informacoes do usuario logado.
    });

    //console.log(response);

    history.push('./dashboard');
  }

  return (
    <form onSubmit={handleSubmit}>
      {/*Input da imagem*/}
      <label
        id="thumbnail"
        style={{backgroundImage: `url(${preview})`}}
        className={thumbnail ? 'has-thumbnail' : ''}
      >
        {/*Usamos o '[0]' pois 'files' sempre é um vetor.
        Usamos o '[0]' para pegar sempre o primeiro elemento (o que o usuario selecionou).*/}
        <input type="file" onChange={event => setThumbnail(event.target.files[0])} />
        <img src={camera} alt="Select img" />
      </label>
      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        placeholder="Sua empresa incrível"
        value={company}
        onChange={event => setCompany(event.target.value)}
      />
      <label htmlFor="company">TECNOLOGIAS * <span>(separadas por vírgula)</span></label>
      <input
        id="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={event => setTechs(event.target.value)}
      />
      <label htmlFor="company">VALOR DA DIÁRIA * <span>(deixe em branco caso seja GRATUITO)</span></label>
      <input
        id="price"
        placeholder="Valor cobrado por dia?"
        value={price}
        onChange={event => setPrice(event.target.value)}
      />
      <button type="submit" className="btn">Cadastrar</button>
    </form>
  );
}