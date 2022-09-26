import React, { useEffect, useState } from 'react'
import { Container, Navbar, Row } from 'react-bootstrap'
import Helmet from 'react-helmet'
import { Footer } from '../elementos/Footers'
import { Header } from '../elementos/Headers'
import axios from 'axios';
import moment from 'moment';
import '../wwwroot/css/uploadFile.css'
import CryptoJS from 'crypto-js'
import Swal from 'sweetalert2';
import ProgressIntoDialog from '../componentes/Progress/Progress'; 
import TipoDocumentos from '../parameters/TipoDocumento';

  const apiKeyGDO = process.env.REACT_APP_APIKEY_GDO;
  const UploaderDocument = ({guid_oportunidad, idTipoDoc, tipoDoc,versiones,handleVistas,sololectura}) => {

  const [ViewArchive, setViewArchive] = React.useState(false);
  const [ViewDataError, setViewDataError] = React.useState(false);
 
  const [files, setFiles] = useState([]);
  const [docSelected, setDocSelected] = useState();
  const [loading, setLoading] = useState(false);
  const [DocumentoAdjunto, setDocumentoAdjunto] =  useState('');
  const [nameFile, setnameFile] = useState("Adjuntar Documento");
  const [extension,setextension] =useState("");
  const [NavegacionRetroceder, setNavegacionRetroceder] = useState(false);
  const [Visibles,setVisibles] =useState(true);

  useEffect(()=>{
    obtenerDocs()
  },[])

  console.log(sololectura);

  const obtenerDocs = async () => {
    setLoading(true);   
    let url=versiones
    const requestDocs = await axios.get(url,
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO  },
        withCredentials: true
      })
    const data = await requestDocs.data 

    setFiles(data.adjuntos)
    setLoading(false);
  }
 
  function onFileChange(event){
    console.log(TipoDocumentos)
    
      const IdDocumentos = TipoDocumentos.map( function (x) {
          return x.nombre;
      });
     
    const fileSelect = event.target.files[0]
    
    setDocumentoAdjunto(fileSelect)
    setnameFile(fileSelect.name)
 
    var formatoFile=fileSelect.type;
   
    const valordocumento =  IdDocumentos.includes((formatoFile).toString())
    

     if(valordocumento==false){
       console.log("contiene el formato erroneo");
      LimpiarImput();
      AlertFormat();
      setLoading(false); 
      return       
     }

     if(fileSelect.size==0){
       console.log("el archivo tiene 0 bytes");
       LimpiarImput();
       AlertPeso();
       setLoading(false); 
       return       
     }

     if(fileSelect.size>=1000000){
      console.log("el archivo tiene mas a 10000 megas");
      LimpiarImput();
      AlertPeso1();
      setLoading(false); 
      return       
    } 
  }
 
   
  const onSaveFile = async (e) => {  
    /* upn get*/
    setLoading(true); 
    obtenerDocs() 
    if(nameFile!='Adjuntar Documento'){
    const request = await axios.get(versiones+"/adjuntos?tipo_mime="+ DocumentoAdjunto.type,
    {
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO  },
        withCredentials: true
      })

      const response = await request.data
      let guid_adjunto = response.guid_adjunto
      let url_carga = response.url_carga
 
    /* amazon put sube el archivo*/
    const requestPUT = await axios.put(
      url_carga, DocumentoAdjunto,
      {
        headers: {'Content-Type': DocumentoAdjunto.type}
      }
    )
    /* amazon devuelve id */
 
    let hash_sha256 = CryptoJS.lib.WordArray.create(DocumentoAdjunto)
    var hash = CryptoJS.SHA256(hash_sha256);
 
    let payload = {
      tipo_mime: DocumentoAdjunto.type,
      hash_sha256:  hash.toString(),
      nombre_original: DocumentoAdjunto.name,
      bytes: DocumentoAdjunto.size
    }
    /* upn post/put */
   const requestTres = await axios.put(versiones + "/adjuntos/"+guid_adjunto, payload,
     
       {
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO  },
        withCredentials: true
      })  
 
    obtenerDocs()
    AlertLoad()
    
   }
   else{
    AlertFail()
   }
   setLoading(false);
   LimpiarImput();
  }
    

  const DownloadButton = async (e, sfile) => {
    setLoading(true);

    let url =versiones+"/adjuntos/"+sfile.id+"/contenido"
    const requestTipoDocs = await axios.get(url,
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO },
        withCredentials: true
      })
    const data = await requestTipoDocs.data
    
    setDocSelected(data)
    window.open(data.url_file, '_blank');
    obtenerDocs()
    setLoading(false);
  }

  const retroceder=async(e)=>{
    setVisibles(false)
    handleVistas('','','',false);  
  }

  const DeleteButton = async (e, sfile) => {
    setLoading(true);
    console.log(sfile)
   
    let url = versiones+ "/adjuntos/" + sfile.id
    const requestTipoDocs = await axios.delete(url,
      {
        headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyGDO },
        withCredentials: true
      })
    const data = await requestTipoDocs.data

    obtenerDocs()
    setLoading(false);
  }

  
 function LimpiarImput(){
  setnameFile("Adjuntar Documento"); 
 } 

  function AlertLoad(){
    Swal.fire(
      'Hecho',
      'Guardado Satisfactoriamente.',
      'success'
    )
    setViewDataError(false);
    setViewArchive(true);
 
}

