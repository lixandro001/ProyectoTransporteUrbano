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
import ComponenteSelectSexo from './SelectSexo';
 
import ImagenConductor from './imagenes/conductorIcono.jpg';
import ImagenCarro from './imagenes/obnibus.jpg';
import ImagenHorarioDia from './imagenes/fecha.jpg';

 

 
const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;

const Horarios = ({ guid_oportunidad, guid_sub_modalidad_ingreso, validator, handleVistas, handleCargaMatrizDocumento, beneficiosEconomicos, sololectura }) => {
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

  const adjuntarDocumentos = (id, nombre, url) => {
    handleVistas(id, nombre, url, true)
  }

  var idGrupo2 = 0;
  var sscontador = 0;
  let mostrarBadgeGrupo = false;
  let badgeColors = ["primary", "success", "warning", "info", "secondary", "light", "dark", "danger"];

  useEffect(() => {
    obtenerTipoDocs()
    idGrupo2 = 0;
  }, [])


//   useEffect(() => {
//     handleCargaMatrizDocumento(cargaExitosa);
//   }, [cargaExitosa])

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

  const retroceder = async (e) => {
    setNavegacionRetroceder(true);
  }

    if (NavegacionRetroceder) {
    return <Navigate to="/Ficha" /> 
  }

  const WarningBanner = (props) => {
    if (parseInt(idGrupo2) != props.item.matriz_grupo.id) {
      idGrupo2 = props.item.matriz_grupo.id;
      if (SS.filter(e => e.data.matriz_grupo.id == props.item.matriz_grupo.id).length > 1) {
        sscontador++;
        mostrarBadgeGrupo = true;
      }
      else {
        mostrarBadgeGrupo = false;
      };
    }


    return (
      <div>{mostrarBadgeGrupo == true ? <Badge bg={badgeColors[sscontador]}> Grupo {sscontador} </Badge> : ""}
      </div>
    )

  }



  return (
    <>
      {
          <div>
          
          <Container style={{ 'margin-top': '8rem' }}>
            <Titulo>
              Gestion de Horarios
            </Titulo>
            <Formulario action="" onSubmit={handleSubmit}>
              <Card style={{ borderRadius: '0px', margin: '1rem' }}>
                <Card.Body style={{ padding: '0px' }}>
                  <Card.Title style={{ background: '#6c757d', color: '#fff', padding: '1rem', fontSize: '18px' }}>Horarios</Card.Title>
                  <Card.Text style={{ padding: '1rem' }}>
                    <Row>
                     <center>
                        <img
                          src = {ImagenConductor}
                          style={{ width: '190px', height:'140px' }} 
                          align-content= "center" /> 
                          <br /><br />
                     </center> 
                      <Col sm={2}>
                        <ComponenteInput
                          tipo="text"
                      
                          placeholder={'DNI'}
                          name="DNI"
                          expresionRegular=""
                        />
                      </Col>
                      <Col sm={2}>
                        <ComponenteInput
                          tipo="text"
                        
                          placeholder={'LICENCIA'}
                          name="LICENCIA"
                        />
                      </Col>
                    </Row>
                    <br /> 

                    <Row>

                    <center>
                        <img
                          src = {ImagenCarro}
                          style={{ width: '190px', height:'140px' }} 
                          align-content= "center" /> 
                          <br /><br />
                     </center> 

                      <Col sm={6}>
                        <ComponenteInput
                          tipo="text"
                         
                          placeholder={'Placa del bus'}
                          name="placa"
                        />
                        
                      </Col>

                      <Col sm={6}>
                        <ComponenteInput
                          tipo="text"
                          
                          placeholder={'Vehiculo'}
                          name="vehiculo"
                        />  
                      </Col>
                    </Row>
                    <Row>
                    <center>
                        <img
                        src = {ImagenHorarioDia}
                        style={{ width: '190px', height:'140px' }} 
                        align-content= "center" /> 
                        <br /><br />
                    </center> 
 
    <Col sm={6}>

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



export default Horarios