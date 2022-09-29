import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Titulo, Formulario, FormularioGrid, Label, InputRadio, Wrapper, Item, RadioButton, RadioButtonLabel, InputCheck, ContenedorTerminos, ContenedorBotonCentrado, BotonAmarillo, BotonGris, MensajeExito, MensajeError, MensajeDocumentos } from '../elementos/FormFicha';
import axios from 'axios';
import DocumentosOcultos2 from '../parameters/DocumentsOcul';
import '../wwwroot/css/uploadFile.css'
import ProgressIntoDialog from '../componentes/Progress/Progress';
import { Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ComponenteInput from './Input';
import { Footer } from '../elementos/Footers';
import moment from 'moment';
import DatePicker from 'react-date-picker';
import ComponenteSelectSexo from './SelectSexo';
import SimpleReactValidator from 'simple-react-validator';
import Modal from 'react-bootstrap/Modal';
import { BotonAmarilloModal, BotonGrisModal, TextoRojoModal } from '../elementos/FormModal';

const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;

const Vehiculo = ({ usuarios }) => {
  const [docs, setDocs] = useState([]);
  const [SS, setSS] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cargaExitosa, setcargaExitosa] = useState(true);
  const [contador, setcontador] = useState(-1);
  //const [mostrarBadgeGrupo,setmostrarBadgeGrupo]=useState(false);
  const [idGrupo, setidGrupo] = useState(0);
  const [activarBoton, setactivarBoton] = useState(''); 
  const [datosDeclaracion, setPostDeclaracion] = useState([]);
  const [showModal, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [value, onChange] = useState(new Date());
  const today = new Date();
  const [NavegacionRetroceder, setNavegacionRetroceder] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [ModeloNew, setModeloNew] = useState('');
  const [PlacaNew, setPlacaNew] = useState('');
  const [FechadeCompraNew, setFechadeCompraNew] = useState('');
  const [SerieNew, setSerieNew] = useState('');
  const [successRegistro, setSuccessRegistro] = useState(false);
   
  usuarios = localStorage.getItem("user");

  SimpleReactValidator.addLocale('es', {
    accepted: ':attribute debe ser aceptado.',
    after: ':attribute debe ser una fecha posterior a :date.',
    after_or_equal: ':attribute debe ser una fecha posterior o igual a :date.',
    alpha: ':attribute sólo debe contener letras.',
    array: ':attribute debe ser un conjunto.',
    before: ':attribute debe ser una fecha anterior a :date.',
    before_or_equal: ':attribute debe ser una fecha anterior o igual a :date.',
    between: ':attribute tiene que estar entre :min - :max:type.',
    boolean: 'El campo :attribute debe tener un valor verdadero o falso.',
    date: ':attribute no es una fecha válida.',
    date_equals: ':attribute debe ser una fecha igual a :date.',
    email: ':attribute no es un correo válido',
    in: ':attribute es inválido :values.',
    integer: ':attribute debe ser un número entero.',
    max: 'El :attribute no debe ser mayor a :max carácteres.',
    min: 'El :attribute debe ser de al menos :min carácteres.',
    not_in: ':attribute es inválido :values.',
    not_regex: 'El formato del campo :attribute no es válido.',
    numeric: 'El :attribute debe ser numérico.',
    regex: 'El formato de :attribute es inválido.',
    required: 'El campo :attribute es obligatorio.',
    size: 'El tamaño de :attribute debe ser :size:type.',
    string: 'El campo :attribute debe ser una cadena de caracteres.',
    url: 'El formato :attribute es inválido.',
  });


  const [, forceUpdate] = useState();
  const validator = useRef(new SimpleReactValidator({ locale: 'es', autoForceUpdate: { forceUpdate: forceUpdate } }))
 
   

  async function enviarRegistro() {
    setLoading(true);
      const response = await axios.post(baseUrlGDO + 'api/Conductor/agregar-vehiculo',
      JSON.stringify({
        usuario: usuarios,
        modelo: ModeloNew,
        placa: PlacaNew,
        fechaCompra: FechadeCompraNew,
        serie: SerieNew,
        
        }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: false
        }
       
      ).catch(function (err) {
        setSuccessRegistro(false)
        if (err.response) {
          setErrMsg(err.response.data.message);
        } else if (err.request) {
          setErrMsg('Ha ocurrido un error al registrar la ficha de postulación. Porfavor intente nuevamente');
        } else {
          setErrMsg('Ha ocurrido un error al registrar la ficha de postulación. Porfavor intente nuevamente');
        }
      });
        console.log(response); 
        const accessToken = response?.data?.accessToken;
        setSuccessRegistro(true);
     setLoading(false);
  }



  const handleSubmit = (e) => {
    e.preventDefault();
    if (validator.current.allValid()) {
      setactivarBoton(false);
      handleShow();
    }
    else {
      validator.current.showMessages();
    //   forceUpdate(1)
      setactivarBoton(true)
    }
  }

  function enviarFuncionAceptar() {
    enviarRegistro()
  }

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'Modelo':
        setModeloNew(e.target.value);
        break;

        case 'Placa':
          setPlacaNew(e.target.value);
          break; 
         
        case 'FechadeCompra':
            setFechadeCompraNew(e.target.value);
            break; 
        
        case 'Serie':
              setSerieNew(e.target.value);
              break; 
       
         default:
      break;
    }
  }

   const retroceder = async (e) => {
    setNavegacionRetroceder(true);
   }

    if (NavegacionRetroceder) {
    return <Navigate to="/Ficha" /> 
   }


   if (successRegistro == true) {
    return <Navigate to="/Ficha" />;
  }

  return (
    <>
      {
          <div>
            showModal ? (
           <Modal show={showModal} onHide={handleClose}>
             <Modal.Header /*closeButton*/ >
               <Modal.Title>¿Estás seguro que la información ingresada es correcta?</Modal.Title>
             </Modal.Header>
             <Modal.Body>Asegúrate de completar tus datos correctamente en base a la información de tu DNI</Modal.Body>
             <Modal.Footer>
               <BotonGrisModal type="submit" onClick={handleClose}  /* onClick={handleCancelar} */>Cancelar</BotonGrisModal>
               <BotonAmarilloModal
                 disabled={activarBoton}
                 onClick={enviarFuncionAceptar}
                 style={activarBoton == true ? { backgroundColor: '#ccc' } : { backgroundColor: '#ffc107' }}
               >Aceptar
               </BotonAmarilloModal>
             </Modal.Footer>
           </Modal>  
          <Container style={{ 'margin-top': '8rem' }}>
            <Titulo>
              NUEVO VEHICULO
            </Titulo>
            <Formulario action="" onSubmit={handleSubmit}>
              <Card style={{ borderRadius: '0px', margin: '1rem' }}>
                <Card.Body style={{ padding: '0px' }}>
                  <Card.Title style={{ background: '#6c757d', color: '#fff', padding: '1rem', fontSize: '18px' }}>REGISTRAR  NUEVO VEHICULO</Card.Title>
                  <Card.Text style={{ padding: '1rem' }}>
                    <Row>
                      <Col sm={6}>
                        <ComponenteInput
                          tipo="text"
                          label="Modelo"
                          placeholder={''}
                          name="Modelo"
                          onChange={handleChange}
                          value={ModeloNew}
                        />
               {validator.current.message('Modelo', ModeloNew, 'required', { className: "text-danger" })}
                      </Col>
 

                      <Col sm={6}>
                        <ComponenteInput
                          tipo="text"
                          label="Placa"
                          placeholder={''}
                          name="Placa"
                          onChange={handleChange}
                          value={PlacaNew}
                        />
                 {validator.current.message('Placa', PlacaNew, 'required', { className: "text-danger" })}
         
                      </Col>
                 
                      <Col sm={6}>
                        <div>
                        <ComponenteInput
                          tipo="date"
                          label="Fecha de Compra"
                          placeholder={''}
                          name="FechadeCompra"
                          onChange={handleChange}
                          value={FechadeCompraNew}
                        />
                  {validator.current.message('Fecha de Compra', FechadeCompraNew, 'required', { className: "text-danger" })}
                            </div>
                         </Col>
 
                    </Row>
                    <Row>
                      <Col sm={6}>
                        <ComponenteInput
                          tipo="text"
                          label="Serie"
                          placeholder={''}
                          name="Serie"
                          onChange={handleChange}
                          value={SerieNew}
                        />
                   {validator.current.message('Serie', SerieNew, 'required', { className: "text-danger" })}
               
                      </Col>
                    </Row> 

                  </Card.Text>
                </Card.Body>
              </Card>
              <ContenedorBotonCentrado>
                                <BotonAmarillo as="button" type="submit"  /*onChange={submitForm}*/ >Registrar</BotonAmarillo>
                                <MensajeExito>Formulario enviado exitosamente!</MensajeExito>
                                <BotonGris as='button' type='submit' onClick={retroceder}>Cancelar</BotonGris>
                                <MensajeExito>Formulario cancelado exitosamente!</MensajeExito>
                              </ContenedorBotonCentrado>

            </Formulario>
            <Footer><p>© 2022 Aplicativo Movil</p></Footer>
          </Container>
          </div>
      }

    </>
  );

}



export default Vehiculo














