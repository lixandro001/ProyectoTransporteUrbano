import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./context/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  Formulario,
  MensajeExito,
  MensajeError,
  ContenedorBotonCentrado,
  BotonAmarillo,
  BotonAzul,
} from "./elementos/FormFicha";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { Footer } from "./elementos/Footers";
import Container from "react-bootstrap/Container";
import Ficha from "./componentes/Ficha";
import { BodyLogin } from "./elementos/FormLogin";
import { Navigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Col from "react-bootstrap/Col";
import companyLogo from "./logo/etuchisa.jpg";
import { BotonGrisModal } from "./elementos/FormModal";

const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const userRef = useRef();
  const errRef = useRef();
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [guid, setGuID] = useState("");
  const [Usuarios, setUsuarios] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  var guid_oportunidad = searchParams.get("guid");
  var usuarios = searchParams.get("usuarioAdministrativo"); //6a1d2667-1929-ec11-b6e6-0022483751cf
  var version_crm = searchParams.get("crm");

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        baseUrlGDO + "api/Auth",
        JSON.stringify({ username: user, password: pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: false,
        }
      );
      console.log(response);
      const token = response.access_token;
      const expireAt = response.expires_at;
      localStorage.setItem("token", token);
      localStorage.setItem("expireAt", expireAt);
      setSuccess(true);
    } catch (err) {
      setSuccess(false);
      if (!err?.response) {
        setErrMsg("No hay respuesta del servidor");
      } else if (!err.response?.status === 400) {
        setErrMsg("Usuario o Contraseña incorrecta");
      } else if (!err.response?.status === 401) {
        setErrMsg("No está autorizado");
      } else {
        setErrMsg("Usuario y/o Contraseña incorrectas");
      }
      errRef.current.focus();
    }
  };

  if (success == true) {
    return <Navigate to="/ficha" />;
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>

      {success == true ? (
        <section>
          <Ficha guid_oportunidad={guid} usuarios={Usuarios} />
        </section>
      ) : (
        <>
          <br />
          <br />
          <BodyLogin className="text-center">
            <Formulario onSubmit={handleSubmit}>
              <img src={companyLogo} width="300px" align-content="center" />

              <br />
              <p
                style={{ backgroundColor: "#f8d7da" }}
                ref={errRef}
                className={errMsg ? "errmsg" : "offscreen"}
                aria-live="assertive"
              >
                {errMsg}
              </p>
              <input
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
              />
              <br />
              <input
                type="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
              />
              {false && (
                <MensajeError>
                  <>
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <b>Error:</b> Por favor rellena el formulario correctamente.
                  </>
                </MensajeError>
              )}
              <ContenedorBotonCentrado>
                <BotonAzul type="submit">Ingresar</BotonAzul>
                <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
              </ContenedorBotonCentrado>
            </Formulario>
 
            <Footer>
              <p color="width">© 2022 Aplicativo Movil Etuchisa</p>
            </Footer>
          </BodyLogin>
        </>
      )}
    </>
  );
};
export default Login;
