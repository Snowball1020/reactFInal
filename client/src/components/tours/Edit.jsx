// Fill in the missing code
import React, {useState, useEffect} from "react"
import {Form, Container} from "react-bootstrap"
import Axios from "axios"
import {Redirect} from "react-router-dom"
import {toast} from "react-toastify"
import {Link} from "react-router-dom"

const Edit = function (props) {

    //This is for fetching tourtypes array 
    const [tourTypes, setTourTypes] = useState([])

      useEffect(()=>{
        (async () => {
            await getTourTypes()
        })()
      },[])


      //Get all tourTypes from database
      const getTourTypes = async () => {
      //Hit tourtypes path in backend
      const tourTypes = await Axios.get("/api/tours/tourTypes")
      //if the response was 200, set the all fetched data to tourTypeResp
      if(tourTypes.status === 200) setTourTypes(tourTypes.data)
      //now "tourTypes" is available in return statement
   }

    //Getting Items ID to pick up only one data
    const id = props.location.state.id

    //This is for taking inputs from user
    const [inputs, setInputs] = useState({
      title:"",
      tourType:"",
      groupSize:"",
      date:""
    })

    const [redirect, setRedirect] = useState(false)

    //useEffect is triggered once as soon as the routs was hit
    // pick up one and put that .data -> to setInputs, this prefills inputs field
    useEffect(()=>{
        (async () => {
            //Hit edit path in backedn
            const tour = await Axios.get(`/api/tours/${id}`)
            if(tour.status === 200) setInputs(tour.data)
        })();
    },[])


    //HandleInputChande happens every time changes occured in input field
    const handleInputChange = event => {
        event.persist();
        const {name, value} = event.target
        setInputs(inputs => ({...inputs, [name]: value}))
    }
    

    //handleSubmit is excuted once Form submit
    const handleSubmit = async event => {
    
        event.preventDefault()

        try{
            //hit update path attached inputs data
            const response = await Axios.post("/api/tours/update",inputs)

            if(response.status === 200){
    
                toast("You have updated your tour successfuly",{
                    type:toast.TYPE.INFO
                })
                //if update was successful, set redirect true
                setRedirect(true)
            }else{
                toast("There was an issue updating your tour",{
                    type:toast.TYPE.ERROR
                })
            }

        }catch(error){
                toast("There was an issue updating your tour",{
                    type:toast.TYPE.ERROR
                })

            }
    }


  //if redirect was true then take the user to /items
  if(redirect) return (<Redirect to="/tours"/>)

  return (
    <Container className="my-5">
      <header>
        <h1>Edit Tour</h1>
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
            <button type="submit" className="btn btn-primary">Update</button>
          </Form.Group>
        </Form>
      </div>
    </Container>
  );
};

export default Edit;