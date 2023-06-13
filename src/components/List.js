import axios from 'axios';
import { useState, useEffect} from 'react';
import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';


export default function List(){

	const [posts, setPosts] = useState([]); 
	const [inputs, setInputs] = useState([]);

	useEffect(() => {
		getPosts();
	}, []);

	function getPosts(){
		axios.post('http://localhost/post-demo/api/list.php', inputs).then(function(response){
			setPosts(response.data);
		})
	}

	const handleSubmit =(event)=>{
	    event.preventDefault();
	}
	const handleChange =(event)=>{
		const name = event.target.name;
		const value = event.target.value;

        setInputs(values => ({...values, [name]: value}));
   	}

	const handleSearch = (event) => {
	    event.preventDefault();
		getPosts();
	}

	return (
		<div class="container mt-2">
			<div class="row mb-2 float-right">
				<div style={{textalign: 'right'}}>
					<form onSubmit={handleSubmit}>
						<div class="ml-5 col-sm-3" style={{float: 'left', clear: 'both'}}>
							<input type="text" id="search" name="search" class="form-control" placeholder="search..." onChange={handleChange} />
						</div>
						<div class="ml-5 col-sm-1" style={{float: 'left'}}>
							<input type="button" id="searchBtn" class="form-control btn btn-info" value="Search" onClick={handleSearch} />
						</div>
					</form>
				</div>
			</div>
			<div class="row mb-2">
			{posts.map((post, key) =>

			    <div class="col-md-12 text-start">
			    	{ (post.userId == localStorage.getItem('userId')) &&
				        <Link to={`post/edit/${post.id}`} style={{float: 'right'}}>Edit</Link>
				    }
					<div class="row g-0 border rounded overflow-hidden flex-md-row mb-2 shadow-sm position-relative">
						<div class="col p-4 d-flex flex-column position-static">
							<h3 class="mb-0">{post.title}</h3>
							<div class="mb-1 text-muted"><small>posted on:<strong>{post.created_at}</strong> by <strong>{post.userName}</strong></small></div>
							<p class="card-text mb-auto">{post.desc}</p>
							<div class="row">
								{/* <span class="col-2"><Link to="#" class="stretched-link small">Continue reading</Link></span> */}
							</div>
						</div>
						<div class="col-auto d-none d-lg-block">
							<img src="#" width="200" height="150" class="bd-placeholder-img" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false" />
						</div>
					</div>
				</div>
			)}
			</div>
		</div>
	)
}