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
  
const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: '#00704a',
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

const useStyles = makeStyles({
    table: {
      minWidth: 280,
    },
  });
 
const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;
  
const Asignacion = ({ guid_oportunidad, guid_sub_modalidad_ingreso, validator, handleVistas, handleCargaMatrizDocumento, beneficiosEconomicos, sololectura }) => {
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

  const rows = [
    createData('1', 'Edwin', '561615616', 'Activo'),
  ];
  

  function createData(name, calories, fat, carbs) {
    return { name, calories, fat, carbs };
  }
  
  

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);


  const obtenerTipoDocs = async () => {
    setLoading(true);
    let url = baseUrlGDO + "api/oportunidades/" + guid_oportunidad + '/' + guid_sub_modalidad_ingreso

    const requestTipoDocs = await axios.get(url,
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO },
        withCredentials: true
      }).catch((err) => {
        setcargaExitosa(false);
        console.log("No existe una matriz configurada para la modalidad de ingreso");
        setLoading(false);
      })
      ;
    const data = await requestTipoDocs.data
    const document = data.detail.documentos
     

    function handleClick() {
        setNewRegister(true);
      }
  
      const ShowDialogMessage = (message) =>{
        setShow(true);
        setMessageError(message);
      }
  
      function handleClickSweet() {
        GetListUser();
      }
  
      const handleClickEdit = (e) =>{
        setIdEdit(e.currentTarget.id);
        setEditRegister(true);
      }
  
     

    if (document == null) {
      setcargaExitosa(false);
    }

    let fullDocs = []
    for (let doc in data.detail.documentos) {
      fullDocs.push(doc)
    }

    let arreglo = []
    fullDocs.map((item, index) => {
      arreglo.push({ id: item, data: document[item] })
    })
    setDocs(arreglo)
    const IdDocumentosOcultos = DocumentosOcultos2.map(function (x) {
      return x.id;
    });

    let DataCorrecta = '';

    if (sololectura == true) {
      DataCorrecta = arreglo.filter(e => e.data.estado.id != 2 && e.data.estado.id != 3
        && ((true && e.data.requerido_para_beneficio) || (e.data.requerido_para_matricula))
        && !IdDocumentosOcultos.includes((e.data.id).toString()));
    } else {
      DataCorrecta = arreglo.filter(e => e.data.estado.id == 1
        && ((true && e.data.requerido_para_beneficio) || (e.data.requerido_para_matricula))
        && !IdDocumentosOcultos.includes((e.data.id).toString()));
    }

 
   
    DataCorrecta.map(item => {
      let isRequired = false;

      var arrayParentGroup = DataCorrecta.filter(e => e.data.matriz_grupo.id == item.data.matriz_grupo.id_matriz_grupo_padre && e.data.id != item.data.id && (e.data.versiones.abierta != null ? e.data.versiones.abierta.adjuntos : e.data.versiones.cerrada.adjuntos) > 0);

      var arrayGroup = DataCorrecta.filter(e => e.data.matriz_grupo.id == item.data.matriz_grupo.id && e.data.id != item.data.id && (e.data.versiones.abierta != null ? e.data.versiones.abierta.adjuntos : e.data.versiones.cerrada.adjuntos) > 0);

      let cantidadAdjuntos = (item.data.versiones.abierta != null ? item.data.versiones.abierta.adjuntos : item.data.versiones.cerrada.adjuntos)

      if (cantidadAdjuntos == 0) {
        if (arrayParentGroup.length > 0){
          isRequired = false;
        }
        else if (arrayGroup.length > 0) {
          isRequired = false;

        } else {
          isRequired = true;
        }
      }
      else {
        isRequired = false;
      }

      item.isRequired = (isRequired == true ? '' : isRequired);
    }
    )
 
    setSS(DataCorrecta);
    setLoading(false);

  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const adjuntarDocumentos = (id, nombre, url) => {
    handleVistas(id, nombre, url, true)
  }


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  var idGrupo2 = 0;
  var sscontador = 0;
  let mostrarBadgeGrupo = false;
  let badgeColors = ["primary", "success", "warning", "info", "secondary", "light", "dark", "danger"];


  const showErrorMessage = (msg) => {
  
  }

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  useEffect(() => {
    obtenerTipoDocs()
    idGrupo2 = 0;
  }, [])

  const entries =0;

  const GetListUser = () =>{
    const URL_BASE = process.env.REACT_APP_URL_BASE;
    let GET_User = process.env.REACT_APP_API_GET_LISTUSER;
    let URL = URL_BASE+GET_User+NameCall;
    const tokenLocalStorage = localStorage.getItem(process.env.REACT_APP_KEY_TOKEN)
    try{
        fetch(URL,{
            method:'get',
            mode: 'cors',
            headers: {
                'Accept':'application/json',
                'Authorization': 'Bearer ' + tokenLocalStorage,
                'Content-type': 'application/json'
            }                
        }).then(function(res){

            return res.json();
        }).then(function(response){

            if(response.Code === 0){
                setListUser(response.Data.ListaDetail)

            }else if (response.Code === 1){
                var message = "";
                if(response.Data.Errors.length > 0){
                    response.Data.Errors.forEach(element => {
                        message = `${element}.`
                    });
                    showErrorMessage(message);                        
                }

            }else if (response.Code === 2){
                var message = "";
                if(response.Data.Errors.length > 0){
                    response.Data.Errors.forEach(element => {
                        message = `${element.FieldName}. ${element.Message}. `
                    });
                    showErrorMessage(message);                        
                }
            }

        }).catch((error) =>{
            console.log(error);
        })
    }catch(e){
        console.log(e);
    }
}
 
  const handleKeyPress = ({ target }) => {
    const query = target.value;
    const page = '1';
    if (query.length >= 0) {
    //   dispatch(getCategoriaList(page, query));
    } else {
    //   dispatch(getCategoriaList(page, query));
    }
  };

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

  const handleDeclaracion = (event) => {
    const value = event.target.value;
    let checked = event.target.checked;
    checked = (checked == true ? checked : '');
    setPostDeclaracion(
      datosDeclaracion.map(item =>
        item.id == value
          ? { ...item, isChecked: checked }
          : item));
  }


  function handleClickSweet() {
    GetListUser();
  }

  const retroceder = async (e) => {
    setNavegacionRetroceder(true);
  }

    if (NavegacionRetroceder) {
    return <Navigate to="/Ficha" /> 
  }

 
 

  return (
    <>
      {
          <div>
          
          <Container style={{ 'margin-top': '8rem' }}>
            <Titulo>
            ASIGNACION
            </Titulo>
            <Formulario action="" onSubmit={handleSubmit}>
              <Card style={{ borderRadius: '0px', margin: '1rem' }}>
                <Card.Body style={{ padding: '0px' }}>
                  <Card.Title style={{ background: '#6c757d', color: '#fff', padding: '1rem', fontSize: '18px' }}>GESTION DE ASIGNACION</Card.Title>
                  <Card.Text style={{ padding: '1rem' }}>
                    <Row>  
                      <Col sm={10}>
                        <div>
                           <OutlinedInput
                                className={classes.search}
                                // value={valueBuscador}
                                onChange={handleKeyPress}
                                placeholder="Buscar Conductor..."
                                startAdornment={
                                <InputAdornment position="start">
                                    <Box
                                    component={Icon}
                                    icon={searchFill}
                                    sx={{ color: 'text.disabled' }}
                                    />
                                </InputAdornment>
                                 }
                       />

                            <Grid container>
                            <Grid item xs={1} style={{paddingBottom:5, textAlign:'left'}}>
                            </Grid>
                            </Grid>


                            <Grid container >
                        
                            <Grid item xs={6} >
                      
                            <Table className={classes.table} aria-label="customized table">

                            <TableHead>
                            <TableRow>
                             
                                <StyledTableCell align="left">DNI</StyledTableCell>
                                <StyledTableCell align="left">NOMBRE Y APELLIDO</StyledTableCell>
                                
                            </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                ListUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element,key) =>
                                <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {element.CompanyName}
                                </StyledTableCell>
                                <StyledTableCell align="left">{element.UserLogin}</StyledTableCell>
                                <StyledTableCell align="left">{element.FullName}</StyledTableCell>
                                
                                </StyledTableRow>
                                )}
                                {emptyRows > 0 && (
                                <TableRow style={{ height: 1 * emptyRows }}>
                                <TableCell colSpan={8} style={{display:'none'}}/>
                                </TableRow>
                                )}
                            </TableBody>              
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 20]}
                                component="div"
                                count={ListUser.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                            </Grid>
                            <Grid item xs={3} >
                            </Grid>
                            </Grid>
                        </div>
                      </Col>
                    </Row>
                      <br /><br /><br /> 

                    <Row>  
                      <Col sm={10}>
                        <div>
                           <OutlinedInput
                                className={classes.search}
                                // value={valueBuscador}
                                onChange={handleKeyPress}
                                placeholder="Buscar Vehiculo..."
                                startAdornment={
                                <InputAdornment position="start">
                                    <Box
                                    component={Icon}
                                    icon={searchFill}
                                    sx={{ color: 'text.disabled' }}
                                    />
                                </InputAdornment>
                                 }
                       />

                            <Grid container>
                            <Grid item xs={1} style={{paddingBottom:5, textAlign:'left'}}>
                            </Grid>
                            </Grid>


                            <Grid container >
                        
                            <Grid item xs={6} >
                      
                            <Table className={classes.table} aria-label="customized table">

                            <TableHead>
                            <TableRow>
                             
                                <StyledTableCell align="left">N° Placa</StyledTableCell>
                            
                            </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                ListUser.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((element,key) =>
                                <StyledTableRow>
                                <StyledTableCell component="th" scope="row">
                                    {element.CompanyName}
                                </StyledTableCell>
                                <StyledTableCell align="left">{element.UserLogin}</StyledTableCell>
                                <StyledTableCell align="left">{element.FullName}</StyledTableCell>
                                
                                </StyledTableRow>
                                )}
                                {emptyRows > 0 && (
                                <TableRow style={{ height: 1 * emptyRows }}>
                                <TableCell colSpan={8} style={{display:'none'}}/>
                                </TableRow>
                                )}
                            </TableBody>              
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[10, 15, 20]}
                                component="div"
                                count={ListUser.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                            />
                            </Grid>
                            <Grid item xs={3} >
                            </Grid>
                            </Grid>
                        </div>
                      </Col>
                    </Row>
                    <br /><br /><br /> 


                    <Col sm={6}>
                             
                             <center>
                             <p>Es Dueño del Vehiculo?</p>
                             <div className="card-block card-cuerpo">
                                         <div className="row check-contenedor">
                                           <div className="col-sm-12 custom-control custom-checkbox">
                                             
                                             <input type="checkbox" id={'chkDeclaracion_' } name={'chkDeclaracion_' }
                                               onChange={(event) => handleDeclaracion(event)}
                                             />
 
                                             <label
                                               className="custom-control-label d-inline" htmlFor={'chkDeclaracion_'}
                                             >
                                             </label>
                                             {/* {validator.current.message('declaracion ' + files.id, files.isChecked, 'required', { className: "text-danger" })} */}
                                           </div>
                                         </div>
                            </div>
                             </center>
                         
                         </Col>
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



export default Asignacion














