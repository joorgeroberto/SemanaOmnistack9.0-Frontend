// Neste arquivo criaremos as rotas da nossa aplicação (Mudanças de tela)
import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from './pages/Login'
import Dashboard from "./pages/Dashboard";
import New from "./pages/New";

export default function Routes() {
  return (
    /* Por padrão o BrowserRouter deixa todas as rotas serem chamadas ao mesmo tempo.
       Se quisermos evitar isto usaremos Switch */
    <BrowserRouter>
      {/* Com o Switch apenas uma rota é chamada por vez */}
      <Switch>
        {/* Com exact a rota só será chamada se o nome da rota for exatamente o indicado no caminho (path) */}
        <Route path="/" exact component={Login} />
        <Route path="/dashboard" exact component={Dashboard} />
        <Route path="/new" exact component={New} />
      </Switch>
    </BrowserRouter>
  )
}