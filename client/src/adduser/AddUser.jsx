// import React, { useState } from "react";
// import "./adduser.css";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import toast from "react-hot-toast";

// const AddUser = () => {
//   const users = {
//     name: "",
//     email: "",
//     address: "",
//     mobile: "",
//     pincode: "",
//     birthdate:"",
//     age:"",
//     skills:"",
//   };
//   const [user, setUser] = useState(users);
//   const navigate = useNavigate();

//   const inputHandler = (e) => {
//     const { name, value } = e.target;
//     console.log(name, value);

//     setUser({ ...user, [name]: value });
//   };

//   const validateForm = () => {
//     const { name, email, address, mobile, pincode, birthdate, age, skills } = user;
//     if (!name || !email || !address || !mobile || !pincode || !birthdate || !age || !skills) {
//       toast.error("All fields are required", { position: "top-right" });
//       return false;
//     }
//     return true;
//   };

//   const submitForm = async (e) => {
//     e.preventDefault();
//     await axios
//       .post("http://localhost:8000/api/user", user)
//       .then((response) => {
//         toast.success(response.data.message, { position: "top-right" });
//         navigate("/");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   return (
//     <div className="addUser">
//       <Link to="/" type="button" class="btn btn-secondary">
//         <i class="fa-solid fa-backward"></i> Back
//       </Link>

//       <h3>Add New User</h3>
//       <form className="addUserForm" onSubmit={submitForm}>
//         <div className="inputGroup">
//           <label htmlFor="name">Name:</label>
//           <input
//             type="text"
//             id="name"
//             onChange={inputHandler}
//             name="name"
//             autoComplete="off"
//             placeholder="Enter your Name"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="email">E-mail:</label>
//           <input
//             type="email"
//             id="email"
//             onChange={inputHandler}
//             name="email"
//             autoComplete="off"
//             placeholder="Enter your Email"
//           />
//         </div>
//         <div className="inputGroup">
//           <label htmlFor="address">Address:</label>
//           <input
//             type="text"
//             id="address"
//             onChange={inputHandler}
//             name="address"
//             autoComplete="off"
//             placeholder="Enter your Address"
//           />
//         </div>

//         <div className="inputGroup">
//           <label htmlFor="email">Mobile:</label>
//           <input
//             type="mobile"
//             id="mobile"
//             onChange={inputHandler}
//             name="mobile"
//             autoComplete="off"
//             placeholder="Enter your Mobile "
//           />
//         </div>

//         <div className="inputGroup">
//           <label htmlFor="email">Pincode:</label>
//           <input
//             type="pincode"
//             id="pincode"
//             onChange={inputHandler}
//             name="pincode"
//             autoComplete="off"
//             placeholder="Enter your Pincode"
//           />
//         </div>

//         <div className="inputGroup">
//           <label htmlFor="email">Birthdate:</label>
//           <input
//             type="Date"
//             id="birthdate"
//             onChange={inputHandler}
//             name="birthdate"
//             autoComplete="off"
          
//           />
//         </div>

//         <div className="inputGroup">
//           <label htmlFor="email">Age:</label>
//           <input
//             type="age"
//             id="age"
//             onChange={inputHandler}
//             name="age"
//             autoComplete="off"
//             placeholder="Enter your Age"
//           />
//         </div>

//         <div className="inputGroup">
//         <label htmlFor="skills">Skills:</label>
//         <select
//           id="skills"
//           name="skills"
//           onChange={inputHandler}
//         >
//           <option value="" disabled>Select Your Skills</option>
//           <option value="JavaScript">JavaScript</option>
//           <option value="Python">Python</option>
//           <option value="Java">Java</option>
//           <option value="C++">C++</option>
     
//         </select>
//       </div>
//         <div className="inputGroup">
//           <button type="submit" class="btn btn-primary">
//             Submit
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddUser;


import React, { useState } from "react";
import "./adduser.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const AddUser = () => {
  const initialUserState = {
    name: "",
    email: "",
    address: "",
    mobile: "",
    pincode: "",
    birthdate: "",
    age: "",
    skills: "",
  };

  const [user, setUser] = useState(initialUserState);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    if (name === "birthdate") {
      const age = calculateAge(value);
      setUser((prevUser) => ({ ...prevUser, age }));
    }
  };

  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const validateForm = () => {
    const { name, email, address, mobile, pincode, birthdate, skills } = user;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[0-9]{10}$/;
    const pincodeRegex = /^[0-9]{6}$/;

    if (!name || !email || !address || !mobile || !pincode || !birthdate || !skills) {
      toast.error("All fields are required", { position: "top-right" });
      return false;
    }

    if (!emailRegex.test(email)) {
      toast.error("Invalid email format", { position: "top-right" });
      return false;
    }

    if (!mobileRegex.test(mobile)) {
      toast.error("Mobile number must be 10 digits", { position: "top-right" });
      return false;
    }

    if (!pincodeRegex.test(pincode)) {
      toast.error("Pincode must be 6 digits", { position: "top-right" });
      return false;
    }

    return true;
  };

  const submitForm = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post("http://localhost:8000/api/user", user);
        toast.success(response.data.message, { position: "top-right" });
        navigate("/");
      } catch (error) {
        toast.error("Error submitting the form. Please try again.", { position: "top-right" });
        console.error(error);
      }
    }
  };

  return (
    <div className="addUser">
      <Link to="/" type="button" className="btn btn-secondary">
        <i className="fa-solid fa-backward"></i> Back
      </Link>

      <h3>Add New User</h3>
      <form className="addUserForm" onSubmit={submitForm}>
        <div className="inputGroup">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            onChange={inputHandler}
            name="name"
            autoComplete="off"
            placeholder="Enter your Name"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email">E-mail:</label>
          <input
            type="email"
            id="email"
            onChange={inputHandler}
            name="email"
            autoComplete="off"
            placeholder="Enter your Email"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            id="address"
            onChange={inputHandler}
            name="address"
            autoComplete="off"
            placeholder="Enter your Address"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="text"
            id="mobile"
            onChange={inputHandler}
            name="mobile"
            autoComplete="off"
            placeholder="Enter your Mobile"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="pincode">Pincode:</label>
          <input
            type="text"
            id="pincode"
            onChange={inputHandler}
            name="pincode"
            autoComplete="off"
            placeholder="Enter your Pincode"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="birthdate">Birthdate:</label>
          <input
            type="date"
            id="birthdate"
            onChange={inputHandler}
            name="birthdate"
            autoComplete="off"
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="age">Age:</label>
          <input
            type="text"
            id="age"
            name="age"
            value={user.age}
            readOnly
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="skills">Skills:</label>
          <select
            id="skills"
            name="skills"
            onChange={inputHandler}
          >
            <option value="" disabled>Select Your Skills</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
          </select>
        </div>
        <div className="inputGroup">
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
