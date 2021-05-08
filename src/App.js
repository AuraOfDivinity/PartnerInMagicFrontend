import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import ChatEngineComponent from './components/ChatEngineComponent'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={RegisterForm} />
        <Route exact path="/login" component={LoginForm} />
        <ProtectedRoute exact path="/app" component={ChatEngineComponent} />
      </Switch>
    </div>


    // <ChatEngine
    //   height="100vh"
    //   projectID={projectID}
    //   userName={localStorage.getItem('username')}
    //   userSecret={localStorage.getItem('password')}
    //   renderChatFeed={(chatAppProps) => <ChatFeed {...chatAppProps} />}
    //   onNewMessage={() => new Audio('https://chat-engine-assets.s3.amazonaws.com/click.mp3').play()}
    // />
  );
};

// infinite scroll, logout, more customizations...

export default App;