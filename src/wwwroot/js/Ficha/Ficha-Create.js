    $(document).ready(function () {

        n = new Date();
        y = n.getFullYear();
        document.getElementById("year").innerHTML = y;

        $("#frmFicha").validate({
            rules: {
                ApellidoPaternoPersona: { required: true, maxlength: 50 },
                ApellidoMaternoPersona: { required: true, maxlength: 50 },
                NombresPersona: { required: true, maxlength: 50 },
                ApellidoPaternoApoderado: { required: true, maxlength: 50 },
                ApellidoMaternoApoderado: { required: true, maxlength: 50 },
                NombresApoderado: { required: true, maxlength: 50 },
                NroDocumentoPersona: { required: true, maxlength: 50 },
                NroDocumentoApoderado: { required: true, maxlength: 50 },
                UrbanizacionPersona: { required: true, maxlength: 50 },
                UrbanizacionApoderado: { required: true, maxlength: 50 },
                DireccionPersona: { required: true, maxlength: 250 },
                DireccionApoderado: { required: true, maxlength: 250 },
                TelefonoCasaPersona: { required: true, number: true, maxlength: 11, minlength: 7 },
                TelefonoCasaApoderado: { required: true, number: true, maxlength: 11, minlength: 7 },
                TelefonoCelularPersona: { required: true, number: true, maxlength: 11, minlength: 7 },
                TelefonoCelularApoderado: { required: true, number: true, maxlength: 11, minlength: 7 },
                EmailPersona: { required: true, maxlength: 50 },
                Ocupacion: { maxlength: 50 },
                NombreColegio: { required: true, maxlength: 250 },
                AnioEgreso: { required: true, number: true, maxlength: 4, minlength: 4 },
            }, messages: {
                ApellidoPaternoPersona: {
                    required: "Debe ingresar apellido paterno.",
                    maxlength: "Máximo 50 caracteres.",
                },
                ApellidoMaternoPersona: {
                    required: "Debe ingresar apellido materno.",
                    maxlength: "Máximo 50 caracteres.",
                },
                NombresPersona: {
                    required: "Debe ingresar nombres.",
                    maxlength: "Máximo 50 caracteres.",
                },
                ApellidoPaternoApoderado: {
                    required: "Debe ingresar apellido paterno.",
                    maxlength: "Máximo 50 caracteres.",
                },
                ApellidoMaternoApoderado: {
                    required: "Debe ingresar apellido materno.",
                    maxlength: "Máximo 50 caracteres.",
                },
                NombresApoderado: {
                    required: "Debe ingresar nombres.",
                    maxlength: "Máximo 50 caracteres.",
                },
                NroDocumentoPersona: {
                    required: "Debe ingresar un número de documento.",
                    maxlength: "Máximo 50 caracteres.",
                },
                NroDocumentoApoderado: {
                    required: "Debe ingresar un número de documento.",
                    maxlength: "Máximo 50 caracteres.",
                },
                UrbanizacionPersona: {
                    required: "Debe ingresar urbanización.",
                    maxlength: "Máximo 50 caracteres.",
                },
                UrbanizacionApoderado: {
                    required: "Debe ingresar urbanización.",
                    maxlength: "Máximo 50 caracteres.",
                },
                DireccionPersona: {
                    required: "Debe ingresar dirección.",
                    maxlength: "Máximo 250 caracteres.",
                },
                DireccionApoderado: {
                    required: "Debe ingresar dirección.",
                    maxlength: "Máximo 250 caracteres.",
                },
                TelefonoCasaPersona: {
                    required: "Debe ingresar teléfono de casa.",
                    number: "Ingresa un número valido.",
                    maxlength: "Máximo 11 caracteres.",
                    minlength: "Mínimo 7 caracteres."
                },
                TelefonoCasaApoderado: {
                    required: "Debe ingresar teléfono de casa.",
                    number: "Ingresa un número valido.",
                    maxlength: "Máximo 11 caracteres.",
                    minlength: "Mínimo 7 caracteres."
                },
                TelefonoCelularPersona: {
                    required: "Debe ingresar teléfono celular.",
                    number: "Ingresa un número valido.",
                    maxlength: "Máximo 11 caracteres.",
                    minlength: "Mínimo 9 caracteres."
                },
                TelefonoCelularApoderado: {
                    required: "Debe ingresar teléfono celular.",
                    number: "Ingresa un número valido.",
                    maxlength: "Máximo 11 caracteres.",
                    minlength: "Mínimo 9 caracteres."
                },
                EmailPersona: {
                    required: "Debe ingresar un correo.",
                    email: "Ingresa un correo valido.",
                    maxlength: "Máximo 50 caracteres."
                },
                Ocupacion: { maxlength: "Máximo 50 caracteres." },
                NombreColegio: {
                    required: "Debe ingresar nombre del colegio.",
                    maxlength: "Máximo 250 caracteres."
                },
                AnioEgreso: {
                    required: "Debe ingresar año de egreso.",
                    number: "Ingresa un número valido.",
                    maxlength: "Máximo 4 caracteres.",
                    minlength: "Mínimo 4 caracteres."
                },

            },
            errorPlacement: function (error, element) {
                //check whether chosen plugin is initialized for the element
                if (element.attr('type') == "checkbox") {
                    error.appendTo(element.parent());
                }
                else if (element.attr('data-val-date')) {
                    error.appendTo(element.parent().parent());
                }
                else {
                    element.after(error);
                }
            }
        });

        $("#btnAceptarModal").click(function () {

            $('#chkTerminosCondiciones').prop('checked', true);
            $('#mTerminosCondiciones').modal('toggle');
        });

        $("#btnCancelarModal").click(function () {

            $('#chkTerminosCondiciones').prop('checked', false);
            $('#mTerminosCondiciones').modal('toggle');
        });

        var baseUrl = $('base').attr('href');


    });

};


function guardarFicha(button) {
    var $form = $("#ficha-form");
    var isValid = $form.valid();

    if (isValid) {

        var formStr = $form.serializeIncludeDisabled();
        guardarServidorFicha(formStr);
           
    }
}

function guardarServidorFicha(formStr) {
    $.ajax({
        url: "".concat(baseUrl, "Ficha/Index"),
        method: 'POST',
        data: formStr,
        dataType: "json",
        beforeSend: $.fn.uf_showAjaxLoading
    }).done(function (response) {
        console.log(error);
    }).fail(function (error) {
        console.log(error);
    }).always(function () {
        $.fn.uf_stopAjaxLoading();
    });
}