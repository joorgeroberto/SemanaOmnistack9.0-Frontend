import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from "../../services/api";

import './styles.css'

export default function Dashboard() {
  const [spots, setSpots] = useState([]);

  // Relembrando... useEffect pode ser usado no lugar do ComponentWillMount e do ComponentWillUpdate
  // para carregar as informações logo que o componente é chamado e atualizar a tela quando atualizamos informações.
  // Primeiro parametro: Uma função.
  // Segundo parametro: Um array de dependencias com algumas variaveis e quando estas variáveis atualizarem nós atualizaremos a tela.
  //                    Se quisermos que ele funcione como o ComponentWillMount, deixamos o array de dependencias vazio.
  useEffect(() => {
    // Não podemos usar hooks com async então faremos uma função dentro dele para carregar os spots
    async function loadSpots() {
      const user_id = localStorage.getItem('user');
      const response = await api.get('/dashboard', {
        headers: { user_id }
      });

      console.log(response.data);
      setSpots(response.data);
    }

    loadSpots();
  }, []);

  return (
    <>
      <ul className="spot-list">
        {/* Percorreremos a lista de spots que buscamos no backend e para cada elemento renderizaremos. */}
        {spots.map( spot => (
          <li key={spot._id}>
            {console.log(spot)}
            <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
            <strong>{spot.company}</strong>
            <span>{spot.price ? `R$${spot.price}/dia` : "GRATUITO"}</span>
          </li>
        ))}
      </ul>
      
      <Link to={"/new"} >
        <button className="btn"> Cadastrar novo spot</button>
      </Link>
    </>
  );
}