
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
    }
};