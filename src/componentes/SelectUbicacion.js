import React, { useRef, useEffect, useState, useContext } from 'react';
import { useSelectDep } from "../hooks/useSelectDep";
import { useSelectProv } from "../hooks/useSelectProv";
import { useSelectDist } from "../hooks/useSelectDist";
import { Label, SelectSkin } from '../elementos/FormFicha';
import Select from 'react-select';
import { Formulario, BotonAmarillo } from '../elementos/FormFicha';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { setDefaultLocale } from 'react-datepicker';

const baseUrlCRM = process.env.REACT_APP_URL_API_CRM;

const SelectUbicacion = ({ name, handleLocation, estilo, validator, esobligatorio, guid_dep, guid_prov, guid_dist, versionCRM }) => {

    const [departamento, setDep] = useState({ guid: (guid_dep ? guid_dep : ''), nombre: '' })
    const [provincia, setProv] = useState({ guid: (guid_prov ? guid_prov : ''), nombre: '' })
    const [distrito, setDist] = useState({ guid: (guid_dist ? guid_dist : ''), nombre: '' })
     
    const { dataDeps, errorDep, loadingDep } = useSelectDep(`${baseUrlCRM}api/departamentos`,versionCRM);
    const { dataProvs, errorProv, loadingProv } = useSelectProv(`${baseUrlCRM}api/departamentos/${departamento.guid}/provincias`,versionCRM, departamento.guid); 
    const { dataDists, errorDist, loadingDist } = useSelectDist(`${baseUrlCRM}api/departamentos/${departamento.guid}/provincias/${provincia.guid}/distritos`,versionCRM,departamento.guid, provincia.guid);    
  
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setDep({ guid: guid_dep, nombre: (guid_dep != '' && dataDeps.length > 0 ? dataDeps.filter((item) => item.key == guid_dep)[0].value : '') });
        setProv({ guid: guid_prov, nombre: (guid_prov != '' && dataProvs.length > 0 ? dataProvs.filter((item) => item.key == guid_prov)[0].value : '') });
        setDist({ guid: guid_dist, nombre: (guid_dist != '' && dataDists.length > 0 ? dataDists.filter((item) => item.key == guid_dist)[0].value : '') });

    },[guid_dep, guid_prov, guid_dist]);

    useEffect(() => {
        setDep({guid : departamento.guid, nombre :(departamento.guid != '' &&  dataDeps.length>0 ? dataDeps.filter((item) => item.key == departamento.guid)[0].value : '')});
        setProv({guid : provincia.guid, nombre: (provincia.guid != '' && dataProvs.length > 0 ? dataProvs.filter((item) => item.key == provincia.guid)[0].value : '') });
        setDist({guid : distrito.guid, nombre :(distrito.guid != '' &&  dataDists.length>0 ? dataDists.filter((item) => item.key == distrito.guid)[0].value : '')});

    }, [dataDeps,dataProvs,dataDists]);


    useEffect(() => {
        handleLocation(departamento.guid, departamento.nombre, provincia.guid, provincia.nombre, distrito.guid, distrito.nombre);
    }, [departamento, provincia, distrito]);


    if (!dataDeps)
        return null;

    if (!dataProvs)
        return null;

    if (!dataDists)
        return null;
    //if (error){ return "";}

    const handleChange = (e) => {
        switch (e.target.id) {
            case 'select-Departamento':
                setDep({
                    guid: e.target.value,
                    nombre: e.target.childNodes[e.target.selectedIndex].label
                });
                //handleProvincia(e.target.value);
                setProv({ guid: '', nombre: '' });
                setDist({ guid: '', nombre: '' });
                break;
            case 'select-Provincia':
                setProv({
                    guid: e.target.value,
                    nombre: e.target.childNodes[e.target.selectedIndex].label
                });
                //handleDistrito(e.target.value);
                setDist({ guid: '', nombre: '' });
                break;
            case 'select-Distrito':
                setDist({
                    guid: e.target.value,
                    nombre: e.target.childNodes[e.target.selectedIndex].label
                });
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <Row>
                <Col sm={4}>
                    <Label htmlFor={'select-Departamento'}>Departamento</Label>
                    <SelectSkin
                        htmlFor={'select-Departamento'}
                        className={estilo}
                        id={'select-Departamento'}
                        onChange={handleChange}
                        disabled={(estilo == "blocked")}
                        value={departamento.guid}
                    >
                        <option value="" selected>--SELECCIONE--</option>
                        {
                            dataDeps && dataDeps.map((dataDep) => (
                                <option key={dataDep.key} value={dataDep.key}>{dataDep.value}</option>
                            ))
                        }
                    </SelectSkin>
                    {esobligatorio ? validator.current.message('Departamento', departamento.guid, 'required', { className: "text-danger" }) : ""}

                </Col>
                <Col sm={4}>
                    {dataProvs && <>
                        <Label htmlFor={'select-Provincia'}>Provincia</Label>
                        <SelectSkin
                            htmlFor={'select-Provincia'}
                            className={estilo}
                            id={'select-Provincia'}
                            onChange={handleChange}
                            disabled={(estilo == "blocked")}
                            value={provincia.guid}
                        >
                            <option value="" selected>--SELECCIONE--</option>
                            {dataProvs && dataProvs.map((dataProv) => (
                                <option key={dataProv.key} value={dataProv.key}>{dataProv.value}</option>
                            ))}
                        </SelectSkin>
                        {esobligatorio ? validator.current.message('Provincia', provincia.guid, 'required', { className: "text-danger" }) : ""}

                    </>}
                </Col>
                <Col sm={4}>
                    {dataDists && <>
                        <Label htmlFor={'select-Distrito'}>Distrito</Label>
                        <SelectSkin
                            htmlFor={'select-Distrito'}
                            className={estilo}
                            id={'select-Distrito'}
                            onChange={handleChange}
                            disabled={(estilo == "blocked")}
                            value={distrito.guid}
                        >
                            <option value="" selected>--SELECCIONE--</option>
                            {dataDists && dataDists.map((dataDist) => (
                                <option key={dataDist.key} value={dataDist.key}>{dataDist.value}</option>
                            ))}
                        </SelectSkin>
                        {esobligatorio ? validator.current.message('Distrito', distrito.guid, 'required', { className: "text-danger" }) : ""}

                    </>}
                </Col>
            </Row>
        </div>
    );
}

export default SelectUbicacion;