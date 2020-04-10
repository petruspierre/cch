import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import CriarCarta from './pages/CriarCarta'
import Lobby from './pages/Lobby'

export default function Routes(){
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Lobby}/>
        <Route path="/criarcarta" component={CriarCarta}/>
      </Switch>
    </BrowserRouter>
  )
}