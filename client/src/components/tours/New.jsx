// Fill in the missing code
import React, {useState, useEffect} from "react"
import {Form, Container} from "react-bootstrap"
import Axios from "axios"
import {Redirect} from "react-router-dom"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"


const New = function () {

    //This is for fetching tourtypes array 
    const [tourTypes, setTourTypes] = useState([])

    //Fire the function once the page is rendered
    useEffect(()=>{
        (async () => {
            await getTourTypes()
        })()
      },[])

    //Get all tours from model
    const getTourTypes = async () => {
      //Hit tourTypes path in backend
      const tourTypes = await Axios.get("/api/tours/tourTypes")
      //if the response was 200, set the all fetched data to tuorTypesResp
      if(tourTypes.status === 200) setTourTypes(tourTypes.data)
      //now "tourTypes" is available in return statement
  }

    //This is for getting inputs from user
    const [inputs, setInputs] = useState({
      title:"",
      tourType:"",
      groupSize:"",
      date:""
  })

  //Set redirect to navigate user after created new Tour
  const [redirect, setRedirect] = useState(false)

  //take inputs from user and store them into value
  const handleInputChange = event => {
      event.persist();
      const {name, value} = event.target
      setInputs(inputs => ({...inputs, [name]: value}))

  }

  const handleSubmit = async event => {
      
      event.preventDefault()

      //Use try and catch so toast works
      try{
          //hit create path in backend with inputs value attached
          const response = await Axios.post("/api/tours",inputs)

          if(response.status === 200){
  
              toast("Your Tour created successfuly",{
                  type:toast.TYPE.SUCCESS
              })
              //if Tours was created successfully, set redirect true
              setRedirect(true)
          }else{
              toast("There was an issue creating your tour",{
                  type:toast.TYPE.ERROR
              })
          }

      }catch(error){
              toast("There was an issue creating your tour",{
                  type:toast.TYPE.ERROR
              })
          }
  }


  // if redirect was true then take the user to /items
  if(redirect) return (<Redirect to="/tours"/>)

  return (
    <Container className="my-5">
      <header>
        <h1>New Tour</h1>
      </header>

      <hr/>

      <div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control
              name="title"
              onChange={handleInputChange}
              value={inputs.title}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Tour Type:</Form.Label>
            <Form.Control
              as="select"
              name="tourType"
              onChange={handleInputChange}
              defaultValue={inputs.tourType}
            >

              {tourTypes.map((type, i) => (
                <option key={i} value={type}>{type}</option>
              ))}


            </Form.Control>
          </Form.Group>

          <Form.Group>
            <Form.Label>Group Size:</Form.Label>
            <Form.Control
              type="number"
              name="groupSize"
              step="1"
              min="1"
              max="10"
              onChange={handleInputChange}
              value={inputs.groupSize}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Date:</Form.Label>
            <Form.Control
              type="date"
              name="date"
              onChange={handleInputChange}
              value={inputs.date}
            />
          </Form.Group>

          <Form.Group>
            <button type="submit" className="btn btn-primary">Create</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default New;