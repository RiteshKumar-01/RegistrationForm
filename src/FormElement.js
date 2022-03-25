import React, {useState} from 'react';

function FormElement() {

    const initialValues = {username: "" , email: "", number: "", password: ""};
    const [state, setState] = useState(initialValues);
    const [errors, seterrors] = useState({});

    const onSubmitData = async (e)=>{

        e.preventDefault();
        seterrors(validateFormValues(state));

        const { username, email, number, password } = state;

        if(username && email && number && password){
            const res = await fetch('https://form-4e899-default-rtdb.asia-southeast1.firebasedatabase.app/formdatabase.json', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                number,
                password,   
            }),
        });

        if(res){
            setState({
                username: "" ,
                email: "",
                number: "",
                password: "",
            });

            alert("Successful");
        }
        }
        else{
            alert("Please remove all the errors before Submitting!!");
        }

    };

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setState({...state, [name]: value});
    };


    const validateFormValues = (values) =>{
        const errors = {}
        const regex= /^[a-zA-Z0-9.! #$%&'*+/=? ^_`{|}~-]+@[a-zA-Z0-9-]+(?:\. [a-zA-Z0-9-]+)*$/;
        if(!values.username){
            errors.username = "Username is required!";
        }
        if(!values.email){
            errors.email = "Email is required!";
        }
        else if(!regex.test(values.email)){
            errors.email = "Please enter correct Email Address!"
        }
        if(!values.password){
            errors.password = "Password is required!";
        }
        else if(values.password.length < 5){
            errors.password = "Password must be more than 5 characters"
        }
        if(!values.number){
            errors.number = "Phone Number is required!";
        }
        else if(values.number.length < 10){
            errors.number = "Incorrect Phone Number!!";
        }

        return errors;
    };


  return (
    <div className = "container">
        <form method= "POST">
            <h1>Registration Form</h1>
            <div className= "container my-4"></div>

                <div className="field container my-3">
                    <label>Username </label>
                    <input type= "text" name="username" placeholder="Username" value = { state.username } onChange= {handleChange}/>
                </div>
                <p>{errors.username}</p>

                <div className="field container my-3">
                    <label>Email </label>
                    <input type= "email" name="email" placeholder="Email" value= { state.email } onChange= {handleChange}/>
                </div>
                <p>{errors.email}</p>

                <div className="field container my-3">
                    <label>Phone Number </label>
                    <input type= "number" name="number" placeholder="Phone Number" value = { state.number } onChange= {handleChange}/>
                </div>
                <p>{errors.number}</p>

                <div className="field container my-3">
                    <label>Password</label>
                    <input type= "password" name="password" placeholder="Password" value = { state.password } onChange= {handleChange}/>
                </div>
                <p>{errors.password}</p>

                <button className="btn btn-primary mx-1" onClick={onSubmitData}>Submit</button>

        </form>
      
    </div>
  );
}

export default FormElement;
