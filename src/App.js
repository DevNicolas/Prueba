import React, { useState } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Modal from 'react-modal';
class App extends React.Component {

  constructor(props) {

    super(props)
    this.state = {
      paginas: [],
      personas: [],
      dataPersonas: [],
      dataCompany: [],

    }

    this.openModal = this.openModal.bind(this);

    this.closeModal = this.closeModal.bind(this);

  }
  openModal() {
    this.setState({ modalIsOpen: true });
  }



  closeModal() {
    this.setState({ modalIsOpen: false });
  }



  componentDidMount() {

    this.pagination(1);
    fetch('https://reqres.in/api/users')
      .then(res => res.json())
      .then((data) => {
        this.setState({ paginas: data.data })

      })
      .catch(console.log)
  }

  pagination = (page) => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ personas: json.data }, () => {

        })
      })
      .catch(err => console.error(err))
  }

  personalData = (id) => {
    this.openModal(true)
    fetch(`https://reqres.in/api/users/${id}`)
      .then(response => response.json())
      .then(json => {
        this.setState({ dataPersonas: json.data }, () => {
          this.setState({ dataCompany: json.ad })

        })
      })
      .catch(err => console.error(err))
  }

  render() {

    const { personas, paginas, dataPersonas, dataCompany } = this.state


    return (
      <div className="App">

        <nav class="navbar navbar-light bg-dark">
          <a class="navbar-brand text-light" href="#">Restaurante Omega</a>
        </nav>

        <div className="">
          <div class="card-body ">
            <h5 class="card-title">Clientes Frecuentes</h5>
            <hr />
            <div class="container shadow p-3 mb-5 bg-white rounded ">
              <div class="row">
                {
                  personas.map((data) => (

                    <div className="border col-sm">

                      <p><img src={data.avatar} /><b>Name:</b>  {data.first_name + " " + data.last_name}
                      </p>
                      <p className="Email"><br></br><b>Email:</b><br></br>{data.email}</p>
                      <button className="btn btn-dark " onClick={e => this.personalData(data.id)}>detalles</button>

                    </div>

                  ))
                }

              </div>
            </div>



            <div class="card-body">
              <div class="btn-group" role="group" aria-label="First group">

                {
                  paginas.map((data) => (
                    <div>


                      <button className="btn btn-dark " onClick={e => this.pagination(data.id)}>{data.id}</button>
                    </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>


        <Modal
          isOpen={this.state.modalIsOpen}
          onRequestClose={this.closeModal}

          contentLabel="Example Modal"
        >



          <h2 className="text-center">Datos Personales</h2>
          {
            <div className="text-center">
              <p><b>ID:</b>{dataPersonas.id}</p>
              <p><b>Nombre:</b>{dataPersonas.first_name + " " + dataPersonas.last_name}</p>
              <p><b>Email:</b>{dataPersonas.email}</p>
              <img src={dataPersonas.avatar} />
              <p><b>Empresa:</b>{dataCompany.company}</p>
              <a href={dataCompany.url} target="_blank">Sitio Oficial</a>
              <p><b>Descripcion:</b>{dataCompany.text}</p>

            </div>
          }<div className="col-md-12 text-center">
            <button className="btn btn-dark  " onClick={this.closeModal}>Cerrar</button>
          </div>

        </Modal>
      </div>


    )
  }
}

export default App;
