import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { BASE_URL } from '../globals'
import { useNavigate } from 'react-router-dom'


const CreateRest = () => {
  let navigate = useNavigate()
  const initialFormState = {
    name: '',
    description: '',
    image: ''
  }
  const [formState, setFormState] = useState(initialFormState)
  
  const handleChange = (e) => {
    setFormState({...formState, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await axios.post(`${BASE_URL}/restaurants/new_restaurant`, formState)
    setFormState(initialFormState)
    navigate('/')
  }
  return (
    <div>
      <div></div>
      <div className="row justify-content-center">
    <div className="col-md-6 col-sm-12 no-padding ">
    <div className="register-form">
<form  onSubmit={handleSubmit}>
      <div className="col-md-6">
    <label htmlFor="name" className="form-label">Name of Restaurant</label>
    <input 
    onChange={handleChange}
    name = 'name'
    type="text" 
    value={formState?.name}
    className="form-control" 
    id="name" 
    required
    />
  </div>
  <div className="col-md-6">
    <label htmlFor="description" className="form-label">Restaurant Description</label>
    <input 
    onChange={handleChange}
    type="text"
    name="description"
    value={formState?.description}
    required
    className="form-control" 
    id="description"
    />
  </div>
  <div className="col-md-6">
    <label htmlFor="image" className="form-label">Image</label>
    <input 
    onChange={handleChange}
    name = 'image'
    type="text" 
    value={formState?.image}
    className="form-control" 
    id="image" 
    required
    />
  </div>
  <div className="col-6">
    <button 
    type="submit" 
    className="btn btn-primary">Submit</button>
  </div>
</form>
</div>
</div>
    </div>
    </div>
  )
}

export default CreateRest