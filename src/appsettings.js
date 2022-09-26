{
    "Logging": {
      "Region": "us-east-1",
      "LogGroup": "WebFichaMatricula",
      "IncludeLogLevel": true,
      "IncludeCategory": true,
      "IncludeNewline": true,
      "IncludeException": true,
      "IncludeEventId": false,
      "IncludeScopes": false,
      "LogLevel": {
        "Default": "Debug",
        "Microsoft": "Warning",
        "Microsoft.Hosting.Lifetime": "Information"
      }
    },
    //CORREO
    "WSMAIL_URL": "https://intranetdes.upn.edu.pe/wsmail/sendmail",
    "WSMAIL_TOKEN": "abcABC123",
    "WSMAIL_CORREO_ALERTA": "anthony.ganoza@upn.edu.pe,juan.benitez@upn.edu.pe,luis.calderon@upn.edu.pe",
    "CORREO_DESARROLLO": "juan.benitez@upn.edu.pe",
    "WSMAIL_ENCOLAR": true,
  
    //LOGGER //https://github.com/getsentry/sentry-dotnet/blob/master/samples/Sentry.Samples.AspNetCore.Mvc/Program.cs#L21
    "Sentry": {
      "Dsn": "https://249a4b7a0ab34db585fb446593bf3e07@sentry.io/1413844",
      "Release": "web-ficha-matricula@0.1",
      "Environment": "desarrollo"
    },
    "LOCAL_LOG_PATH": "D:\\GIT\\UPN\\webfichamatricula\\WebFichaMatricula\\Logs",
  
    //CRM API 
    "URL_CRM": "https://apides.upn.edu.pe/CRMMicroservice365/",
    "URL_CRM_CARRERAS_API": "api/sedes/{codSede}/carreras",
    "URL_CRM_TIPODOCUMENTO_API": "api/tipos_documento",
    "URL_CRM_OPORTUNIDAD_API": "api/oportunidades/{guid}",//
    "URL_CRM_COLEGIO_API": "api/colegios",
    "URL_CRM_DEPARTAMENTO_API": "api/departamentos",
    "URL_CRM_PROVINCIA_API": "api/departamentos/{codigo}/provincias",
    "URL_CRM_DISTRITO_API": "api/departamentos/{codigodepto}/provincias/{codigoprov}/distritos",
    "URL_CRM_HORARIOS_API": "api/horarios",
    "URL_CRM_INSTITUCION_EDUCATIVA_API": "api/instituciones-educativas", //{codigonivel}"
    "CRM_KEY": "hjK*91C2a",
    "CRM_TOKEN": "Z2RvOmFiY0FCQzEyMw==",
  
    //GDO API
    "URL_FICHAS_MATRICULA_POST_APROBAR": "https://apiupn-dev.upn.edu.pe/gestion-documental/api/oportunidades/{guid}/fichas_matricula/{id_ficha}/aprobar",
    "URL_FICHAS_MATRICULA_POST_API": "https://apiupn-dev.upn.edu.pe/gestion-documental/api/oportunidades/{guid}/fichas_matricula",
    "URL_FICHAS_MATRICULA_PUT_API": "https://apiupn-dev.upn.edu.pe/gestion-documental/api/oportunidades/{guid}/fichas_matricula/{id_ficha}",
    "URL_FICHAS_MATRICULA_GET_API": "https://apiupn-dev.upn.edu.pe/gestion-documental/api/oportunidades/{guid}/fichas_matricula",
    "URL_AUTENTICAR_API": "https://apiupn-dev.upn.edu.pe/gestion-documental/api/cuentas/autenticar",
    "URL_ANIOS": "30",
    "GDO_TOKEN": "Z2RvOmFiY0FCQzEyMw==",
    "URL_API_GDO": "https://apiupn-dev.upn.edu.pe/gestion-documental/api",
  
    "ATTACHMENT_MAX_SIZE": 6144,
  
    "OCULTAR_DOCUMENTOS": {
      "6": "Ficha de matrícula",
      "122": "Ficha de postulación"
    },
    "DOCUMENTOS_OBLIGATORIOS": {
      "4": "Copia simple del DNI del postulante",
      "5": "Copia simple del DNI del apoderado",
      "64": "Carné de extranjería postulante (extranjeros)",
      "65": "Pasaporte apoderado (extranjero)",
      "66": "Carné de extranjería apoderado (extranjeros)",
      "67": "Pasaporte postulante (extranjero)",
      "68": "Documento de Reniec",
      "127": "Documento de identidad",
      "128": "Documento temporal"
  
    },
    "DOCUMENTOS_OBLIGATORIOS_MENORES": {
      "5": "Copia simple del DNI del apoderado"
    }
}  