import React, { useRef,useEffect, useState, useContext } from 'react';
import { Label, SelectSkin } from '../elementos/FormFicha';

const ComponenteSelectSexo = ({estilo, placeholder, handleSex,validator, esobligatorio,guidSexo}) => {

const [Sexo, setSexo]= useState({guid: (guidSexo ? guidSexo : '') })

    useEffect(() => {        

        if(handleSex!=undefined)
        {
            handleSex(Sexo.guid);
        }
        
    }, [Sexo]);

    useEffect(() => {        
        setSexo({ guid: (guidSexo != '' || guidSexo != null ? guidSexo:'') });
      }, [guidSexo]);


    const handleChange = (e) => {
        console.log("e" + e.target.id);
        switch (e.target.id) {
            case 'select-Sexo':
                setSexo({
                 guid : e.target.value});
            break;
        default:
            break;
        }
    }

   return (
      
            <div>
            <Label htmlFor={'select-Sexo'}>Sexo</Label>
            <SelectSkin
            htmlFor={'select-Sexo'}
            id={'select-Sexo'}
            className = {estilo}
            onChange={handleChange}
            disabled = {(estilo=="blocked")}
            value = {Sexo.guid}
            >
                <option value="" selected>--SELECCIONE--</option>
                <option value="1">MASCULINO</option>
                <option value="2">FEMENINO</option>
            </SelectSkin>
            
            <br /> <br />
            {esobligatorio ? validator.current.message('sexo', Sexo.guid, 'required', { className: "text-danger" }) : ""} 
            </div>

   ); 
}

export default ComponenteSelectSexo;