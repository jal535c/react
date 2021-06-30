import React from 'react';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter} from "reactstrap";


class App extends React.Component {
  
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      modalActualizar: false,
      modalInsertar: false,
      form: {
        id: "",
        name: "",
        email: "",
      }      
    };
  }

  componentDidMount() {
    var url = "https://jsonplaceholder.typicode.com/users";
    
    fetch(url)
      .then((datos) => datos.json())
      .then((datos) => {
        console.log(datos);
        
        this.setState({
          users: datos,          
        });
        
      });
  }

  mostrarModalActualizar = (dato) => {
    this.setState({
      modalActualizar: true,
      form: dato,      
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ 
      modalActualizar: false 
    });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ 
      modalInsertar: false 
    });
  };

  editar = (dato) => {
    var i = 0;
    var arr = this.state.users;
    
    arr.map((item) => {
      if (dato.id == item.id) {
        arr[i].name = dato.name;
        arr[i].email = dato.email;
      }
      i++;
    });
    
    this.setState({ 
      users: arr, 
      modalActualizar: false 
    });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Desea eliminar el usuario "+dato.id+"?");
    
    if (opcion == true) {
      var i = 0;
      var arr = this.state.users;
      
      arr.map((item) => {
        if (dato.id == item.id) {
          arr.splice(i, 1);
        }
        i++;
      });
      
      this.setState({ 
        users: arr, 
        modalActualizar: false 
      });
    }
  };

  insertar= ()=>{
    var nuevo = {...this.state.form};
    nuevo.id = this.state.users.length+1;
    
    var lista = this.state.users;
    lista.push(nuevo);

    this.setState({
      users: lista,
      modalInsertar: false      
    });
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    return (
      <>
        <Container>
          <br />
          <h1>Listado de Usuarios</h1>
          <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Añadir</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {this.state.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    <Button color="primary" onClick={() => this.mostrarModalActualizar(user)}>
                      Modificar
                    </Button>
                    {" "}
                    <Button color="danger" onClick={()=> this.eliminar(user)}>
                      Borrar
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
            <div><h3>Modificar</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>            
              <input className="form-control" type="text" value={this.state.form.id} readOnly />
            </FormGroup>            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input className="form-control" name="name" type="text" onChange={this.handleChange} value={this.state.form.name} />
            </FormGroup>            
            <FormGroup>
              <label>Email:</label>
              <input className="form-control" name="email" type="text" onChange={this.handleChange} value={this.state.form.email} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.editar(this.state.form)} >
              Editar
            </Button>
            <Button color="danger" onClick={() => this.cerrarModalActualizar()} >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Añadir</h3></div>
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <label>Id:</label>              
              <input className="form-control" type="text" value={this.state.users.length+1} readOnly />                              
            </FormGroup>            
            <FormGroup>
              <label>Nombre:</label>
              <input className="form-control" name="name" type="text" onChange={this.handleChange} />
            </FormGroup>            
            <FormGroup>
              <label>Email:</label>
              <input className="form-control" name="email" type="text" onChange={this.handleChange} />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.insertar()} >
              Insertar
            </Button>
            <Button className="btn btn-danger" onClick={() => this.cerrarModalInsertar()} >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default App;
