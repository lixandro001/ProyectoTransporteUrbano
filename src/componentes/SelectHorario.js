import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Label, SelectSkin } from '../elementos/FormFicha';

  const apiKeyCRM = process.env.REACT_APP_APIKEY_CRM;


  const ComponenteSelectHorario = ({ estilo ,name, urlapi,handleHorario,validator,esobligatorio,guidHorario,versionCRM}) => {
  const [posts, setPost] = useState([]);
  const [Horarios, setHorarios] = useState({ codigo: (guidHorario ? guidHorario : ''), nombre: '' });

  useEffect(() => {
    var auth = {
      headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyCRM, "version-crm": versionCRM }
    };
    axios
    .get(urlapi, auth)
    .then((response) => {
      console.log(response.data);
      const docs= response.data;
      setPost(docs);
    })
    .catch((err) => console.log(err));
  }, []);
 
  
  useEffect(() => {
    setHorarios({ codigo: guidHorario, nombre: (guidHorario != '' || guidHorario != null ? (posts.length>0? posts.filter((item) => item.guid_horario == guidHorario)[0].nombre : '') : '') });
  }, [guidHorario]);
 

  useEffect(() => {
    handleHorario(Horarios.codigo, Horarios.nombre);
  }, [Horarios]);


  const handleChange = (e) => {

    switch (e.target.id) {
      case 'select-Horario':
        setHorarios({
          codigo: e.target.value,
          nombre: e.target.childNodes[e.target.selectedIndex].label
        });
      break;
    }

  }

 console.log(Horarios.codigo);
  if (!posts) return "No se encontró datos";
  
  return (
    
   <div>
      <Label htmlFor={'select-Horario'}>Tipo Horario</Label>
      <SelectSkin
        htmlFor={'select-Horario'}
        id={'select-Horario'}
        className={estilo}
        disabled = {(estilo=="blocked")}
        onChange={handleChange}     
        value={Horarios.codigo}
      >
        <option value="" selected>--SELECCIONE--</option> 
        {posts.map((post) => (
          <option key={post.guid_horario} value={post.guid_horario}>{post.nombre_horario}</option>
        ))}
    
      </SelectSkin>
      <br />
      {esobligatorio ? validator.current.message('horario', Horarios.codigo, 'required', { className: "text-danger" }) : ""} 
    </div>
  );
}

export default ComponenteSelectHorario;