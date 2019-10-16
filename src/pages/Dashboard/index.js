import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import socketio from 'socket.io-client'
import api from "../../services/api";

import './styles.css'

export default function Dashboard() {
  const [spots, setSpots] = useState([]);
  const [requests, setRequests] = useState([]);

  const user_id = localStorage.getItem('user');
  // Enviando o user_id para o backend.
  const socket = useMemo(() => socketio('http://localhost:3333', {
    query: { user_id },
  }), [user_id]);

  useEffect(() => {

    // Toda vez que receber uma mensagem com o nome de "hello" vai printar o conteudo na tela.
    /*socket.on('hello', data => {
      console.log(data);
    });*/
    socket.on('booking_request', data => {
      //console.log(data);
      setRequests([...requests, data])
    });
  }, [requests, socket]);

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

  async function handleAccept(id) {
    await api.post(`/bookings/${id}/approvals`);

    // Filtra as requisições e remove a que acabamos de aprovar.
    // Ou seja, percorre as requests e só deixa as que possuem requests diferentes do que acabamos de aprovar.
    setRequests(requests.filter(request => request._id !== id));
  }

  async function handleReject(id) {
    await api.post(`/bookings/${id}/rejections`);

    setRequests(requests.filter(request => request._id !== id));
  }

  return (
    <>
      <ul className="notifications">
        {requests.map(request => (
          <li key={request._id}>
            <p>
              <strong>{request.user.email} </strong>
               está solicitando uma reserva em
              <strong> {request.spot.company}</strong>
              para a data <strong> {request.date}</strong>.
            </p>
            <button className="accept" onClick={() => handleAccept(request._id)}>ACEITAR</button>
            <button className="reject" onClick={() => handleReject(request._id)}>REJEITAR</button>
          </li>
        ))}
      </ul>
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