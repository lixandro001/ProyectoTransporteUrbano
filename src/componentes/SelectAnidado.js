import React, {useState} from 'react';
import { Label, Select } from '../elementos/FormRegistro';
import SelectList from './SelectList';

const ComponenteSelectAnidado = ({label, placeholder, name}) => {
   const [departamento, setDep]= useState("");
   const [provincia, setProv]= useState("");
   const [distrito, setDist]= useState("");

   return (
       <div>
           <Label htmlFor={name}>{label}</Label>
           <SelectList
               title="Departamento"
               handleChange = {(e) => {setDep(e.target.value);}}
               url={`https://apides.upn.edu.pe/CRMMicroservice365/api/departamentos`}
               guid="guid_departamento"
               nombre="nombre_departamento"
           />
           {departamento && (
               <SelectList 
                    title="Provincia"
                    handleChange = {(e) => {setProv(e.target.value);}}
                    url={`https://apides.upn.edu.pe/CRMMicroservice365/api/departamentos/${departamento}/provincias`}
                    guid="guid_provincia"
                    nombre="nombre_provincia"
               />   
           )}
           {provincia && (
                <SelectList
                    title="Distrito"
                    handleChange={(e) => {setDist(e.target.value);}}
                    url={`https://apides.upn.edu.pe/CRMMicroservice365/api/departamentos/${departamento}/provincias/${provincia}/distritos`}
                    guid="guid_distrito"
                    nombre="nombre_distrito"
                />
           )}
           {departamento} - {provincia} - {distrito}
       </div>
  ); 
}

export default ComponenteSelectAnidado;