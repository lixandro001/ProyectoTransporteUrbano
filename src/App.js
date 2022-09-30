import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';


import Ficha from './componentes/Ficha';
import Login from './Login';
import Registro from './componentes/Registro';
import UploaderDocument from './componentes/UploaderDocument';
 
import VerPdf from './componentes/VerPdf';
import Conductor  from './componentes/Conductor';
import Vehiculo from './componentes/Vehiculo';
import Asignacion from './componentes/Asignacion';
 

const App = () =>{
  return (
    <>
{/*       <Helmet>
        <title>Login</title>
      </Helmet> */}
      <BrowserRouter>
      <div>
        <main>
          <Routes  >
              <Route path="/" element={<Login />}/>  
              <Route path="/ficha" element={
              <Ficha
                guid_oportunidad = {''}
              />
            }
            />   
              <Route path="/registrado" element={
              <Registro
                ficha_matricula = {''}
                urlapi = {''}
                usuarioAct = {''}
              />
            }/>
              <Route path="/UploaderDocument" element={
              <UploaderDocument
                guid = {''}
                idTipoDoc = {''}
                tipoDoc = {''}
/*              ficha_matricula = {''}
                urlapi = {''}
                usuarioAct = {''} */
              />
            }/>

            {/* <Route path="/ficha" element={<Ficha guid_oportunidad = {''}/>} */}
           
            <Route path="/VerPdf" element={<VerPdf   guid_oportunidad = {''} />} />
            <Route path="/Conductor" element={<Conductor   guid_oportunidad = {''} />} />
            <Route path="/Vehiculo" element={<Vehiculo   guid_oportunidad = {''} />} />
            <Route path="/Asignacion" element={<Asignacion   guid_oportunidad = {''} />} />
          
             
          </Routes>
        </main>      
      </div>
      </BrowserRouter>
    </>

  );
}
export default App;