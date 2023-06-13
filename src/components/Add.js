import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Add(){
	const navigate = useNavigate();

	var userId = localStorage.getItem('userId');

	const [inputs, setInputs] = useState({'userId': userId});

	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));

	}

	const handleSubmit = (event) => {
		event.preventDefault();

        axios.post('http://localhost/post-demo/api/create.php', inputs).then(function(response){
            navigate('/');
        });
	}

	return (
		<div class="container text-start ml-5 mt-3">
			<h3>Create your post here</h3>
			<form onSubmit={handleSubmit}>
				  <div class="form-group ml-5 col-sm-7">
				    <label for="title">Title</label>
				    <input type="text" class="form-control" name="title" id="title" placeholder="Title goes here" onChange={handleChange} />
				  </div>
				  <div class="form-group col-sm-7">
				    <label for="desc">Description</label>
				    <textarea class="form-control" id="desc" name="desc" rows="3" onChange={handleChange}></textarea>
				  </div>
				  <div class="form-group mt-1">
					<input type="submit" name="create" value="Post it..." class="btn btn-success"/>
				</div>
			</form>
		</div>
	)
}