function AlertFail(){
  Swal.fire(
    'Alerta',
    'Falta Adjuntar Documento',
    'warning'
  )
  setViewDataError(false);
  setViewArchive(true);
}

function AlertFormat(){
  Swal.fire(
    'Alerta',
    'solo son permitidos pdf, jpeg, jpg, png, tiff',
    'warning'
  )
  setViewDataError(false);
  setViewArchive(true);
}

function AlertPeso(){
  Swal.fire(
    'Alerta',
    'el archivo tiene 0 bytes',
    'warning'
  )
  setViewDataError(false);
  setViewArchive(true);
}

function AlertPeso1(){
  Swal.fire(
    'Alerta',
    'el archivo sobre pasa 10 MB',
    'warning'
  )
  setViewDataError(false);
  setViewArchive(true);
}
 

    
  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
    } 
    
    const images = importAll(require.context('../wwwroot/images/files', false, /\.(png|jpe?g|svg)$/));


  return (
    <>
       <Helmet>
        <title>Ficha de Postulación</title>
       </Helmet>
      <Header>
        
     </Header>
 
      <Navbar bg="dark" expand="lg" fixed="top">
        <Navbar.Brand href="#">
          <img
            src="https://upn-repositorio-public.s3.amazonaws.com/logos/png/logo-upn-fondo-oscuro.png"
            width="160px"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
      </Navbar> 
  
        <br/> <br/><br/><br/>  
      {
        sololectura==false?( <div className='container body-content container__padding' >
        <div className="col-12 mb-5 d-flex">
          <h4 className="mx-auto my-auto">{tipoDoc}</h4> 
        </div>            
<Container>
<Row>
<div className="mb-3">
<div className="row d-flex justify-content-end align-items-center">
  <div className='col-md-6 mr-auto'>
    <button className='btn btn-info btn-block' 
            style={{ width: '170px', height:'40px' }}       
            onClick={retroceder}> 
            REGRESAR
    </button> 
    </div>


  <div class="col-12 col-sm-5 px-0 mr-auto d-flex">
    <div class="input-group border-warning py-2 mb-0 d-flex">
        <div className="custom-file">
            <input type="file" name="file"  id="input_file" className='custom-file-input'  onChange={(event) => onFileChange(event)}
              />
            <label htmlFor="input_file" className="custom-file-label border-warning text-truncate">
              <span className='info-upload'>{nameFile}
              </span> 
              </label>
              </div>
              <div className="input-group-append">
                <button 
                      
                      className='input-group-text bg-warning border-warning'
                      id="btn_upload"
                      onClick={onSaveFile}>
                      Subir &nbsp;
                      </button>
                </div> 
      </div> 
    </div> 
  </div>  

</div> 
</Row>
</Container>
<br/><br/>      
<div id="content_cards">
{ 
  files?.map((sfile, index) => {
    return (
    <div className='card col-12 mb-3 card_adjunto'>
      <div className="card-body px-0">
        <div className="row">
                <div className="col-12 col-sm-8">
                      <div className="row">
                          <div className="col-6 col-sm-6 d-flex">
                                  <span class="font-weight-bold my-auto mt-2 text-capitalize text-truncate">
                                    <img  className='p-15' height={50} width={50}
                                      src={ images[sfile.tipo_mime.split('/')[1]+'.svg']? images[sfile.tipo_mime.split('/')[1]+'.svg']:images['generic.svg']}  
                                      />      
                                      {sfile.nombre_original}
                                    </span>
                          </div>
                          <div className="col-6 col-sm-6 d-flex">
                                    <p className="font-weight-bold mx-auto my-auto">
                                            <p>{moment(sfile.fecha_creacion).format('DD/MM/YYYY')}</p>
                                    </p>
                          </div>
                    </div>
                </div>

                <div className="col-12 col-sm-4">
                  <div className="row">
                        <div className='col-6 col-sm-6 d-flex'>  
                            <a
                              className='btn text-info mx-auto my-auto'
                      
                              onClick={(event) => DownloadButton(event, sfile)}>
                              <p>DESCARGAR</p>
                              </a>
                        </div>
                
                        <div className='col-6 col-sm-6 d-flex'>
                            <button
                            className='text-danger btn mx-auto my-auto btn_delete'
                              as="button" 
                              type="submit"
                              onClick={(event) => DeleteButton(event, sfile)}
                              >
                              <p>BORRAR</p>
                            </button>
                        </div>
                  </div>
                </div>
        
          </div> 
        </div> 
    </div>
    )
  })
}     
</div>
</div>)
:
(
  <div className='container body-content container__padding' >
  <div className="col-12 mb-5 d-flex">
    <h4 className="mx-auto my-auto">{tipoDoc}</h4> 
  </div>            
<Container>
<Row>
<div className="mb-3">
<div className="row d-flex justify-content-end align-items-center">
<div className='col-md-6 mr-auto'>
<button className='btn btn-info btn-block' 
      style={{ width: '170px', height:'40px' }}       
      onClick={retroceder}> 
      REGRESAR
</button> 
</div>


<div class="col-12 col-sm-5 px-0 mr-auto d-flex">
<div class="input-group border-warning py-2 mb-0 d-flex">
  
     
</div> 
</div> 
</div>  

</div> 
</Row>
</Container>
<br/><br/>      
<div id="content_cards">
{ 
files?.map((sfile, index) => {
return (
<div className='card col-12 mb-3 card_adjunto'>
<div className="card-body px-0">
  <div className="row">
          <div className="col-12 col-sm-8">
                <div className="row">
                    <div className="col-6 col-sm-6 d-flex">
                            <span class="font-weight-bold my-auto mt-2 text-capitalize text-truncate">
                              <img  className='p-15' height={50} width={50}
                                src={ images[sfile.tipo_mime.split('/')[1]+'.svg']? images[sfile.tipo_mime.split('/')[1]+'.svg']:images['generic.svg']}  
                                />      
                                {sfile.nombre_original}
                              </span>
                    </div>
                    <div className="col-6 col-sm-6 d-flex">
                              <p className="font-weight-bold mx-auto my-auto">
                                      <p>{moment(sfile.fecha_creacion).format('DD/MM/YYYY')}</p>
                              </p>
                    </div>
              </div>
          </div>

          <div className="col-12 col-sm-4">
            <div className="row">
                  <div className='col-6 col-sm-6 d-flex'>  
                      <a
                        className='btn text-info mx-auto my-auto'
                
                        onClick={(event) => DownloadButton(event, sfile)}>
                        <p>DESCARGAR</p>
                        </a>
                  </div>
           
            </div>
          </div>
  
    </div> 
  </div> 
</div>
)
})
}     
</div>
</div>
)
      }
                    

         <Footer><p>© 2022 Universidad Privada del Norte</p></Footer>
      
      <ProgressIntoDialog open={loading} />
    </>
  )
}

export default UploaderDocument