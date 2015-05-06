
var DateTimeTools = {
    /* Permite completar campos de Fecha y Hora para formatos */
    completField : function (word, size) { return Tools.addCharsBefore(word,'0',size); },
    
    /* Nos permite saber si un Año específico es Biciesto */
    isLeapYear :  function (year) {
        return ((year % 4 === 0) && (year % 100 !== 0 || year % 400 === 0));
    },

    /* Creamos un array con el número de dias de los meses de un Año */
    getNumberDaysOfMonth : function (year) {
        var numberDays = new Array(); numberDays.push(31); /* Enero */
        numberDays.push(DateTimeTools.isLeapYear(year) ? 29 : 28); /* Febrero */
        numberDays.push(31); numberDays.push(30); /* Marzo, Abril */
        numberDays.push(31); numberDays.push(30); /* Mayo, Junio */
        numberDays.push(31); numberDays.push(31); /* Julio, Agosto */
        numberDays.push(30); numberDays.push(31); /* Septiembre, Octubre */
        numberDays.push(30); numberDays.push(31); /* Noviembre, Diciembre */

        return numberDays; /* Retornando número de dias del Mes del Año */
    },

    /* Nos permite saber el número de dias que tiene un Año */
    getNumberDaysOfYear : function (year) { return DateTimeTools.isLeapYear(year) ? 366 : 365; },
    
    /* Nos permite calcular la diferencia en dias entre dos Fechas */
    calculateDifference : function (fecha_begin, fecha_end) {
        try {
            if (Tools.isUndefined(fecha_begin) || Tools.isUndefined(fecha_end)) {
                throw 'las fechas establecidas no estan definidas ó instanciadas';
            } /* Excepción */

            if (!(fecha_begin instanceof Date && fecha_end instanceof Date)) {
                throw 'las fechas establecidas no son de tipo Date.';
            } /* Excepción */

            var daysCalculados = 0; /* Varirable para establecer la diferencia */
            var numberDays = DateTimeTools.getNumberDaysOfMonth(fecha_begin.getFullYear());

            if (fecha_begin.getFullYear() > fecha_end.getFullYear()) { return 0; }

            else if (fecha_begin.getFullYear() === fecha_end.getFullYear()) {
                if (fecha_begin.getMonth() > fecha_end.getMonth()) { return 0; }

                else if (fecha_begin.getMonth() === fecha_end.getMonth()) {
                    if (fecha_begin.getDate() > fecha_end.getDate()) { return 0; }

                    else { return fecha_end.getDate() - fecha_begin.getDate(); }
                } 

                else {
                    daysCalculados = numberDays[fecha_begin.getMonth()] - fecha_begin.getDate();

                    for (var i = fecha_begin.getMonth() + 1; i < fecha_end.getMonth(); i++) {
                        daysCalculados = daysCalculados + numberDays[i];
                    } 

                    daysCalculados = daysCalculados + fecha_end.getDate();
                } 
            } 

            else {
                daysCalculados = numberDays[fecha_begin.getMonth()] - fecha_begin.getDate();

                for (var i = fecha_begin.getMonth(); i < 12; i++) {
                    daysCalculados = daysCalculados + numberDays[i];
                } 

                for (var j = fecha_begin.getFullYear() + 1; j < fecha_end.getFullYear(); j++) {
                    daysCalculados = daysCalculados + DateTimeTools.getNumberDaysOfYear(j);
                } 

                numberDays = DateTimeTools.getNumberDaysOfMonth(fecha_end.getFullYear());

                for (var h = 0; h < (fecha_end.getMonth() - 1); h++) {
                    daysCalculados = daysCalculados + numberDays[h];
                } 

                daysCalculados = daysCalculados + fecha_end.getDate();
            } 

            return  daysCalculados; /* Retornando los dias de difrencias calculados */
        }

        catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
    },
    
    /* Nos permite incrementar una Fecha en un número de Dias */
    increaseDaysOfDate : function (date, numDays) {
        var day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
        var stop = false; var numberDays = DateTimeTools.getNumberDaysOfMonth(year);

        day = day + numDays; /* Aumentando numero de Dias */

        while (!stop) {
            if (day > numberDays[month]) {
                day = day - numberDays[month]; month++;

                if (month > 11) {
                    year++; month = 0; numberDays = DateTimeTools.getNumberDaysOfMonth(year);
                } /* Se avanzó al siguiente año */
            } /* El dia no ha clazado en el mes actual establecido */

            else { stop = true; }
        } /* Reconfigurando parámetros para la nueva fecha*/

        return new Date(year,month,day); /* Retornando nueva Fecha */
    },
    
    /* Nos permite incrementar una Fecha en un número de Meses */
    increaseMonthsOfDate : function (date, numMonths) {
        var day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
        var numberDays = DateTimeTools.getNumberDaysOfMonth(year);
        
        for (var i = 1; i <= numMonths; i++) {
            month++; /* Incrementar el mes en el proceso */
            
            if (month > 11) {
                month = 1; year++; numberDays = DateTimeTools.getNumberDaysOfMonth(year);
            } /* Se esta cambiando de Año la fecha */
            
            if (day > numberDays[month]) { day = day - numberDays[month]; month++; }
        }
        
        return new Date(year,month,day); /* Retornando nueva Fecha */
    },
    
    /* Nos permite decrementar en dias una Fecha */
    decreaseDaysOfDate : function (date, numDays) {
        var day = date.getDate(), month = date.getMonth(), year = date.getFullYear();
        var stop = false; var numberDays = DateTimeTools.getNumberDaysOfMonth(year);
        
        while (!stop) {
            if (day > numDays) { day = day - numDays; stop = true; } /* Quitando dias a la Fecha */
            
            else {
                numDays = numDays - day; month--;
                
                if (month < 0) {
                    month = 12; year--; numberDays = DateTimeTools.getNumberDaysOfMonth(year);
                } /* La fecha desendío de Año en el Proceso */
                
                day = numberDays[month]; /* Estableciendo número de Dias */
            }
        }
        
        return new Date(year,month,day); /* Retornando nueva Fecha */
    }
};

