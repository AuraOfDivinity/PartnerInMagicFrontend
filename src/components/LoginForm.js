import { useState } from 'react';
import axios from 'axios';
import auth from './auth/auth'

const Modal = (props) => {
    const [password, setPassword] = useState('');
    const [identifier, setIdentifier] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = {
                identifier,
                password
            }

            const loginResponse = await axios.post('https://partner-in-magic.herokuapp.com/auth/local', data)
            const userDetails = loginResponse.data.user;


            console.log(loginResponse, "LOGIN RESPONSE")
            if (loginResponse.status === 200) {
                localStorage.setItem('username', userDetails.username);
                localStorage.setItem('userId', userDetails.id);
                localStorage.setItem('jwt', loginResponse.data.jwt);
                localStorage.setItem('password', password);

                if (!loginResponse.data.user.isQuestionsAnswered) {
                    auth.login(() => {
                        props.history.push("/questions");
                    });
                } else {
                    auth.login(() => {
                        props.history.push("/app");
                    });
                }
            }
            // await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            // localStorage.setItem('username', username);
            // localStorage.setItem('password', password);

            // window.location.reload();
            setError('');
        } catch (err) {
            setError('Oops, incorrect credentials.');
        }
    };

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Login</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} className="input" placeholder="Email" required />
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