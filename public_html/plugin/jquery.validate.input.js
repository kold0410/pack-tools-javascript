
/* 
     jQuery ValidateInput 1.0.0
     Author: Daniel Andres Castillo Pedroza
     Date: 07 de Mayo de 2015
*/

(function ($) {
    var validate_key_char = function (type, key) {
        var alfabetico = function (key) {
            return ((key > 64) && (key < 91)) || ((key > 96) && (key < 123)) || (key === 241) || (key === 209);
        }; /* Validando que el caracter establecido sea alfabético */
        
        var numerico = function (key) {
            return (key > 47) && (key < 58); 
        }; /* Validando que el caracter establecido sea numérico */
        
        var alfa_space = function (key) {
            return alfabetico(key) || (key === 32);
        }; /* Validando que el caracter establecido sea alfabético ó un espacio */
        
        var alfa_numerico = function (key) {
            return alfabetico(key) || numerico(key);
        }; /* Validando que el caracter establecido sea alfabético ó numérico*/
        
        var alfa_numerico_space = function (key) {
            return alfa_numerico(key) || (key === 32);
        }; /* Validando que el caracter establecido sea alfabético, numérico ó un espacio */
        
        switch (type) {
            case ('alfabeticos') : return alfabetico(key); 
            case ('numericos') : return numerico(key); 
            case ('alfa_numerico') : return alfa_numerico(key); 
            case ('alfa_space') : return alfa_space(key);
            case ('alfa_numerico_space') : return alfa_numerico_space(key); 
            default : return true; /* Se aceptan cualquier caracter */
        }
    };
    
    $.fn.extend({
        /* Función para controlar el texto que se digita en un componente de Texto */
        textControl : function (type, size, sucess, failed) {
            var component = jQuery(this); if (!size) { size = -1; } if(!type) { type = 'todos'; }
            
            try {
                var tagComponent = component.prop('tagName');
                
                if (tagComponent !== 'INPUT' && tagComponent !== 'TEXTAREA') {
                    throw 'el componente establecido para el control no es de tipo Input.';
                } /* Excepción */
                
                switch (tagComponent) {
                    case ('TEXTAREA') :
                        component.keypress(function (e) {
                            if (size !== -1 && jQuery(this).val().length === size) {
                                if (failed) { failed(e.charCode); } return false;
                            } /* Ha llegado al máximo de caracteres a permitir */
                            
                            /* Caracter permitido */
                            if (validate_key_char(type,e.charCode)) { if (sucess) { sucess(e.charCode); } }
                            
                            else { if (failed) { failed(e.charCode); } return false; } /* Caracter no permitido */
                        });
                    break; /* El componente es un TextArea */
                    
                    case ('INPUT') :
                        if (component.attr('type') && component.attr('type') === 'text') {
                            component.keypress(function (e) {
                                if (size !== -1 && jQuery(this).val().length === size) {
                                    if (failed) { failed(e.charCode); } return false;
                                } /* Ha llegado al máximo de caracteres a permitir */

                                /* Caracter permitido */
                                if (validate_key_char(type,e.charCode)) { if (sucess) { sucess(e.charCode); } }

                                else { if (failed) { failed(e.charCode); } return false; } /* Caracter no permitido */
                            });
                        } /* El input es de tipo Text */
                    break; /* El componente es un Input */
                }
            } /* Agregando evento a los componentes */
            
            catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
        },
        
        checked : function (sucess, failed) {
            var component = jQuery(this); /* Obteniendo componente CheckBox */
            
            try {
                var tagComponent = component.prop('tagName');
                
                if (tagComponent !== 'INPUT') {
                    throw 'el componente establecido para el control no es de tipo Input.';
                } /* Excepción */
                
                if (component.attr('type') && component.attr('type') === 'checkbox') {
                    component.click(function () {
                        if (component.prop('checked')) { if (sucess) { sucess(); } } else { if (failed) { failed(); } } 
                    });
                }
            } /* Agregando evento a los componentes */
            
            catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
        }
    });
})(jQuery);