/* Nos permite saber si el Año de la Fecha es Biciesto */
Date.prototype.isLeapYear = function () { return DateTimeTools.isLeapYear(this.getFullYear()); };

/* Calcular número de dias que han transcurrido desde una fecha anterior */
Date.prototype.calculateDaysElapsed = function (date) { return DateTimeTools.calculateDifference(date,this); };

/* Calcular número de dias que falta para llegar a una fecha superior */
Date.prototype.calculateDaysMissing = function (date) { return DateTimeTools.calculateDifference(this,date); };

/* Nos permite saber si la fecha se encuentra antes de una establecida */
Date.prototype.isDateBerfore = function (date) { return (this.calculateDaysMissing(date) > 0); };

/* Nos permite saber si la fecha se encuentra despues de una establecida */
Date.prototype.isDateAfter = function (date) { return (this.calculateDaysElapsed(date) > 0); };

/* Nos permite saber si la fecha se encuentra entre un rango de Fecha */
Date.prototype.isDateBetween = function (date_intial, date_final) { return this.isAfter(date_intial) && this.isBerfore(date_final); };

/* Nos permite saber si la fecha es igual a una especifícada */
Date.prototype.dateEquals = function (date) {
    if (this.getDate() !== date.getDate()) { return false; } /* Dias de fechas son diferentes */

    if (this.getMonth() !== date.getMonth()) { return false; } /* Meses de fechas son diferentes */

    return (this.getFullYear() === date.getFullYear()); /* Verificando años de fechas */
};

/* Nos permite generar una cadena con un formato de fecha aaaa-mm-dd */
Date.prototype.getDateFormat = function () {
    var date_format = DateTimeTools.completField(this.getFullYear(),4); 
    date_format += '-' + DateTimeTools.completField((this.getMonth() + 1),2); 
    date_format += '-' + DateTimeTools.completField(this.getDate(),2); 
    
    return date_format; /* Retornando fecha con formato aaaa-mm-dd */
};

/* Nos permite generar un código con un formato de aaaammdd */
Date.prototype.getDateCode = function () {
    var date_code = DateTimeTools.completField(this.getFullYear(),4); 
    date_code += DateTimeTools.completField((this.getMonth() + 1),2); 
    date_code += DateTimeTools.completField(this.getDate(),2); 
    
    return date_code; /* Retornando formato de codigo aaaammdd */
};

/* Nos permite saber si la hora es igual a una especifícada */
Date.prototype.timeEquals = function (time) {
    if (this.getSeconds() !== time.getSeconds()) { return false; } /* Segundos de tiempo son diferentes */

    if (this.getMinutes() !== time.getMinutes()) { return false; } /* Minutos de tiempo son diferentes */

    return (this.getHours() === time.getHours()); /* Verificando horas del tiempo */
};

/* Nos permite generar una cadena con un formato de hora hh-mm-ss */
Date.prototype.getTimeFormat = function () {
    var time_format = DateTimeTools.completField(this.getHours(),2); 
    time_format += ':' + DateTimeTools.completField(this.getMinutes(),2); 
    time_format += ':' + DateTimeTools.completField(this.getSeconds(),2); 
    
    return time_format; /* Retornando hora con formato hh-mm-ss */
};

/* Nos permite generar un código con un formato de hhmmss */
Date.prototype.getTimeCode = function () {
    var time_code = DateTimeTools.completField(this.getHours(),2); 
    time_code += DateTimeTools.completField(this.getMinutes(),2); 
    time_code += DateTimeTools.completField(this.getSeconds(),2); 
    
    return time_code; /* Retornando formato de código hhmmss */
};