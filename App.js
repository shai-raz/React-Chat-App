import React from 'react'
import { useContext } from 'react';
import './App.css';
import LoginPage from './components/LoginPage'
import ChatApp from './components/ChatApp'
import { AuthContext } from './Auth';

const App = () => {
  /*const localStorageUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(localStorageUser);

  useEffect(() => {
    const authSubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        //console.log('userAuth', userAuth);

        const user = {
          uid: userAuth.uid,
          email: userAuth.email,
        }

        localStorage.setItem('user', JSON.stringify(user));
        setUser(user);
      } else {
        localStorage.removeItem('user');
        setUser(null);
      }
    })
    return authSubscribe;
  }, [])*/

  const { currentUser } = useContext(AuthContext);

  return (
    <div className={`App`}>
      {!!currentUser ? <ChatApp /> : <LoginPage />}
    </div>
  );
}

export default App;