import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

export default function Edit(){
	const navigate = useNavigate();

	const [inputs, setInputs] = useState([]);

	const {id} = useParams();

	useEffect(()=> {
		getPost();
	}, []);

	const getPost = () => {
        axios.get(` http://localhost/post-demo/api/edit.php?id=${id}`).then(function(response){
        	if(response.data.status === 0){
        		navigate('/');
        	}
        	setInputs(response.data);
        });
	}
	const handleChange = (event) => {
		const name = event.target.name;
		const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));

	}

	const handleSubmit = (event) => {
		event.preventDefault();

        axios.post('http://localhost/post-demo/api/update.php', inputs).then(function(response){
            navigate('/');
        });
	}

	return (
		<div class="container text-start ml-5 mt-3">
			<h3>Edit</h3>
			<form onSubmit={handleSubmit}>
				  <div class="form-group ml-5 col-sm-7">
				    <label for="title">Title</label>
				    <input type="text" class="form-control" name="title" id="title" placeholder="Title goes here" onChange={handleChange} value={inputs.title}/>
				  </div>
				  <div class="form-group col-sm-7">
				    <label for="desc">Description</label>
				    <textarea class="form-control" id="desc" name="desc" rows="3" onChange={handleChange} value={inputs.desc} />
				  </div>
				  <div class="form-group mt-1">
					<input type="submit" name="create" value="Post it..." class="btn btn-success"/>
				</div>
			</form>
		</div>
	)
}