import { useState } from 'react';
import axios from 'axios';

const Modal = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!email || !password || !username) {
            alert('Email, Password and username fields are required');
        }
        const data = {
            email, username, password
        }

        console.log(data)

        try {
            const registraionResponse = await axios.post('https://partner-in-magic.herokuapp.com/auth/local/register', data)
            console.log(registraionResponse)

            localStorage.setItem('username', registraionResponse.data.user.username);
            localStorage.setItem('password', password);
            localStorage.setItem('jwt', registraionResponse.data.jwt);
            localStorage.setItem('userId', registraionResponse.data.user.id);

            const createChatUserData = {
                username,
                "secret": password,
                "email": email,
                "custom_json": { "userId": registraionResponse.data.user.id }
            };

            const options = {
                headers: {
                    'PRIVATE-KEY': '76f18e7e-6094-422f-8267-03faa629e45c'
                },
            };

            const newChatUserResponse = await axios.post('https://api.chatengine.io/users/', createChatUserData, options)

            console.log(newChatUserResponse, "new chat user")
            props.history.push('/login')
            //window.location.reload();
            setError('');
        } catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Register as a new user</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} className="input" placeholder="Email" required />
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="input" placeholder="Username" required />
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" placeholder="Password" required />
                    <div align="center">
                        <button type="submit" className="button">
                            <span>Start chatting</span>
                        </button>
                    </div>
                </form>
                <h1>{error}</h1>
            </div>
        </div>

    );
};

export default Modal;