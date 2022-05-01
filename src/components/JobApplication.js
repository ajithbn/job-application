import React, { useState, useEffect } from "react";
import axios from 'axios'
import swal from "sweetalert";
import validator from 'validator'

const JobApplicationForm = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [experience, setExperience] = useState('')
    const [skills, setSkills] = useState('')
    const [isSaved, setIsSaved] = useState(false)
    const [formError, setFormError] = useState({})

    const { jobs } = props

    const errors = {}

    const handleFormChange = (e) => {
        const attr = e.target.name
        if(attr === 'name') {
            setName(e.target.value)
        } else if(attr === 'email') {
            setEmail(e.target.value)
        } else if(attr === 'phone') {
            setPhone(e.target.value)
        } else if(attr === 'jobTitle') {
            setJobTitle(e.target.value)
        } else if(attr === 'experience') {
            setExperience(e.target.value)
        } else if(attr === 'skills') {
            setSkills(e.target.value)
        }
    }

    const submitApplication = (FormData) => {
        axios.post('https://dct-application-form.herokuapp.com/users/application-form', FormData)
        .then((res) => {
          setIsSaved(true)
          swal({
            title: "Sucess!",
            text: "You have Successfully Submitted the Application, We will get back to you Soon!!!",
            icon: "success",
            button: "Close",
          });
          props.history.push('/login')
        }).catch((err) => {
            alert(err.message)
        })
    }

    const runValidations = () => {
        //name
        if(name.trim().length === 0) {
          errors.name ='Name field is required'
        }

        //Email
        if(email.trim().length === 0) {
          errors.email = 'Email Field is required'
        } else if(!validator.isEmail(email)) {
          errors.email ='Invalid Email format'
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        runValidations()
        if(Object.keys(errors).length === 0) {
          setFormError({})
          FormData = {
            name: name,
            email: email,
            phone: phone,
            skills: skills,
            jobTitle: jobTitle,
            experience: experience
          }
          submitApplication(FormData)
        } else {
          setFormError(errors)
        }
        
    }
    useEffect(() => {
      if(isSaved) {
        setName('')
        setEmail('')
        setPhone('')
        setJobTitle('')
        setExperience('')
        setSkills('')
      }
      
    }, [isSaved])

  return (
    <div className="regContr d-md-flex align-items-center">
      <div className="col-md-6 mx-auto bg-white p-4 rounded">
          <h4 className="text-center mb-4">Apply for Job</h4>
          <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label col-form-label-sm">
                    Full Name
                </label>
                <div className="col-sm-10">
                  <input
                    type="text"
                    className="form-control form-control-sm"
                    id="name"
                    placeholder="Full Name"
                    onChange={handleFormChange}
                    name='name'
                    value={name}
                  />
                </div>
                {formError && <span className="text-danger">{formError.name}</span>}
              </div>
            <div className="row mb-3">
              <label
                htmlFor="email"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Email Address
              </label>
              <div className="col-sm-10">
                <input
                  type="email"
                  className="form-control form-control-sm"
                  id="email"
                  name="email"
                  onChange={handleFormChange}
                  placeholder="example@gmail.com"
                  value={email}
                />
              </div>
              {formError && <span className="text-danger">{formError.email}</span>}
            </div>
            <div className="row mb-3">
              <label
                htmlFor="contatNumber"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Contact Number
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="contatNumber"
                  placeholder="+919844866880"
                  onChange={handleFormChange}
                  name='phone'
                  value={phone}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="jobTitle"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Apply for Job
              </label>
              <div className="col-sm-10">
                <select className="form-select form-control-sm" aria-label="Default select example" id='jobTitle' onChange={handleFormChange} name="jobTitle" value={jobTitle}>
                    <option defaultValue>Open this select menu</option>
                    {
                        jobs.map((job,i) => {
                            return (<option value={job} key={i}>{job}</option>)
                        })
                    }
                </select>
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="experience"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Experience
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="experience"
                  name='experience'
                  placeholder="Experience(2years, 3 month)"
                  onChange={handleFormChange}
                  value={experience}
                />
              </div>
            </div>
            <div className="row mb-3">
              <label
                htmlFor="skills"
                className="col-sm-2 col-form-label col-form-label-sm"
              >
                Technical Skills
              </label>
              <div className="col-sm-10">
              <textarea className="form-control" id="skills" name='skills' rows="3" onChange={handleFormChange} value={skills}></textarea>
              </div>
            </div>
            <input type='submit' value="submit" className="btn btn-primary btn-sm"/>
          </form>
      </div>
    </div>
  );
};

export default JobApplicationForm;
