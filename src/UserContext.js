import React from 'react';
import { GET_COMPANY, LOGIN } from './Api';
import { useNavigate } from 'react-router-dom';

export const UserContext = React.createContext();

export const UserStorage =({children})=>{
    const [data, setData] = React.useState(null);
    const [login, setLogin] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const navigate = useNavigate();
    const userLogout = React.useCallback(
        async function () {
          setData(null);
          setError(null);
          setLoading(false);
          setLogin(false);
          window.localStorage.removeItem('token');
          navigate('/login');
        },
        [navigate],
      );
    
     /* async function getUser(token) {
        const { url, options } = USER_GET(token);
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setLogin(true);
      }*/
    

      async function userLogin(body) {
        try {
          setError(null);
          setLoading(true);
          const { url, options } = LOGIN(body);
          const response = await fetch(url, options);
          if (!response.ok) throw new Error(`Error: ${response.statusText}`);
          const { data } = await response.json();
          window.localStorage.setItem('token', data.token);
          navigate('/');
        } catch (err) {
          setError(err.message);
          setLogin(false);
        } finally {
          setLoading(false);
        }
      }

      React.useEffect(() => {
        async function autoLogin() {
          const token = window.localStorage.getItem('token');
          if (token) {
            try {
              setError(null);
              //setLoading(true);
              //const { url, options } = TOKEN_VALIDATE_POST(token);
              //const response = await fetch(url, options);
              //if (!response.ok) throw new Error('Token inválido');
              //await getUser(token);
              //await getCompany(token)
            } catch (err) {
              userLogout();
            } finally {
              //setLoading(false);
            }
          }
        }
        autoLogin();
      }, [userLogout]);
    
      return (
        <UserContext.Provider
          value={{ userLogin, userLogout, data, error, loading, login }}
        >
          {children}
        </UserContext.Provider>
      );
}