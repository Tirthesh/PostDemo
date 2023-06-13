import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

function Login(){
	const navigate = useNavigate();

	const [inputs, setInputs] = useState([]);

	useEffect(() =>{
		console.log('at login');

		var auth = localStorage.getItem('name');

		if(auth !== "" && auth !== null){
			navigate('/');
		}

	}, [])

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
	}

	const handleSubmit = (event) => {
		event.preventDefault();
        axios.post('http://localhost/post-demo/api/login.php', inputs).then(function(response){
        	if(response.data.status === "0"){
        		alert('Invalid Credentials. Please try again.'); 
        	}else{
	            navigate('/');
				window.localStorage.setItem('userId', response.data.id);
				window.localStorage.setItem('name', response.data.name);
        	}
        });
	}

	return(
		<div class="container col-sm-4 ml-5 mt-3">
			<h3>Login</h3>
			<form onSubmit={handleSubmit} class="text-start">
				  <div class="form-group  ml-5 col-sm-16">
				    <input type="email" class="form-control" id="email" name="email" placeholder="email" onChange={handleChange} required/>
				  </div>
				  <div class="form-group col-sm-16 mt-3">
				    <input type="password" class="form-control" id="pwd"  name="password" placeholder="Password" onChange={handleChange} required/>
				  </div>
				  <div class="form-group mt-3">
					<input type="submit" name="create" value="Submit"  class="btn btn-success"/>
				</div>
				<div class="form-group  ml-5 col-sm-16">
				</div>

			</form>
		</div>

	)
}

export default Login;