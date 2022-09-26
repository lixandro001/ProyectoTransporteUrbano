import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Label, SelectSkin } from '../elementos/FormFicha';

const apiKeyCRM = process.env.REACT_APP_APIKEY_CRM;

const SelectDocumento = ({ estilo, label, placeholder, name, urlapi, seleccion, handleDoc, validator, esobligatorio, guidDocumento, versionCRM }) => {

  const [posts, setPost] = useState([]);
  const [documento, setDocumento] = useState({ codigo: (guidDocumento ? guidDocumento : ''), nombre: '' });
 
  useEffect(() => {
    var auth = {
      headers: { 'Content-Type': 'application/json', 'Authorization': apiKeyCRM, "version-crm": versionCRM }
    };
    axios
      .get(urlapi, auth)
      .then((response) => {
        const docs = response.data;
        setPost(docs);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    console.log(posts);
    setDocumento({ codigo: guidDocumento, nombre: (guidDocumento != '' || guidDocumento != null ? (posts.length>0? posts.filter((item) => item.codigo == guidDocumento)[0].nombre : '') : '') });
  }, [guidDocumento]);


  useEffect(() => {
    handleDoc(documento.codigo, documento.nombre, documento.numero);
  }, [documento]);

  const handleChange = (e) => {
    switch (e.target.id) {
      case 'select-documento':
        setDocumento({
          codigo: e.target.value,
          nombre: e.target.childNodes[e.target.selectedIndex].label
        });
        break;
    }
  }



  if (!posts) return "No se encontró datos";

  return (
    <div>
      <Label htmlFor={'select-documento'}>Tipo Documento</Label>
      <SelectSkin
        htmlFor={'select-documento'}
        id={'select-documento'}
        className={estilo}
        onChange={handleChange}
        disabled={(estilo == "blocked")}
        value={documento.codigo}
      >
        <option value="" selected>--SELECCIONE--</option>
        {posts.map((post) => (
          <option key={post.codigo} value={post.codigo}>{post.nombre}</option>
        ))}
      </SelectSkin>
      <br /> <br />
      {esobligatorio ? validator.current.message('documento', documento.codigo, 'required', { className: "text-danger" }) : ""}
    </div>

  );
}

export default SelectDocumento;