import NavigationDrawer from "@Components/NavigationDrawer";
import Header from "@Components/Header";
import NavContent from "./components/NavContent"
import { Redirect, Route, Switch } from "react-router-dom"
import axios from "axios";
import 'video-react/dist/video-react.css';
import "react-perfect-scrollbar/dist/css/styles.css"
import 'antd/dist/antd.css'
import "@Styles/style.css"
import "@Styles/fonts.css"
import "@Styles/animation.css"
import "@Styles/style-input.scss"
import "@Styles/style-btn.scss"
import "@Styles/typography.scss"
import "@Styles/markupHelpers.scss"
import "@Styles/colors.css"
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import Login from "./pages/LoginPage";
import {TOKEN_KEY} from "./constants"
import {setHeader, authHeader} from "./api"

function App() {
  const [token, setToken] = useState(localStorage.getItem(TOKEN_KEY))
  const [widthPage, setWidthPage] = useState()

  const measuredRef = useCallback(node => {
    if (node !== null) {
      setWidthPage(node.clientWidth)
    }
  }, [setWidthPage]);

  useLayoutEffect(() => {
    localStorage.setItem(TOKEN_KEY, token)
    setHeader(authHeader(token))
  }, [token])

  useEffect(() => {
    axios.interceptors.response.use(function (response) {
      return response;
    }, function (error) {
      const { response : { status}} = error
      if (status === 401) {
        setToken("")
      }
      return Promise.reject(error);
    });
  } , [])
  return (
    <div className="flex-row flex h-full w-full" ref={measuredRef}>
      <Switch>
        {token
          ? (
            <Route path="/" component={() => (
              <>
                <NavigationDrawer widthPage={widthPage}/>
                <div className="flex-container relative w-full overflow-hidden">
                  <Header/>
                  <NavContent/>
                </div>
              </>
            )}
            />
          )
          : <>
            <Route path="/login" render={() => <Login setToken={setToken}/>} />
            <Redirect
              to="/login"
            />
          </>
        }
      </Switch>
    </div>
  );
}

export default App;
