import React, { useRef, useState, useEffect, useContext } from "react";
import AuthContext from "./../context/AuthProvider";
import axios from "axios";
import { Helmet } from "react-helmet";
import {
  Titulo,
  Formulario,
  ContenedorBotonCentrado,
  BotonGris
 
} from "../elementos/FormFicha";
import {
  BotonAmarilloModal,
  BotonGrisModal,
  TextoRojoModal,
} from "../elementos/FormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faExclamationTriangle,
  faSmileWink,
} from "@fortawesome/free-solid-svg-icons";
import ComponenteInput from "./Input";
import ComponenteSelectSexo from "./SelectSexo";
import ComponenteSelectRelacion from "./SelectRelacion";
import SelectDocumento from "./SelectDocumento";
import SelectHorario from "./SelectHorario";
import SelectUbicacion from "./SelectUbicacion";
import { Header, LogoOscuro } from "../elementos/Headers";
import { Footer } from "../elementos/Footers";
import Card from "react-bootstrap/Card";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Modal from "react-bootstrap/Modal";
import moment from "moment";
import Registro from "./Registro";
import Documentos from "./Documentos";

import "../estilos.css";
import ProgressIntoDialog from "../componentes/Progress/Progress";
import SimpleReactValidator from "simple-react-validator";
import { Navigate } from "react-router-dom";
import VentanaModalion from "./VentanaModal";
import VentanaModalDatosPersonales from "./VentanaModalDatosPersonales";
import {
  ContenedorCentrado,
  TextoAmarillo,
  TextoNegro,
} from "../elementos/FormRegistro";
import UploaderDocument from "./UploaderDocument";
import MensajeValidacion from "./MensajeValidacion";
import Check from "react-bootstrap/FormCheck";
import { Radio } from "@material-ui/core";

import ImagenConductor from "./imagenes/icono-del-conductor.jpg";
import ImagenBus from "./imagenes/bus.jpg";

import ImagenBuzon from "./imagenes/buzon.jpg";
import ImagenColaboradore from "./imagenes/colaboradores.jpg";
import ImagenAlerta from "./imagenes/alertas.jpg";
import ImagenAsignacion from "./imagenes/asignacion.jpg";

const baseUrlCRM = process.env.REACT_APP_URL_API_CRM;
const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;

