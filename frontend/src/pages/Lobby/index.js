import React, { useState } from 'react'

import { useHistory, Link } from 'react-router-dom'

import './styles.css'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Lobby(){

  const [username, setUsername] = useState('')
  const history = useHistory();

  function handleJoinGame(){
    history.push('/criarcarta')
  }

  return (
    <div className="lobbyContainer">
      <h1 className="mb-4">CCHZINHO</h1>
      <div className="formContainer">
        <form>
          <div className="input-group">
            <input className="form-control mr-3" type="text" placeholder="Seu nick"/>
            <button className="btn btn-outline-primary" type="submit">Entrar no jogo</button>
          </div>
        </form>
      </div>
      <Link to='/criarcarta'>Ou adicione cartas ao baralho</Link>
    </div>
  )
}