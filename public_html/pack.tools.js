
function PackTools () { };

PackTools.prototype = {
    
    /* Permite completar una palabra con caracteres antes de esta misma */
    addCharsBefore : function (word, character, size) {
        var newWord = word; /* Estableciendo palabra actual */
        
        /* Cargando caracteres restantes por delante */
        for (var index = word.length; index < size; index++) { newWord = character + newWord; }
        
        return newWord; /* Retornando nueva palabra generada */
    },
    
    /* Permite completar una palabra con caracteres despues de esta misma */
    addCharsAfter : function (word, character, size) {
        var newWord = word; /* Estableciendo palabra actual */
        
        /* Cargando caracteres restantes por detrás */
        for (var index = word.length; index < size; index++) { newWord = newWord + character; }
        
        return newWord; /* Retornando nueva palabra generada */
    }
};