const Ficha = ({}) => {
  const errRef = useRef();
  const [loading, setLoading] = useState(false);
  const [idFichaMatricula, setFichaMatricula] = useState(null);
  const [edadActual, setedadActual] = useState(0);
  const [valorTipoFicha, setvalorTipoFicha] = useState(0);

  /* Datos Personales */
  const [datoUsuario, setPost] = useState([]);

  /* Datos Declaraciónes */
  const [datosDeclaracion, setPostDeclaracion] = useState([]);
  const [PostObtenerRegistroId, setPostObtenerRegistroId] = useState("");
  /* Datos Información Laboral*/
  const [tipoTrabajo, setTipoTrabajoNew] = useState("1");
  const [tipoPoliticaPersonales, settipoPoliticaPersonales] = useState("");
  const [razonSocialTrab, setRazonSocialTrabNew] = useState("");
  const [rucTrab, setRucTrabNew] = useState("");
  const [departamentoTrab, setDepartamentoTrabNew] = useState({
    guid: "",
    nombre: "",
  });
  const [provinciaTrab, setProvinciaTrabNew] = useState({
    guid: "",
    nombre: "",
  });
  const [distritoTrab, setDistritoTrabNew] = useState({ guid: "", nombre: "" });
  const [telefonoTrab, setTelefonoTrabNew] = useState("");
  const [anexoTrab, setAnexoTrabNew] = useState("");
  const [aceptoTyCNew, setAceptoTyCNew] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successRegistro, setSuccessRegistro] = useState(false);
  const [showModal, setShow] = useState(false);
  const [activarBoton, setactivarBoton] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [esobligatorioVal, setesobligatorioVal] = useState(true);
  const [esobligatoriounvalor, setesobligatoriounvalor] = useState("");
  const [NavegacionRetroceder, setNavegacionRetroceder] = useState(false);
  const [NavegaConductor, setNavegaConductor] = useState(false);
  const [NavegaVehiculo, setNavegaVehiculo] = useState(false);
  const [NavegaAsignacion, setNavegaAsignacion] = useState(false);
  const [NavegaHorario, setNavegaHorario] = useState(false);

  const [vistaCargaDocumento, setvistaCargaDocumento] = useState({
    id: "",
    nombre: "",
    url: "",
    visible: false,
  });
  const [CargaMatrizDocumento, setCargaMatrizDocumento] = useState(true);
  const [GuidSubModalidad, setGuidSubModalidad] = useState();
  const [cargaExitosaSubModalidad, setcargaExitosaSubModalidad] = useState(
    true
  );
  const [PeriodoBanner, setPeriodoBanner] = useState("");
  const [valorChecket, setvalorChecket] = useState(false);
  const [valorChecket2, setvalorChecket2] = useState(false);

  var ImgRegistro = require("./../wwwroot/images/img-upn2.png");

  var usuarios = localStorage.getItem("user");

  SimpleReactValidator.addLocale("es", {
    accepted: ":attribute debe ser aceptado.",
    after: ":attribute debe ser una fecha posterior a :date.",
    after_or_equal: ":attribute debe ser una fecha posterior o igual a :date.",
    alpha: ":attribute sólo debe contener letras.",
    array: ":attribute debe ser un conjunto.",
    before: ":attribute debe ser una fecha anterior a :date.",
    before_or_equal: ":attribute debe ser una fecha anterior o igual a :date.",
    between: ":attribute tiene que estar entre :min - :max:type.",
    boolean: "El campo :attribute debe tener un valor verdadero o falso.",
    date: ":attribute no es una fecha válida.",
    date_equals: ":attribute debe ser una fecha igual a :date.",
    email: ":attribute no es un correo válido",
    in: ":attribute es inválido :values.",
    integer: ":attribute debe ser un número entero.",
    max: "El :attribute no debe ser mayor a :max carácteres.",
    min: "El :attribute debe ser de al menos :min carácteres.",
    not_in: ":attribute es inválido :values.",
    not_regex: "El formato del campo :attribute no es válido.",
    numeric: "El :attribute debe ser numérico.",
    regex: "El formato de :attribute es inválido.",
    required: "El campo :attribute es obligatorio.",
    size: "El tamaño de :attribute debe ser :size:type.",
    string: "El campo :attribute debe ser una cadena de caracteres.",
    url: "El formato :attribute es inválido.",
  });

  const [, forceUpdate] = useState();
  const validator = useRef(
    new SimpleReactValidator({
      locale: "es",
      autoForceUpdate: { forceUpdate: forceUpdate },
    })
  );

  useEffect(() => {
    setErrMsg("");
  }, [usuarios]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setactivarBoton(false);
      handleShow();
    } else {
      validator.current.showMessages();
      forceUpdate(1);
      setactivarBoton(true);
    }
  };

  function limpiartInputInformacionLaboral() {
    setRazonSocialTrabNew("");
    setRucTrabNew("");
    setTelefonoTrabNew("");
    setAnexoTrabNew("");
  }

  if (!datoUsuario) return "No se encontró datos";

  const handleVistas = (id, nombre, url, visible) => {
    setvistaCargaDocumento({
      id: id,
      nombre: nombre,
      url: url,
      visible: visible,
    });
  };

  const handleAceptarTyC = (aceptarTyC) => {
    if (!aceptarTyC) {
      setAceptoTyCNew("");
    } else {
      setAceptoTyCNew(aceptarTyC);
    }
  };

  const retroceder = async (e) => {
    setNavegacionRetroceder(true);
  };

  if (NavegacionRetroceder) {
    return <Navigate to="/" />;
  }

  const IrConductor = async (e) => {
    setNavegaConductor(true);
  };

  const IrVehiculo = async (e) => {
    setNavegaVehiculo(true);
  };

  const IrAsignacion = async (e) => {
    setNavegaAsignacion(true);
  };

  if (NavegaConductor) {
    return (
      <Navigate
        to="/Conductor"
        // validator={validator}
        guid_sub_modalidad_ingreso={datoUsuario.guid_submodalidad_ingreso}
        handleVistas={handleVistas}
        // handleCargaMatrizDocumento={handleCargaMatrizDocumento}
        beneficiosEconomicos={
          datoUsuario.submodalidad_tiene_beneficio_economico
        }
      />
    );
  }

  if (NavegaVehiculo) {
    return (
      <Navigate
        to="/Vehiculo"
        // validator={validator}
        guid_sub_modalidad_ingreso={datoUsuario.guid_submodalidad_ingreso}
        handleVistas={handleVistas}
        // handleCargaMatrizDocumento={handleCargaMatrizDocumento}
        beneficiosEconomicos={
          datoUsuario.submodalidad_tiene_beneficio_economico
        }
      />
    );
  }

  if (NavegaAsignacion) {
    return (
      <Navigate
        to="/Asignacion"
        // validator={validator}
        guid_sub_modalidad_ingreso={datoUsuario.guid_submodalidad_ingreso}
        handleVistas={handleVistas}
        // handleCargaMatrizDocumento={handleCargaMatrizDocumento}
        beneficiosEconomicos={
          datoUsuario.submodalidad_tiene_beneficio_economico
        }
      />
    );
  }

  return (
    <>
      {
        <div>
          <Helmet>
            <title>Menú</title>
          </Helmet>
          <div
            style={
              vistaCargaDocumento.visible == true
                ? { display: "none" }
                : { display: "block" }
            }
          >
            <Header> </Header>

            <Container style={{ "margin-top": "8rem" }}>
              <Titulo>Menú</Titulo>

              <Formulario action="" onSubmit={handleSubmit}>
                <Card style={{ borderRadius: "0px", margin: "1rem" }}>
                  <Card.Body style={{ padding: "0px" }}>
                    <Card.Text style={{ padding: "1rem" }}>
                      <Row>
                        <Col sm={5}>
                          <Card.Title
                            style={{
                              background: "#6c757d",
                              color: "#fff",
                              padding: "1rem",
                              fontSize: "18px",
                            }}
                          >
                            Registrar Nuevo Conductor
                          </Card.Title>
                          <center>
                            <button
                              className="btn btn-info btn-block"
                              style={{ width: "190px", height: "140px" }}
                              onClick={IrConductor}
                            >
                           
                              <img
                                src={ImagenConductor}
                                alt="" 
                                style={{ width: "190px", height: "140px" }}
                                align-content="center"
                              />
                            </button>
                          </center>
                        </Col>
                        <br /> <br />
                        <Col sm={5}>
                          <Card.Title
                            style={{
                              background: "#6c757d",
                              color: "#fff",
                              padding: "1rem",
                              fontSize: "18px",
                            }}
                          >
                            Registrar Nuevo Vehiculo
                          </Card.Title>
                          <center>
                            <button
                              className="btn btn-info btn-block"
                              style={{ width: "190px", height: "140px" }}
                              onClick={IrVehiculo}
                            >
                              <img
                                src={ImagenBus}
                                alt="" 
                                style={{ width: "190px", height: "140px" }}
                                align-content="center"
                              />
                            </button>
                          </center>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ borderRadius: "0px", margin: "1rem" }}>
                  <Card.Body style={{ padding: "0px" }}>
                    <Card.Text style={{ padding: "1rem" }}>
                      <Row>
                        <Col sm={5}>
                          <Card.Title
                            style={{
                              background: "#6c757d",
                              color: "#fff",
                              padding: "1rem",
                              fontSize: "18px",
                            }}
                          >
                            Asignacion de Conductores a Vehiculos
                          </Card.Title>
                          <center>
                            <button
                              className="btn btn-info btn-block"
                              style={{ width: "190px", height: "140px" }}
                              onClick={IrAsignacion}
                            >
                              <img
                                src={ImagenAsignacion}
                                alt="" 
                                style={{ width: "190px", height: "140px" }}
                                align-content="center"
                              />
                            </button>
                          </center>
                        </Col>

                        <Col sm={5}>
                          <Card.Title
                            style={{
                              background: "#6c757d",
                              color: "#fff",
                              padding: "1rem",
                              fontSize: "18px",
                            }}
                          >
                            Buzon de Usuarios
                          </Card.Title>
                          <center>
                            <button
                              className="btn btn-info btn-block"
                              style={{ width: "190px", height: "140px" }}
                              onClick={retroceder}
                            >
                              <img
                                src={ImagenBuzon}
                                alt="" 
                                style={{ width: "190px", height: "140px" }}
                                align-content="center"
                              />
                            </button>
                          </center>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card style={{ borderRadius: "0px", margin: "1rem" }}>
                  <Card.Body style={{ padding: "0px" }}>
                    <Card.Text style={{ padding: "1rem" }}>
                      <Row>
                        <Col sm={5}>
                          <Card.Title
                            style={{
                              background: "#6c757d",
                              color: "#fff",
                              padding: "1rem",
                              fontSize: "18px",
                            }}
                          >
                            Colaboradores
                          </Card.Title>
                          <center>
                            <button
                              className="btn btn-info btn-block"
                              style={{ width: "190px", height: "140px" }}
                              onClick={retroceder}
                            >
                              <img
                                src={ImagenColaboradore}
                                alt="" 
                                style={{ width: "190px", height: "140px" }}
                                align-content="center"
                              />
                            </button>
                          </center>
                        </Col>
                        <br /> <br />
                        <Col sm={5}>
                          <Card.Title
                            style={{
                              background: "#6c757d",
                              color: "#fff",
                              padding: "1rem",
                              fontSize: "18px",
                            }}
                          >
                            Alertas de Desvio
                          </Card.Title>
                          <center>
                            <button
                              className="btn btn-info btn-block"
                              style={{ width: "190px", height: "140px" }}
                              onClick={retroceder}
                            >
                              <img
                                src={ImagenAlerta}
                                alt="" 
                                style={{ width: "190px", height: "140px" }}
                                align-content="center"
                              />
                            </button>
                          </center>
                        </Col>
                      </Row>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <ContenedorBotonCentrado>
                  <BotonGris as="button" type="submit" onClick={retroceder}>
                    Cancelar
                  </BotonGris>
                </ContenedorBotonCentrado>
              </Formulario>
              <Footer>
                <p>© 2022 Aplicativo Movil</p>
              </Footer>
            </Container>
          </div>

          <ProgressIntoDialog open={loading} />
        </div>
      }
    </>
  );
};
export default Ficha;
