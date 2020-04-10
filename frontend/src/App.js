import React, { useState, useEffect } from 'react';

import api from './services/api'

import './globalStyles.css'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const [listaCartasVermelhas, setListaCartasVermelhas] = useState([])
  const [listaCartasVerdes, setListaCartasVerdes] = useState([])
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')

  const [listaCartasDados, setListaCartasDados] = useState([])

  async function handleSubmit(e) {
    e.preventDefault()

    const data = {
      type,
      description,
    }

    if(data.type === null || data.description == null){
        alert('Preencha todos os campos')
    } else {
        try {
            await api.post('deck', data)
            const novaLista = [...listaCartasDados, data]
            loadCartas(novaLista)
            setListaCartasDados(novaLista)
        } catch(err) {
            alert(err)
        }
    }

    
  }

  function loadCartas(data){
    const cartas = data;

    setListaCartasVermelhas(
      cartas
      .filter((carta) => carta.type === "red")
      .map((carta) => <li key={carta.id} className="bg-danger card-body w-100 text-white rounded shadow mt-2">
        {carta.description}
        <span>{carta.id}</span>
      </li>))

    setListaCartasVerdes(cartas
      .filter((carta) => carta.type === "green")
      .map((carta) => <li key={carta.id} className="bg-success card-body w-100 text-white rounded shadow mt-2">
        {carta.description}
        <span>{carta.id}</span>
      </li>))
  }
  
  useEffect(() => {
    api.get('deck').then(res => {
      setListaCartasDados(res.data)
      loadCartas(res.data)
    })
  }, [listaCartasDados])

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <header className="App-header">
        <p className="title">
          Criação de cartas
        </p>
      </header>

      <div className="formContainer">

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição da carta"
            />
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="type" id="typeGreen" value="green" onChange={e => setType(e.target.value)}></input>
              <label className="form-check-label" htmlFor="green"> Verde </label>
            </div>
            <div className="form-check">
              <input className="form-check-input ml-1" type="radio" name="type" id="typeRed" value="red" onChange={e => setType(e.target.value)}></input>
              <label className="form-check-label ml-4" htmlFor="red"> Vermelha </label>
            </div>
          </div>
          

          <div className="d-flex justify-content-center align-items-center">

            <button type="submit" className="btn btn-outline-primary mt-2 mb-3 w-50">
              Enviar carta
            </button>

          </div>
        </form>

      </div>

      <div className="d-flex">
        <ul>{listaCartasVermelhas}</ul>
        <ul>{listaCartasVerdes}</ul>
      </div>

    </div>
  );
}

export default App;
