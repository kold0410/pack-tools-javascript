
var Tools = {
    
    /* Verifica si un objeto es undefined ó no esta instanciado */
    isUndefined : function (object) { return (object === undefined || object === null); },
    
    /* Permite completar una palabra con caracteres antes de esta misma */
    addCharsBefore : function (word, character, size) {
        var new_word = String(word); /* Estableciendo palabra actual */
        
        for (var index = new_word.length; index < size; index++) { 
            new_word = character + new_word; 
        } /* Cargando caracteres restantes por delante de la Palabra */
        
        return new_word; /* Retornando nueva palabra generada completa */
    },
    
    /* Permite completar una palabra con caracteres despues de esta misma */
    addCharsAfter : function (word, character, size) {
        var new_word = String(word); /* Estableciendo palabra actual */
        
        for (var index = new_word.length; index < size; index++) {
            new_word = new_word + character; 
        } /* Cargando caracteres restantes por detrás de la Palabra */
        
        return new_word; /* Retornando nueva palabra generada completa */
    },
    
    /* Objeto que contiene procesos para describir Números */
    DescribeNumber : {
        getMonetaryExpression : function (number) {
            var new_number = '', length = number.length, contador = 0;
            
            for (var index = 1; index <= length; index++) {
                if (contador === 3) { new_number = '.' + new_number; contador = 0; }
                
                new_number = number.charAt(length - index) + new_number; contador++; 
            } /* Recorriendo el número expresarlo monetariamente  */
            
            return new_number; // Retornando expresado monetariamente
        },
        
        getCifras : function () {
            var cifras = new Array(); /* Declarando el array para contener cifras */
            
            cifras[0] = ''; cifras[1] = 'UN'; cifras[2] = 'DOS'; cifras[3] = 'TRÉS'; 
            cifras[4] = 'CUATRO'; cifras[5] = 'CINCO'; cifras[6] = 'SEíS'; 
            cifras[7] = 'SIETE'; cifras[8] = 'OCHO'; cifras[9] = 'NUEVE'; cifras[10] = 'DÍEZ';
            cifras[11] = 'ONCE'; cifras[12] = 'DOCE'; cifras[13] = 'TRECE'; 
            cifras[14] = 'CATORCE'; cifras[15] = 'QUINCE'; cifras[16] = 'DIECISÉIS'; 
            cifras[17] = 'DIECISIETE'; cifras[18] = 'DIECIOCHO'; cifras[19] = 'DIECINUEVE'; 
            cifras[20] = 'VEINTE'; cifras[21] = 'VIENTIUNO'; cifras[22] = 'VIENTIDOS'; 
            cifras[23] = 'VEINTITRÉS'; cifras[24] = 'VEINTICUATRO'; cifras[25] = 'VEINTICINCO';
            cifras[26] = 'VEINTISEÍS'; cifras[27] = 'VEINTISIETE'; cifras[28] = 'VEINTIOCHO';
            cifras[29] = 'VEINTINUEVE'; cifras[30] = 'TREINTA'; cifras[40] = 'CUARENTA';
            cifras[50] = 'CINCUENTA'; cifras[60] = 'SESENTA'; cifras[70] = 'SETENTA'; 
            cifras[80] = 'OCHENTA'; cifras[90] = 'NOVENTA'; cifras[100] = 'CIEN';
            cifras[200] = 'DOSCIENTOS'; cifras[300] = 'TRECIENTOS'; 
            cifras[400] = 'CUATROCIENTOS'; cifras[500] = 'QUINIENTOS'; 
            cifras[600] = 'SEISCIENTOS'; cifras[700] = 'SETECIENTOS';
            cifras[800] = 'OCHOCIENTOS'; cifras[900] = 'NOVECIENTOS';

            return cifras; /* Retornando las cifras en un Array */
        },
        
        getCantidades : function () {
            var cantidades = new Array(); /* Declarando el array para contener cantidades */
            
            cantidades[1] = 'MIL'; cantidades[10] = 'MIL';
            cantidades[2] = 'MILLÓN'; cantidades[20] = 'MILLÓNES'; 
            cantidades[3] = 'MIL'; cantidades[30] = 'MIL'; 
            cantidades[4] = 'BILLÓN'; cantidades[40] = 'BILLÓNES';
            cantidades[5] = 'MIL'; cantidades[50] = 'MIL'; 
            cantidades[6] = 'TRILLÓN'; cantidades[60] = 'TRILLONES';
            cantidades[7] = 'MIL'; cantidades[70] = 'MIL'; 
        
            return cantidades; /* Retornando las cantidades en un Array */
        },
        
        getThreeDigits : function (number) {
            try {
                if ((number.length > 3) || (number.length < 1)) {
                    throw 'el número establecido para proceso no es de tres cifras.';
                } /* Excepción */
                
                number = Tools.addCharsBefore(number,'0',3); /* Completando */
                var cifras = Tools.DescribeNumber.getCifras(), cifra_descrita = '';
                var centena = parseInt(number.substring(0,1));
                var decena_unidad = parseInt(number.substring(1,3));
                
                if (centena !== 0) {
                    cifra_descrita = cifra_descrita + cifras[centena * 100];
                    
                    if (centena === 1 && decena_unidad !== 0) {
                        cifra_descrita = cifra_descrita + 'TO ';
                    } /* Añadimos caracteres en caso de ser Centana de 100 */
                    
                    else { cifra_descrita = cifra_descrita + ' '; } /* Agregamos espacio descripción */
                }
                
                if (decena_unidad !== 0) {
                    var temporal = cifras[decena_unidad]; 
                
                    if (temporal) {
                        if (temporal.length > 0) {
                            cifra_descrita = cifra_descrita + temporal;
                        } /* La cifra es diferente de Cero */
                    }

                    else {
                        var decena = parseInt(number.substring(1,2)) * 10;
                        var unidad = parseInt(number.substring(2,3));

                        cifra_descrita = cifra_descrita + cifras[decena];
                        cifra_descrita = cifra_descrita + " Y " + cifras[unidad];
                    } /* Se desgloza el número para realizar descripción */
                }
                
                return cifra_descrita.trim(); /* Retornando cifra de tres dígitos */
            }
            
            catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
        },
        
        get : function (number) {
            try {
                if (Tools.isUndefined(number) || number.length === 0) {
                    throw 'el número no esta definido ó instanciado, en su defecto no contiene caracteres.';
                } /* Excepción */
                
                if (parseInt(number) !== 0) {
                    number = String(parseInt(number)); /* Removiendo ceros */
                    var numero_descrito = '', posicion_final = number.length, index = 0; 

                    while (posicion_final > 0) {
                        var posicion_inicial = posicion_final - 3; /* Posición inicial del corte */

                        if (posicion_inicial < 0) { posicion_inicial = 0; } /* Controlando desbordamiento */

                        var cantidades = Tools.DescribeNumber.getCantidades();

                        var cifra_numerica = number.substring(posicion_inicial,posicion_final);
                        var cifra_descrita = Tools.DescribeNumber.getThreeDigits(cifra_numerica);

                        if (cifra_descrita.length > 0) {
                            if (index > 0) {
                                if (parseInt(cifra_numerica) > 1) {
                                    cifra_descrita = cifra_descrita + ' ' + cantidades[index * 10];
                                } /* La cifra a describir es plural */

                                else {
                                    /* Solo se requiere descriptor de cantidad */
                                    if (index%2 !== 0) { cifra_descrita = cantidades[index]; }

                                    /* Se requiere descriptor de cantidad y cifra */
                                    else { cifra_descrita = cifra_descrita + ' ' + cantidades[index]; }
                                } /* La cifra a describir es singular */
                            } /* La cifra pertenece a unidades de mil ó superiores */

                            numero_descrito = cifra_descrita + ' ' + numero_descrito;
                        } /* La cifra no contiene descripción */

                        else if ((index > 1) && (index%2 === 0)) {
                            numero_descrito = cantidades[index * 10] + ' ' +  numero_descrito;
                        } /* Se requiere descrición plural de la sección del número */

                        index++; posicion_final = posicion_inicial; /* Reconfigurando variables */
                    }

                    return numero_descrito.trim(); /* Retornando descripción del número */
                }
                
                else { return 'CERO'; } /* El número a describir es cero */
            } /* Describiendo número */
            
            catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
        }
    },
    
    /* Estructura para tipos de controles de los Componentes de texto */
    TextControl : {
        alfabeticos : 'alfabeticos',
        numericos : 'numericos',
        alfa_numerico : 'alfa_numerico',
        alfa_space : 'alfa_space',
        alfa_numerico_space : 'alfa_numerico_space'
    }
};