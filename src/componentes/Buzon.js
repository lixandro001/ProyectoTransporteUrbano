import React, { useEffect, useState } from 'react'
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
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Grid ,OutlinedInput,InputAdornment,Box} from '@material-ui/core';
import { Icon } from '@iconify/react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BorderColorSharpIcon from '@material-ui/icons/BorderColorSharp';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Redirect } from 'react-router';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import Swal from 'sweetalert2';
import TablePagination from '@material-ui/core/TablePagination';
import searchFill from '@iconify-icons/eva/search-fill';
import close from '@iconify-icons/eva/close-circle-outline';
import edit from '@iconify-icons/eva/edit-2-fill';
import Modal from 'react-bootstrap/Modal';
import { BotonAmarilloModal, BotonGrisModal, TextoRojoModal } from '../elementos/FormModal';
import ComponenteSelectSexo from './SelectSexo';
import Ruta from './Ruta';
  
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#00704a',
      color: theme.palette.common.white,
      width: 10,
      padding: 4,
      margin: 3,
    },
    body: {
      fontSize: 1,
    },
  }))(TableCell);

const useStyles = makeStyles({
    table: {
      minWidth: 100,
    },
  });
 
const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;
  
const Buzon = ({   usuarios }) => {
  const classes = useStyles();    
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
  const [newRegister, setNewRegister] = React.useState(false);
  const [messageError,setMessageError] = React.useState('');
  const [IdEdit, setIdEdit] = React.useState('');
  const [EditRegister, setEditRegister] = React.useState(false);
  const [UserCodeDelete, setUserCodeDelete] = React.useState('');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [NameCall, setNameCall] = React.useState('');
  const [ListUser, setListUser] = React.useState([]);
  const [Listadatos, setPost] = useState([]);
  const [DataObjeto,setDataObjeto]= useState([]);
  const [DataObjetoVehiculos,setDataObjetoVehiculos]= useState([]);
  const [successRegistro, setSuccessRegistro] = useState(false);
  const [SuccessRegistroHorario, setSuccessRegistroHorario] = useState(false);
   

  const [errMsg, setErrMsg] = useState('');
  const [tipoPoliticaPersonales,settipoPoliticaPersonales]=useState('');
  const [esobligatoriounvalor,setesobligatoriounvalor]=useState(false);

  const [idConductoeData,setidConductoeData]= React.useState('');
  const [nombreConductor,setnombreConductor]= React.useState('');
  const [IdVehiculoData,setIdVehiculoData]= React.useState('');
  const [nombreVehiculo,setnombreVehiculo]= React.useState('');

  const [dniconductor,setdniconductor]= React.useState('');
  const [licenciaconductor,setlicenciaconductor]= React.useState('');

  const [Documento, setDocumento] = useState({ codigo: '', nombre: '', numero: '' });
  const [SexoNew,setSexoNew]=useState('');

  const [RutaNew,setRuta]=useState({codigo:'',nombreHorario:''});


  const [checklunes,setchecklunes]= React.useState(false);
  const [checkmartes,setcheckmartes]= React.useState(false);
  const [checkmiercoles,setcheckmiercoles]= React.useState(false);
  const [checkjueves,setcheckjueves]= React.useState(false);
  const [checkviernes,setcheckviernes]= React.useState(false);
  const [checksabado,setchecksabado]= React.useState(false);
  const [checkdomingo,setcheckdomingo]= React.useState(false);
  
 

  usuarios = localStorage.getItem("user");


  const rows = [
    createData('1', 'Edwin', '561615616', 'Activo'),
  ];
  
  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }
   
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

 
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

 

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

   
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

 

  function obtenerRegistro(page = '1',query = '') {
    const data = {
      query,
      page
    };
    setLoading(true);
    var auth = {
      headers: { 'Content-Type': 'application/json'}
    };
    const params = `query=${data.query}&page=${data.page}`;
    // axios('get', `${URL.produc}/categoria/listado-categoria?${params}`, true)
    axios.get(baseUrlGDO + `api/Conductor/listado-conductor?${params}`, true)
      .then(response => {
        var docs = response.data
        console.log(docs); 
        // Se determina el tipo de ficha y el titulo dependiendo de la version del CRM
        // validator.current.purgeFields();  
        console.log(docs.entries); 
        setDataObjeto(docs.entries);
        setLoading(false);
        return response.data;
      })
      .catch(err => {
      });
  }


  function obtenerRegistroVehiculos(page = '1',query = '') {
    const data = {
      query,
      page
    };
    setLoading(true);
    var auth = {
      headers: { 'Content-Type': 'application/json'}   
    };
    const params = `query=${data.query}&page=${data.page}`;
    // axios('get', `${URL.produc}/categoria/listado-categoria?${params}`, true)
    axios.get(baseUrlGDO + `api/Conductor/listado-vehiculo?${params}`, true)
      .then(response => {
        var docs = response.data
        console.log(docs); 
        // Se determina el tipo de ficha y el titulo dependiendo de la version del CRM
        // validator.current.purgeFields();  
        console.log(docs.entries); 
        setDataObjetoVehiculos(docs.entries);
        setLoading(false);
        return response.data;
      })
      .catch(err => {
      });
  }


   
  const handleKeyPress = ({ target }) => {
    const query = target.value;
    const page = '1';
    if (query.length >= 0) {
      obtenerRegistro(page, query);
    } else {
      obtenerRegistro(page, query);
    }
  };


  const handleKeyPressVehiculo =({target})=>{
    const query = target.value;
    const page = '1';
    if (query.length >= 0) {
      obtenerRegistroVehiculos(page, query);
    } else {
      obtenerRegistroVehiculos(page, query);
    }
  }


  const handleSubmit = (e) => {
    e.preventDefault();   
  }

 


  const handleclickEditar = async (e) => {
     
    const IdConductord = e.currentTarget.id;
    const nombreConductord = e.currentTarget.name;
  
    setidConductoeData(IdConductord);
    setnombreConductor(nombreConductord);
  
    try { 
      if (IdConductord.length>0 && IdVehiculoData.length>0) {
        setactivarBoton(true);
        handleShow();
        //enqueueSnackbar(message, { variant: 'success' });
       if(idConductoeData.length>0 && IdVehiculoData.length>0){
        setactivarBoton(false);
        handleShow();
       }else{
        setactivarBoton(true);
       }
         
      } else {
      }
    } catch (error) {
      console.error(error);
    }
  };


    
  const handleclickEditarVehiculo = async (e) => {
    const IdVehiculo= e.currentTarget.id;
    const nombreVehiculo = e.currentTarget.name;
    setIdVehiculoData(IdVehiculo);
    setnombreVehiculo(nombreVehiculo);
    console.log(IdVehiculo);
    console.log(nombreVehiculo);
    // try { 
      
    // } catch (error) {
    //   console.error(error);
    // }
  };
 
  function enviarFuncionAceptar() {
     enviarRegistroAsignacion()
  }

  async function enviarRegistroAsignacion() {
    setLoading(true);
      const response = await axios.post(baseUrlGDO + 'api/Conductor/asignar-vehiculos',
      JSON.stringify({
        idvehiculo: IdVehiculoData,
        idconductor: idConductoeData,
        duenoVehiculo: esobligatoriounvalor     
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
        enviarRegistroAsignacionFechasDias();
        setSuccessRegistro(true);
       
     setLoading(false);
  }
 
  async function enviarRegistroAsignacionFechasDias() {
    setLoading(true);
      const response = await axios.post(baseUrlGDO + 'api/Conductor/agregar-asignacion-horarios-dias',
      JSON.stringify({

          IdUsuario: usuarios,
          IdConductor: parseInt(idConductoeData),
          lunes: checklunes,
          martes: checkmartes,
          miercoles: checkmiercoles,
          jueves: checkjueves,
          viernes: checkviernes,
          sabado: checksabado,
          domingo: checkdomingo
  
        }),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: false
        }
       
      ).catch(function (err) {
        setSuccessRegistroHorario(false)
        if (err.response) {
          setErrMsg(err.response.data.message);
        } else if (err.request) {
          setErrMsg('Ha ocurrido un error al registrar la ficha de postulación. Porfavor intente nuevamente');
        } else {
          setErrMsg('Ha ocurrido un error al registrar la ficha de postulación. Porfavor intente nuevamente');
        }
      });
        console.log(response);
       
        setSuccessRegistroHorario(true);
     setLoading(false);
  }
 
  
  const retroceder = async (e) => {
    setNavegacionRetroceder(true);
  }

    if (NavegacionRetroceder) {
    return <Navigate to="/Ficha" /> 
  }

  const handleRuta = (codigo, nombre) => {
    setRuta({ codigo:codigo, nombre:nombre});
  }


  const handleRadioButtonPoliticas = (event) => {
    const value = event.target.value;
     
    settipoPoliticaPersonales(value);
         if (value == 1) {
          setesobligatoriounvalor(true);
         } else if (value == 2) {
          setesobligatoriounvalor(false);
         }
  };

  const handleChangelunes = (event) => {
   console.log(event.target.checked);    
   setchecklunes(event.target.checked);
  };
  const handleChangemartes = (event) => {
    console.log(event.target.checked);    
    setcheckmartes(event.target.checked);
   };
   const handleChangemiercoles = (event) => {
    console.log(event.target.checked);    
    setcheckmiercoles(event.target.checked);
   };
   const handleChangejueves = (event) => {
    console.log(event.target.checked);    
    setcheckjueves(event.target.checked);
   };
   const handleChangeviernes = (event) => {
    console.log(event.target.checked);    
    setcheckviernes(event.target.checked);
   };
   const handleChangesabado = (event) => {
    console.log(event.target.checked);    
    setchecksabado(event.target.checked);
   };
   const handleChangedomingo = (event) => {
    console.log(event.target.checked);    
    setcheckdomingo(event.target.checked);
   };
   

  if (successRegistro == true) {
    return <Navigate to="/ficha" />;
  }

  
console.log(DataObjeto)
 

  return (
    <>
      {
          <div>   
            <Modal show={showModal} onHide={handleClose}>
             <Modal.Header /*closeButton*/ >
               <Modal.Title>Esta Seleccionando al Conductor : ({nombreConductor}) para asignarlo al vehiculo con N° de Placa :({nombreVehiculo})</Modal.Title>
             </Modal.Header>
             <Modal.Body>
               
                 <Col sm={6}>
                 <h2> Datos del Conductor : </h2>  
                 {nombreConductor}
                 </Col>

                 <Col sm={6}>
                 <h2> Datos del Vehiculo  : </h2>  
                 {nombreVehiculo}
                 </Col>
                 <br /> <br />
                 
                 <label>
                   LUNES:  
                  <input  
                  name="lunes"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangelunes}
                   />
                 </label>

       
        <br />
        <label>
                   MARTES:
                  <input
                  name="martes"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangemartes}
                   />
                 </label>
        <br />
        <label>
                   MIERCOLES:
                  <input
                  name="miercoles"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangemiercoles}
                   />
                 </label>
        <br />
        <label>
                   JUEVES:
                  <input
                  name="jueves"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangejueves}
                   />
                 </label>
        <br />
        <label>
                   VIERNES:
                  <input
                  name="viernes"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangeviernes}
                   />
                 </label>
        <br />
                 <label>
                  SABADO:
                  <input
                  name="sabado"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangesabado}
                   />
                 </label>
        <br />
        <label>
                  DOMINGO:
                  <input
                  name="domingo"
                  type="checkbox"
                  // checked={}
                  onChange={handleChangedomingo}
                   />
                 </label>
                  <br /><br /><br />
       
 
                            <Col sm={4}>
                               <Ruta
                                 label="Ruta"
                                 placeholder="--SELECCIONE--"
                                 name="Ruta"
                                 handleRuta={handleRuta}
                                 value={RutaNew}
                                 urlapi={baseUrlGDO + "api/Conductor/listado-rutas-combo"}
                                 // handleHorario={handleHorario}
                                 //guidSexo={datoUsuario.codigo_genero}
                                // validator={validator}
                                 //esobligatorio={true}
                               />
                             </Col> 
                              
             </Modal.Body>
             <br />
                         
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
            Buzon
            </Titulo>
            <Formulario action="" onSubmit={handleSubmit}>
              <Card style={{ borderRadius: '0px', margin: '1rem' }}>
                <Card.Body style={{ padding: '0px' }}>
                  <Card.Title style={{ background: '#6c757d', color: '#fff', padding: '1rem', fontSize: '18px' }}>GESTION DE ASIGNACION</Card.Title>
                  <Card.Text style={{ padding: '1rem' }}>
                    <Row>  
                      <Col sm={10}>
                        <div>
                          

                            <Grid container>
                            <Grid item xs={1} style={{paddingBottom:5, textAlign:'left'}}>
                            </Grid>
                            </Grid>
                            <Grid container >
                            <Grid item xs={6} >
                            <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                            <TableRow>         
                                <StyledTableCell align="left">codigo</StyledTableCell>
                                <StyledTableCell align="left">dias</StyledTableCell>
                                <StyledTableCell align="left">tipo</StyledTableCell>     
                                <StyledTableCell align="left">estado</StyledTableCell>    
                                <StyledTableCell align="left">origen</StyledTableCell>
                                <StyledTableCell align="left">acciones</StyledTableCell>          
                            </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                DataObjeto.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element,index) =>
                                <StyledTableRow>
                                <StyledTableCell align="left">{element.dni}</StyledTableCell>
                                <StyledTableCell align="left">{element.apellido +' '+ element.nombreCompleto}</StyledTableCell>
                                <Button 
                                  id={element.idConductor}
                                  name={element.apellido +' '+ element.nombreCompleto +' con N° DNI: '+ element.dni +' y N° Licencia:'+ element.numeroLicencia}
                                   
                                  onClick={(e) => handleclickEditar(e)}
                                  className="Seleccionar"
                                >
                                  <Icon width={40} height={40} icon={edit} />
                                </Button>

                                </StyledTableRow>
                                )}
                                {emptyRows > 0 && (
                                <TableRow style={{ height: 1 * emptyRows }}>
                                <TableCell colSpan={8} style={{display:'none'}}/>
                                </TableRow>
                                )}
                            </TableBody>              
                            </Table>
                          
                            </Grid>
                            <Grid item xs={3} >
                            </Grid>
                            </Grid>
                        </div>
                      </Col>
                    </Row> 
                  </Card.Text>
                </Card.Body>
              </Card>
              <ContenedorBotonCentrado>
                                <BotonAmarillo as="button" type="submit"  /*onChange={submitForm}*/ >Continuar</BotonAmarillo>
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



export default Buzon














