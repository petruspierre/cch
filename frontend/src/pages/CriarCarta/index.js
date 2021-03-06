import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'

import api from '../../services/api'

import { FiTrash2 } from 'react-icons/fi'

import '../../globalStyles.css'
import './styles.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function CriarCarta() {

  const [listaCartasVermelhas, setListaCartasVermelhas] = useState([])
  const [listaCartasVerdes, setListaCartasVerdes] = useState([])
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')

  const [listaCartasDados, setListaCartasDados] = useState([])
  const [totalCartas, setTotalCartas] = useState(0)

  async function handleSubmit(e) {
    e.preventDefault()

    const data = {
      type,
      description,
    }

    if(data.type === "" || data.description === ""){
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

  async function handleDeleteCard(id) {
    try {
      await api.delete(`deck/${id}`)
      loadCartas(listaCartasDados)
    } catch(err){
      alert(err)
    }
  }

  function loadCartas(data){
    const cartas = data;

    setListaCartasVermelhas(
      cartas
      .filter((carta) => carta.type === "red")
      .map((carta) => <li key={carta.id} className="text-break bg-danger card-body w-100 text-white rounded shadow mt-2">
        <p>{carta.description}</p>
        <span>{carta.id}</span>
        <button style={lixeiraStyle} className="btn" type="button" onClick={() => handleDeleteCard(carta.id)}>
          <FiTrash2 size={20} color="#eee" />
        </button>
      </li>))

    setListaCartasVerdes(cartas
      .filter((carta) => carta.type === "green")
      .map((carta) => <li key={carta.id}  className="text-break bg-success card-body w-100 text-white rounded shadow mt-2">
        <p>{carta.description}</p>
        <span>{carta.id}</span>
        <button style={lixeiraStyle} className="btn" type="button" onClick={() => handleDeleteCard(carta.id)}>
          <FiTrash2 size={20} color="#eee" />
        </button>
      </li>))
  }
  
  useEffect(() => {
    api.get('deck').then(res => {
      setListaCartasDados(res.data)
      loadCartas(res.data)
      setTotalCartas(res.headers['x-total-count'])
    })
  }, [listaCartasDados])

  return (
    <div className="container_">

      <header className="App-header">
        <p className="title">
          Criação de cartas
        </p>
      </header>

      <div className="formContainer">
        <form onSubmit={handleSubmit} className="w-50">
            <input
              className="form-control"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Descrição da carta"
            />

          <div className="d-flex justify-content-center align-items-center mt-2">
            <div className="form-check">
              <input className="form-check-input" type="radio" name="type" id="typeGreen" value="green" onChange={e => setType(e.target.value)}></input>
              <label className="form-check-label" htmlFor="green"> Verde </label>
            </div>
            <div className="form-check">
              <input className="form-check-input ml-1" type="radio" name="type" id="typeRed" value="red" onChange={e => setType(e.target.value)}></input>
              <label className="form-check-label ml-4" htmlFor="red"> Vermelha </label>
            </div>
          </div>
          
          <div className="d-flex flex-column justify-content-center align-items-center">

            <button type="submit" className="btn btn-outline-primary mt-2 mb-3 w-75">
              Enviar carta
            </button>

            <p style={{fontSize:12}}>Total de cartas: {totalCartas}</p>
            <Link to="/">Voltar ao início</Link>

          </div>
        </form>

      </div>

      <div className="d-flex">
        <section className="mr-5">
          <ul>{listaCartasVermelhas}</ul>
        </section>
        <section>
          <ul>{listaCartasVerdes}</ul>
        </section>
      </div>

    </div>
  );
}

const lixeiraStyle = {
  position: 'absolute',
  bottom: 3,
  right: 3,
  margin: 0,
  padding: 0
}

export default CriarCarta;
