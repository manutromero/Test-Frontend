import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import superagent from 'superagent';


class App extends Component {
  constructor(){
    super()
    this.state = {
      data: {}
    }
  }
  componentDidMount(){
    superagent
      .get('http://localhost:8001/mi-servicio')
      .end((err, res)=>{
        this.setState({
          data:  JSON.parse(res.text)
        })
      })    
  }
  rendercosas(){
    ReactDOM.render(<h1>hola mundo</h1>, document.getElementById('test'))
  }
  render() {
    let aircarfs = this.state.data
    
    let ListaItems = Object.keys(aircarfs).map((key, index)=>{
        console.log(aircarfs[key])
        return  <li key={aircarfs[key].id} className="nav-item" onClick={this.rendercosas}>
                     <a className="nav-link active" href="#">{aircarfs[key].name}</a>
                </li>
    })

    return (
      <div className="App">
        <ul className="nav justify-content-center flex-column-720px">
            {ListaItems}
        </ul>
        <div id="test">
a
        </div>
      </div>
    );
  }
}

export default App;
