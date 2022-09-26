// Write your Javascript code.
//**********************************************************************
// Nombre: $.fn.uf_showAjaxLoading
// Funcion: Muestra el loading en una petición ajax
//**********************************************************************
$.fn.uf_showAjaxLoading = function () {
    var preload = $("#preload");
    if (preload.length > 0)
        preload.remove();
    $('<div id="preload" class=""></div>').prependTo("body");
    $('<div id="status"></div>').prependTo("#preload");
    $('<div id="statustext" class="text__load">Espere por favor...</div>').prependTo("#status");
    $("#preload").addClass('on');
};




//**********************************************************************
// Nombre: $.fn.uf_stopAjaxLoading
// Funcion: Apaga el indicador de loading
//**********************************************************************
$.fn.uf_stopAjaxLoading = function () {
    var preload = $("#preload");
    if (preload.length > 0)
        preload.remove();
};
