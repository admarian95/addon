import { Switch } from 'react-router-dom';
import { Home } from './Home'
import  Register   from './Register'
import Login from './Login'
import forgotPassword from './forgotPassword'
import newPass from './newPass'
import { Route } from 'react-router-dom';
import Posts from './Posts';
import addPost from './AddPost';

export const LandingPage = () => {
    return (
        <div className="container" style={{marginTop:'5rem'}} >
            <Switch>
                <Route exact path='/' component={Home} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/forgotPassword' component={forgotPassword} />
                <Route path='/newPass/:email' component={newPass} />
                <Route exact path='/getPosts' component={Posts} />
                <Route exact path='/addPost' component={addPost} />
            </Switch >
        </div>

    )
}
