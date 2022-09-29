import React, { useEffect, useState,useRef } from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Header, LogoOscuro } from '../elementos/Headers';
import { Titulo, Formulario, FormularioGrid, Label, InputRadio, Wrapper, Item, RadioButton, RadioButtonLabel, InputCheck, ContenedorTerminos,PoliticasDatosPersonales, ContenedorBotonCentrado, BotonAmarillo, BotonGris, MensajeExito, MensajeError, MensajeDocumentos } from '../elementos/FormFicha';
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
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { BotonAmarilloModal, BotonGrisModal, TextoRojoModal } from '../elementos/FormModal';

const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;

const Conductor = ({usuarios}) => {
   
  const [loading, setLoading] = useState(false);
  const [cargaExitosa, setcargaExitosa] = useState(true);
  const [contador, setcontador] = useState(-1);
  //const [mostrarBadgeGrupo,setmostrarBadgeGrupo]=useState(false);
  const [idGrupo, setidGrupo] = useState(0);
  const [datosDeclaracion, setPostDeclaracion] = useState([]);
  const [showModal, setShow] = useState(false);
  const [value, onChange] = useState(new Date());
  const today = new Date();
  const [NavegacionRetroceder, setNavegacionRetroceder] = useState(false);
  const [ApellidosNew, setApellidosNew] = useState('');
  const [NombresNew,setNombresNew]=useState('');
  const [DNINew,setDNINew]=useState('');
  const [FechaDeNacimientoNew,setFechaDeNacimientoNew]=useState('');
  const [DireccionNew,setDireccionNew]=useState('');
  const [NumeroLicenciaNew,setNumeroLicenciaNew]=useState('');
  const [FechaExpedicionNew,setFechaExpedicionNew]=useState('');
  const [TelefonoNew,setTelefonoNew]=useState('');
  const [tipoPoliticaPersonales,settipoPoliticaPersonales]=useState('');
  const [errMsg, setErrMsg] = useState('');
  const [SexoNew,setSexoNew]=useState('');
  const [CorreoNew,setCorreoNew]=useState('');
  const [successRegistro, setSuccessRegistro] = useState(false);
  const [activarBoton, setactivarBoton] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [Documento, setDocumento] = useState({ codigo: '', nombre: '', numero: '' });
  const [esobligatoriounvalor,setesobligatoriounvalor]=useState('');
  
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

 

   useEffect(() => {
    setErrMsg("");
  }, [usuarios]);


  async function enviarRegistro() {
    setLoading(true);
      const response = await axios.post(baseUrlGDO + 'api/Conductor/agregar-conductor',
      JSON.stringify({
          IdSexo: Documento.codigo,
          idusuario: usuarios,
          Apellido: ApellidosNew,
          NombreCompleto: NombresNew,
          Dni: DNINew,
          FechaNcimiento: FechaDeNacimientoNew,
          Direccion: DireccionNew,
          NumeroLicencia: NumeroLicenciaNew,
          FechaExpedicion: FechaExpedicionNew,
          Telefono: TelefonoNew,
          Correo: CorreoNew,
          LicenciaValidada: esobligatoriounvalor
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
        const id_fichaMatricula = response?.data.idFichaMatricula;
        // setFichaMatricula(id_fichaMatricula);
        const accessToken = response?.data?.accessToken;
        setSuccessRegistro(true);
     setLoading(false);
  }

 
 


  const handleRadioButtonPoliticas = (event) => {
    const value = event.target.value;
    validator.current.purgeFields();
    settipoPoliticaPersonales(value);
         if (value == 1) {
          setesobligatoriounvalor(true);
         } else if (value == 2) {
          setesobligatoriounvalor(false);
         }
  };

  const handleSubmit = (e) => {
    console.log('entra al click')
    e.preventDefault();
    if (validator.current.allValid()) {
      console.log('ifff')
      setactivarBoton(false);
      handleShow();
    }
    else {
      console.log('else')
      validator.current.showMessages();
      forceUpdate(1)
     
    }
  }


  function enviarFuncionAceptar() {
    enviarRegistro()
  }


  const handleSexo = (guidSexo, nombre_doc, numero_doc) => {
    setDocumento({ codigo: guidSexo, nombre: nombre_doc, numero: numero_doc });
  }


  const handleChange = (e) => {
    switch (e.target.id) {
      case 'Apellidos':
        setApellidosNew(e.target.value);
        break;
      case 'Nombres':
        setNombresNew(e.target.value);
        break;
        case 'DNI':
          setDNINew(e.target.value);
          break;
          case 'FechaDeNacimiento':
            setFechaDeNacimientoNew(e.target.value);
            break;
            case 'Direccion':
              setDireccionNew(e.target.value);
              break;
              case 'NumeroLicencia':
                setNumeroLicenciaNew(e.target.value);
                break;
                case 'FechaExpedicion':
                  setFechaExpedicionNew(e.target.value);
                  break;
                 
                  case 'Telefono':
                  setTelefonoNew(e.target.value);
                  break;

                  case 'Sexo':
                    setSexoNew(e.target.value);
                    break;
                    case 'Correo':
                      setCorreoNew(e.target.value);
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
      return <Navigate to="/" />;
    }
   
    console.log(Documento);
     
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
         NUEVO CONDUCTOR
       </Titulo>
       <Formulario action="" onSubmit={handleSubmit}>
         <Card style={{ borderRadius: '0px', margin: '1rem' }}>
           <Card.Body style={{ padding: '0px' }}>
             <Card.Title style={{ background: '#6c757d', color: '#fff', padding: '1rem', fontSize: '18px' }}>REGISTRAR NUEVO CONDUCTOR</Card.Title>
             <Card.Text style={{ padding: '1rem' }}>
               <Row>
                 <Col sm={6}>
                   <ComponenteInput
                     tipo="text"
                     label="Apellidos"
                     placeholder={''}
                     name="Apellidos"
                     onChange={handleChange}
                     value={ApellidosNew}
                   />
                    {validator.current.message('Apellidos', ApellidosNew, 'required', { className: "text-danger" })}
              
                 </Col>
                 <Col sm={6}>
                   <ComponenteInput
                     tipo="text"
                     label="Nombres"
                     placeholder={'Nombres'}
                     name="Nombres"
                     onChange={handleChange}
                     value={NombresNew}
                   />
                    {validator.current.message('Nombres', NombresNew, 'required', { className: "text-danger" })}
                 </Col>
                 <Col sm={6}>
                   <ComponenteInput
                     tipo="text"
                     label="DNI"
                     placeholder={'DNI'}
                     name="DNI"
                     onChange={handleChange}
                     value={DNINew}
                     // expresionRegular="/[0-9]{8}/"
                   />
                    {validator.current.message('Documento de Identidad', DNINew, 'required', { className: "text-danger" })}
                 </Col>
                 <Col sm={6}>
                   <div>
                   <ComponenteInput
                     tipo="date"
                     label="Fecha De Nacimiento"
                     placeholder={'Fecha De Nacimiento'}
                     name="FechaDeNacimiento"
                     onChange={handleChange}
                     value={FechaDeNacimientoNew}
                   />
                  {validator.current.message('Fecha De Nacimiento', FechaDeNacimientoNew, 'required', { className: "text-danger" })}
                   </div>
                  </Col>
               </Row>
               <Row>
     
                 <Col sm={6}>
                   <ComponenteInput
                     tipo="text"
                     label="Direccion"
                     placeholder={'Direccion'}
                     name="Direccion"
                     onChange={handleChange}
                     value={DireccionNew}
                   />
                    {validator.current.message('Direccion', DireccionNew, 'required', { className: "text-danger" })}
                 </Col>
               </Row>


               <Row>
                 <Col sm={8}>
                   <ComponenteInput
                     tipo="text"
                     label="Numero Licencia"
                     placeholder={'Numero Licencia'}
                     name="NumeroLicencia"
                     onChange={handleChange}
                     value={NumeroLicenciaNew}
                   />
                    {validator.current.message('Numero Licencia', NumeroLicenciaNew, 'required', { className: "text-danger" })}
                 </Col>
             
                 <Col sm={6}>
                   <div>
                   <ComponenteInput
                     tipo="date"
                     label="Fecha Expedicion"
                      placeholder={'Fecha Expedicion'}
                     name="FechaExpedicion"
                     onChange={handleChange}
                     value={FechaExpedicionNew}
                   />
                    {validator.current.message('Fecha Expedicion', FechaExpedicionNew, 'required', { className: "text-danger" })}
                </div>
               </Col>
            </Row>

               <Row>
                 <Col sm={6}>
                   <ComponenteInput
                     tipo="text"
                     label="Telefono"
                     placeholder={'Telefono'}
                     name="Telefono"
                     onChange={handleChange}
                     value={TelefonoNew}
                   />
                   {validator.current.message('Telefono', TelefonoNew, 'required', { className: "text-danger" })}
                        </Col>
                         <Col sm={4}>
                               <ComponenteSelectSexo
                                 label="Sexo"
                                 placeholder="--SELECCIONE--"
                                 name="Sexo"
                                 handleSexo={handleSexo}
                                 value={SexoNew}
                                  
                                 //guidSexo={datoUsuario.codigo_genero}
                                // validator={validator}
                                 //esobligatorio={true}
                               />
                             </Col>
                             <Row>
                 <Col sm={6}>
                   <ComponenteInput
                     tipo="text"
                     label="Correo"
                     placeholder={'Correo'}
                     name="Correo"   
                     onChange={handleChange}
                     value={CorreoNew}
                   />
                    {validator.current.message('Correo', CorreoNew, 'required', { className: "text-danger" })}
                  </Col>
                   <Col sm={6}>
                   <Item>
                                             <RadioButton
                                               type="checkbox"
                                               name="radio"
                                               value="1"
                                               checked={tipoPoliticaPersonales === "1"}
                                               onChange={(event) => handleRadioButtonPoliticas(event)}
                                             />
                                             <RadioButtonLabel />
                                             <div>Licencia Validada en MTC</div>
                                           </Item>
                       {validator.current.message('Licencia Valida en MTC', esobligatoriounvalor, 'required', { className: "text-danger" })}
                   </Col>
                  </Row>
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
<ProgressIntoDialog open={loading} />
    </>
  );

}



export default Conductor














