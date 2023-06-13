import {BrowserRouter, Routes, Route, Link, useNavigate} from 'react-router-dom';
import { useState, useEffect} from 'react';


function Header(){
	const [auth, setAuth] = useState('');
	let [visibility, setVisibility] = useState('');

	const navigate = useNavigate();

	useEffect(() =>{

		var url = window.location.href;
		var currentPath = url.substring(url.lastIndexOf('/') + 1);

		var auth = window.localStorage.getItem('name');
		setAuth(auth);
		setVisibility('visible');

		if((auth === "" || auth === null)){
			localStorage.removeItem('name');
			localStorage.clear();

			setVisibility('hidden');
			if(currentPath != 'signup'){
				navigate('/login');
			}
		}
	});

	const LogOut=()=>{
		console.log('at logout');
		localStorage.removeItem('name');
		localStorage.clear();

		navigate('/login');
	}

	return(
        
		<nav class="navbar navbar-expand-md navbar-light bg-light">
		    <div class="navbar-collapse collapse w-100 order-1 order-md-0 dual-collapse2">
				<ul class="navbar-nav mr-auto">
					<li class="nav-item active">
			              <Link to='/' class="nav-link" style={{visibility: visibility}} >Home</Link>
					</li>
					<li class="nav-item">
			            <Link to='post/add' class="nav-link" style={{visibility: visibility}}  >Create New Post</Link>
					</li>
				</ul>
			</div>
			<div class="navbar-collapse collapse w-100 order-4 dual-collapse2">&nbsp;</div>
			<div class="navbar-collapse collapse w-100 order-4 dual-collapse2">&nbsp;</div>
			<div class="navbar-collapse collapse w-100 order-4 dual-collapse2">
    		    <ul class="navbar-nav ml-right">
	                <li class="nav-item">
						<span class="navbar-text"  style={{visibility: visibility}} >
					    	<Link to="" class="nav-link" style={{visibility: visibility}} >Welcome: {auth}</Link>
					    </span>
					</li>
	                <li class="nav-item">
						<span class="navbar-text">
					    	<Link to="" class="nav-link" style={{visibility: visibility}} onClick={LogOut}>Logout</Link>
					    </span>
					</li>
				</ul>
			</div>
		</nav>
		)
}

export default Header;