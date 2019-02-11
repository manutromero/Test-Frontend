import React, { Component } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-responsive-modal';

class App extends Component {
  constructor(){
    super()
    this.state = {
      data: {},
      openModal: false,
      AirplaneSelected: "", 
      name: "",
      phone: "",
      age: 18,
      email: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount(){
    fetch('http://localhost:8001/mi-servicio')
    .then(res => {
      return res.json()
    }).then(data =>{
      this.setState({
              data:  data
            })
    })
  }

  handleClickShowAlert() {
    this.setState({
      showingAlert: true
    });
    setTimeout(() => {
      this.setState({
        showingAlert: false
      })
    }, 5000);
  }
 
  handleChange(event){
    const {target: {name, value}} = event;
    this.setState({
        [name]: value
    })
  }

  handleSubmit (event) {
  event.preventDefault()
   console.log(this.state)
   const body = {
     name: this.state.name,
     email: this.state.email,
     age: this.state.age,
     phone: this.state.phone
   }
   fetch('http://localhost:8001/mi-servicio', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).then(res => {
      return res.json()
    }).then(response => {
        this.handleClickShowAlert()
        this.setState({
          name: "",
          email: "",
          age: 18,
          phone: ""
        })
    },err =>{
        alert('Algo salio mal con el API', err)
    })
  
  }
 
  onOpenModal = (AirplaneSelected) => {
    this.setState({
      openModal: true,
      AirplaneSelected: AirplaneSelected
    })
  }

  onCloseModal = () => {
    this.setState({
      openModal: false
    })
  }
  
  renderlistOptions = () =>{
    let options = []
    let age = 18;
    for(let index = 18; index <= 100; index++) {
      options.push(
        <option key={age} value={age}>{age}</option>  
      )
      age++
    }
    return options
  }

  renderItemsMenu = ()=>{
    let aircarfs = this.state.data
    let items = []
      Object.keys(aircarfs).map((key, index)=>{
          items.push(
             <li key={aircarfs[key].id} className="nav-item" onClick={this.onOpenModal.bind(this, aircarfs[key].name)}>
              <a className="nav-link active" href="#">{aircarfs[key].name}</a>
            </li>)
      })
    return items
  }

  render() {
    const {openModal, AirplaneSelected} = this.state
  
    return (
      <div className="App">
        <ul className="nav justify-content-center flex-column-720px">
            {this.renderItemsMenu()}
        </ul>
        <Modal open={openModal} onClose={this.onCloseModal} center>
        <div className="Text-content">
          <p>Hola, bienvenido, sabemos que quieres viajar en un <strong>{AirplaneSelected}</strong>,</p>
          <p>por favor diligencia el siguiente formulario:</p>
        </div> 
            <form className="form-group" onSubmit={this.handleSubmit}>
              <label>Nombres y Apellidos:</label>
              <input className="form-control" type="text" placeholder="Aitor Porras Barbero" name="name" value={this.state.name} onChange={this.handleChange} required/>
            
              <label>Email:</label>
              <input className="form-control" type="email" placeholder="name@example.com" name="email" value={this.state.email} onChange={this.handleChange} required/>
            
              <label>Celular:</label>
              <input className="form-control" type="number" name="phone"  value={this.state.phone} onChange={this.handleChange} required/>

              <div className="form-group">
                <label>Edad:</label>
                <select className="form-control" name="age" value={this.state.age} onChange={this.handleChange} required>
                  {this.renderlistOptions()}
                </select>
              </div>
              <input className="btn btn-success btn-lg btn-block" type="submit" value="Enviar" />
            </form>
            <div className={`alert alert-success ${this.state.showingAlert ? 'alert-shown' : 'alert-hidden'}`}>
              Tu información fue <strong>enviada con éxito</strong>, estaremos en contacto contigo
            </div>
        </Modal>

      </div>
    );
  }
}

export default App;
