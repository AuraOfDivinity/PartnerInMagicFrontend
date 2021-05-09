import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import './App.css';
import { Route, Switch } from "react-router-dom";
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import ChatEngineComponent from './components/ChatEngineComponent'
import Questions from './components/Questions'
import Landing from './components/Landing'

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/register" component={RegisterForm} />
        <ProtectedRoute exact path="/app" component={ChatEngineComponent} />
        <ProtectedRoute exact path="/questions" component={Questions} />
      </Switch>
    </div>
  );
};

// infinite scroll, logout, more customizations...

export default App;