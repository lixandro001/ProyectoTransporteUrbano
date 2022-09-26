import React, { useEffect, useState } from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { Link } from "react-router-dom";
import { Titulo, Formulario, FormularioGrid, Label, InputRadio, Wrapper, Item, RadioButton, RadioButtonLabel, InputCheck, ContenedorTerminos, ContenedorBotonCentrado, BotonAmarillo, BotonGris, MensajeExito, MensajeError, MensajeDocumentos } from '../elementos/FormFicha';
import axios from 'axios';
import DocumentosOcultos2 from '../parameters/DocumentsOcul';
import '../wwwroot/css/uploadFile.css'
import ProgressIntoDialog from '../componentes/Progress/Progress';
import { Navigate } from 'react-router-dom';

const baseUrlGDO = process.env.REACT_APP_URL_API_GDO;
const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;

const Documentos = ({ guid_oportunidad, guid_sub_modalidad_ingreso, validator, handleVistas, handleCargaMatrizDocumento, beneficiosEconomicos, sololectura }) => {
  const [docs, setDocs] = useState([]);
  const [SS, setSS] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cargaExitosa, setcargaExitosa] = useState(true);
  const [contador, setcontador] = useState(-1);
  //const [mostrarBadgeGrupo,setmostrarBadgeGrupo]=useState(false);
  const [idGrupo, setidGrupo] = useState(0);


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


  useEffect(() => {
    handleCargaMatrizDocumento(cargaExitosa);
  }, [cargaExitosa])



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
          <Row>
            <MensajeDocumentos>
              <p>Cuando existe mas de un documento del mismo grupo, para iniciar tu proceso de matrícula sólo es obligatorio subir uno de ellos.</p>
            </MensajeDocumentos>
          </Row>
          <Row>
            {SS ? (
              <>
                {SS?.map((sdocs, index) => {
                  return (
                    <div>
                      {
                        <div className='card col-12 border-light mb-2'>
                          <div class="card-body">
                            <div class="row">
                              <Col sm={5}>
                                <label>{sdocs.data.nombre}</label>
                                {validator.current.message('Documento', sdocs.isRequired, 'required', { className: "text-danger" })}
                              </Col>

                              <Col sm={2}>
                                <WarningBanner item={sdocs.data} />
                              </Col>

                              <Col sm={2}>
                                <div className='itemsFile downloadFile' style={{ fontSize: "1rem" }}>
                                  <p>Adjuntos:  </p>
                                  {
                                    sdocs.data.versiones.abierta != null ? (
                                      sdocs.data.versiones.abierta.adjuntos
                                    ) : (
                                      sdocs.data.versiones.cerrada.adjuntos
                                    )
                                  }
                                </div>
                              </Col>
                              {sololectura == false ?
                                <Col sm={3}>
                                  <div class="col-12 col-sm-8">
                                    <button
                                      className='btn-adjuntar btn btn-lg btn-warning btn-block mx-auto my-auto'
                                      style={{ width: '100%', height: '100%' }}

                                      onClick={() => adjuntarDocumentos(sdocs.id, sdocs.data.nombre, sdocs.data.versiones.abierta.url)}
                                    >
                                      Adjuntar
                                    </button>
                                  </div>
                                </Col>
                                :
                                <Col sm={3}>
                                  <div class="col-12 col-sm-8">
                                    <button
                                      className='btn-adjuntar btn btn-sm btn-warning btn-block mx-auto my-auto'
                                      onClick={() => adjuntarDocumentos(sdocs.id, sdocs.data.nombre, sdocs.data.versiones.cerrada!=null? sdocs.data.versiones.cerrada.url:sdocs.data.versiones.abierta.url)}
                                    >
                                      Ver Adjuntos
                                    </button>
                                  </div>
                                </Col>

                              }

                            </div>
                          </div>
                        </div>                  
                      }
                    </div>
                  )
                })}
              </>
            )
              :
              (
                <>
                </>
              )
            }

          </Row>
          <ProgressIntoDialog open={loading} />
        </div>
      }

    </>
  );

}



export default Documentos