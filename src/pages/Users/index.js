import React, { useState, useEffect } from 'react';
import { Table, Container, Row, Col, Button, ButtonGroup, Form, Navbar, FormLabel } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";


const api ="http://localhost:5000/users";


const initialState = {


      name:"",
      document:"",
      bank:"",
      bankName:"",
      code:"",
      agency:"",
      account:"",                                                  


 
};


function Users() {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState([]);

  const [userId, setUserId] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { name, document, bank, bankName, code, agency, account } = state;




  useEffect(() => {
    loadUsers();

  }, []);


  const loadUsers = async () => {
    const response = await axios.get(api);
    setData(response.data);
  };


  const handleChange = (e) => {

   let { name, value } = e.target;

   setState({ ...state, [name]: value });

  };


  const handleDelete = async (id) => {

    if(window.confirm("Are you sure?")){
      await axios.delete(api + "/" + id);
      toast.success("User Deleted");
      setTimeout(() => loadUsers(), 500);
    }

  }


  const handleUpdate = (id) => {
  
const singleUser = data.find((item) => item.id == id);
setState({...singleUser});
setUserId(id);
setEditMode(true);


  }


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!name || !document || !bank || !bankName || !code || !agency || !account){
      toast.error("Please fill all the fields");
    } else {

      if(!editMode){

axios.post(api, state);
      toast.success("User added successfully");
      setState({ name:"", document:"", bank:"", bankName:"", code:"", agency:"", account:"" });
      setTimeout(() => loadUsers(), 500);


      }
      else {
        axios.put(`${api}/${userId}`, state);
        toast.success("User updated successfully");
        setState({ name:"", document:"", bank:"", bankName:"", code:"", agency:"", account:"" });
        setTimeout(() => loadUsers(), 500);
        setEditMode(false);
        setUserId(null);
      }
      
    }
  };
  return (
   <>

   <ToastContainer />
    <Navbar bg="primary" variant="dark" className="justify-content-center" >
      <Navbar.Brand>
          React json server app with react-bootstrap
      </Navbar.Brand>
    </Navbar>  
    <Container style={{ marginTop: "70px"}}>
    <Row>
      <Col md={4}>
     <Form onSubmit={handleSubmit}>

       <Form.Group>
       
       <Form.Label style={{ textAlign: "left"}}>Nome</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter Name"
        name="name"
        value={name}  
        onChange={handleChange}    
        />       
       </Form.Group>  

       <Form.Group>
       <Form.Label style={{ textAlign: "left"}}>Documento</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter document"
        name="document"
        value={document}  
        onChange={handleChange}        
        />       
       </Form.Group>

       <Form.Group>
       <Form.Label style={{ textAlign: "left"}}>Banco</Form.Label>
       <Form.Control
        type="text"
        placeholder="Enter bank"
        name="bank"
        value={bankName} 
        onChange={handleChange}         
        />       
       </Form.Group>

      
        <Form.Group>
        <Form.Label style={{ textAlign: "left"}}>Código bancário</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter code"
        name="code"
        value={code}
        onChange={handleChange}
        />

        </Form.Group>

        <Form.Group>
        <Form.Label style={{ textAlign: "left"}}>Agência</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter agency"
        name="agency"
        value={agency}
        onChange={handleChange}
        />

        </Form.Group>

        <Form.Group>
        <Form.Label style={{ textAlign: "left"}}>Conta</Form.Label>
        <Form.Control
        type="text"
        placeholder="Enter account"
        name="account"
        value={account}
        onChange={handleChange}
        />

        </Form.Group>

        

       <div className="d-grid gap-2 mt-2"> 
        <Button type="submit" variant="primary" size="1g">
        
         Submit
        </Button>
      </div>

     </Form>



      </Col>
      <Col md={8}>
      <Table bordered hover>
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>document</th>
            <th>bank</th>
            <th>bankName</th>
            <th>Action</th>
          </tr>
        </thead>
        {data && data.map((item, index) => (
          <tbody key={index}>
            <tr>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.document}</td>
              <td>{item.bank}</td>
              <td>{item.bankName}</td>
              <td>

              <ButtonGroup>
                <Button style= {{marginRight: "5px"}}
                 variant="secondary"
                 onClick={() => handleUpdate(item.id)}>
                  
                Update             
                
                </Button>
                <Button style= {{marginRight: "5px"}}
                 variant="danger"
                 onClick={() => handleDelete(item.id)}>
                  
                Delete             
                
                </Button>
              </ButtonGroup>
              </td>
            </tr>
          </tbody>
        ))}
      
      
      </Table>
      </Col>
    </Row>
    </Container>
   
   </>
  );
}

export default Users;
