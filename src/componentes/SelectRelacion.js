 
import { Label, SelectSkin } from '../elementos/FormFicha';
import React, { useRef,useEffect, useState, useContext } from 'react';
 
 const ComponenteSelectRelacion = ({name, handleLocation,estilo, label, placeholder, seleccion, validator, esobligatorio,guidRelacion}) => {
 
 const [Relacion, setRelacion]= useState({guid: (guidRelacion ? guidRelacion : '') })

console.log(guidRelacion);

 useEffect(() => {        
    handleLocation(Relacion.guid);
}, [Relacion]);
 
console.log(Relacion);

    const handleChange = (e) => {
        console.log("e" + e.target.id);
        switch (e.target.id) {
            case 'select-Relacion':
             setRelacion({
                 guid : e.target.value});
            break;
        default:
            break;
        }
    }
   
  
    return (
        <div>
            <Label htmlFor={'select-Relacion'}>Relacion</Label>
            <SelectSkin
            htmlFor={'select-Relacion'}
            id={'select-Relacion'}
            className = {estilo}
            onChange={handleChange}
            disabled = {(estilo=="blocked")}
            value = {Relacion.guid}
            >
                <option value="" selected>--SELECCIONE--</option>
                <option value="1" selected={("1"==seleccion)}>PADRE</option>
                <option value="2" selected={("2"==seleccion)}>MADRE</option>
                <option value="3" selected={("3"==seleccion)}>APODERADO</option>
            </SelectSkin>
            {esobligatorio?validator.current.message('Relacion', Relacion.guid, 'required',{className:"text-danger"}):""}
        </div>

        
   ); 
}

export default ComponenteSelectRelacion;