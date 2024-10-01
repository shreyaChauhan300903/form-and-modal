import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    country: "",
    gender: "",
    lastMenstrualCycle: "",
    hobbies: [],
  });
  const [typingTimeout, setTypingTimeout] = useState(null);

  const [errors, setErrors] = useState({});

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const stateMapping = {
    "United States": ["California", "Texas", "New York", "Florida"],
    Canada: ["Ontario", "Quebec", "British Columbia", "Alberta"],
    Germany: ["Bavaria", "Berlin", "Hamburg", "Saxony"],
    India: ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu"],
    Australia: [
      "New South Wales",
      "Victoria",
      "Queensland",
      "Western Australia",
    ],
  };
  const countries = Object.keys(stateMapping);
  const hobbiesOptions = ["Reading", "Sports", "Coding", "Music", "Gaming"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    clearTimeout(typingTimeout);

    const timeout = setTimeout(() => {
      if (name === "email") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email:
            value === "" || emailRegex.test(value)
              ? ""
              : "Invalid email format",
        }));
      }

      if (name === "password") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password:
            value === "" || passwordRegex.test(value)
              ? ""
              : "Password must be at least 8 characters long, contain a capital letter, a number, and a special character",
        }));
      }
    }, 1000); // Adjust the debounce time as needed (500ms here)

    setTypingTimeout(timeout);
  };

  const handleHobbiesChange = (e) => {
    const { value, checked } = e.target;
    let updatedHobbies = [...formData.hobbies];

    if (checked) {
      updatedHobbies.push(value);
    } else {
      updatedHobbies = updatedHobbies.filter((hobby) => hobby !== value);
    }

    setFormData({ ...formData, hobbies: updatedHobbies });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Form submitted successfully!", {
      onClose: () => {
        setShow(true); // Show the modal only after the toast is closed
      },
    });
    setFormData({
      name: "",
      email: "",
      password: "",
      dateOfBirth: "",
      country: "",
      gender: "",
      lastMenstrualCycle: "",
      hobbies: [],
    });
  };

  return (
    <>
      <ToastContainer />

      <div className=" flex justify-content-center align-items-center min-vh-100">
        <form
          onSubmit={handleSubmit}
          className="max-w-lg min-w-lg p-8 bg-white shadow-lg rounded-lg  "
        >
          {/* Name input with Bootstrap floating label */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="Name"
              required
            />
            <label htmlFor="name">Name</label>
          </div>

          {/* Email input */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              required
            />
            <label htmlFor="email">Email</label>
            {errors.email && <p className="text-danger mt-1">{errors.email}</p>}
          </div>

          {/* Password input */}
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Password"
              required
            />
            <label htmlFor="password">Password</label>
            {errors.password && (
              <p className="text-danger mt-1 text-sm">{errors.password}</p>
            )}
          </div>

          {/* Date of Birth */}
          <div className="form-floating mb-3">
            <DatePicker
              selected={
                formData.dateOfBirth ? new Date(formData.dateOfBirth) : null
              }
              onChange={(date) =>
                setFormData({ ...formData, dateOfBirth: date })
              }
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Select Date of Birth"
              showYearDropdown
              scrollableYearDropdown
              yearDropdownItemNumber={100}
              required
            />
          </div>

          {/* Country dropdown */}
          <div className="form-floating mb-3">
            <select
              className="form-select"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              required
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
            <label htmlFor="country">Country</label>
          </div>

          {/* State dropdown */}
          {formData.country && (
            <div className="mb-6 form-floating">
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="form-control"
                required
              >
                <option value="">Select state</option>
                {stateMapping[formData.country].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <label htmlFor="state">State</label>
            </div>
          )}

          {/* Gender */}
          <div className="mb-3">
            <p className="form-label">Gender</p>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="male"
                onChange={handleInputChange}
                checked={formData.gender === "male"}
              />
              <label className="form-check-label" htmlFor="male">
                Male
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                value="female"
                onChange={handleInputChange}
                checked={formData.gender === "female"}
              />
              <label className="form-check-label" htmlFor="female">
                Female
              </label>
            </div>
          </div>

          {/* Last Menstrual Cycle */}
          <div className="form-floating mb-3 w-auto">
            <DatePicker
              selected={
                formData.lastMenstrualCycle
                  ? new Date(formData.lastMenstrualCycle)
                  : null
              }
              onChange={(date) =>
                setFormData({ ...formData, lastMenstrualCycle: date })
              }
              dateFormat="yyyy-MM-dd"
              className="form-control"
              placeholderText="Last Menstrual Cycle"
              disabled={formData.gender !== "female"}
            />
          </div>

          {/* Hobbies */}
          <div className="mb-3">
            <p className="form-label">Hobbies</p>
            <div className="row">
              {hobbiesOptions.map((hobby) => (
                <div className="col-6 form-check" key={hobby}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    name="hobbies"
                    value={hobby}
                    onChange={handleHobbiesChange}
                    checked={formData.hobbies.includes(hobby)}
                  />
                  <label className="form-check-label" htmlFor={hobby}>
                    {hobby}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, your information is safe with us!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default Form;
