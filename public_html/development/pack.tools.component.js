
/* Función para crear Atributos */
function HTMLAttribute (name, description) {
    this.name = name; this.description = description;
};

/* Métodos para configurar Atributos */
HTMLAttribute.prototype = {
    /* Nos permite establecer el nombre del Atributo crear */
    getName : function () { return this.name; },
    
    /* Nos permite establecer la descripción del Atributo crear */
    getDescription : function () { return this.description; },
    
    /* Valida si el nombre del Atributo se ha establecido correctamente */
    isCorrect : function () {
        return (this.name !== undefined && this.name !== null && this.name !== "");
    }
};

/* Función para crear Componentes */
function HTMLComponent (type, isClosed) {
    this.type = type; /* Etiqueta del Componente */
    
    this.id = undefined; /* Identificador del Componente */
    
    this.classes = new Array(); /* Clases del Componente */
    
    this.attributes = new Array(); /* Atributos del Componente */
    
    this.text = undefined; /* Texto del Componente */
    
    this.components = new Array(); /* Componentes hijos del Componente */
    
    this.isClosed = true; /* Variable para determinar cierre de etiqueta */
    
    if (isClosed !== undefined) { this.isClosed = isClosed; }
};

/* Métodos para configurar Componentes */
HTMLComponent.prototype = {
    /* Nos permite establecer el id del Componente a crear */
    setId : function (id) { this.id = id; },
    
    /* Nos permite agregar las clases que va a manejar el Componente */
    addClass : function (nameClass) { this.classes.push(nameClass); },
    
    /* Nos permite agregar los atributos del Componente */
    addAttribute : function (attribute) {
        try {
            if (Tools.isUndefined(attribute)) {
                throw 'el atributo establecido no esta definido ó instanciado.';
            } /* Excepción generada */
            
            if (!(attribute instanceof  HTMLAttribute)) { 
                throw 'el atributo establecido no es de tipo HTMLAttribute.';
            } /* Excepción generada */
            
            this.attributes.push(attribute); /* Agregando atributo */
        } /* El atributo a agregar es de tipo HtmlAttribute */
        
        catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
    },
    
    /* Nos permite establecer el texto del Componente a crear */
    setText : function (text) { this.text = text; },
    
    /* Nos permite agregar componentes hijos al Componente */
    addComponent : function (component) {
        try {
            if (Tools.isUndefined(component)) {
                throw 'el componente establecido no esta definido ó instanciado.';
            } /* Excepción generada */
            
            if (!(component instanceof  HTMLComponent)) {
                throw 'el componente establecido no es de tipo HTMLComponent.';
            } /* Excepción generada */
            
            this.components.push(component); /* Agregando componente */
        } /* El componente a agregar es de tipo HTMLComponent */
        
        catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
    },
    
    /* Nos permite generar el componente final a Agregar */
    createComponent : function () {
        try {
            if (!this.type) {
                throw 'no ha establecido el tipo de etiqueta del Componente.';
            } /* Excepción */
            
            var component = "<" + this.type; /* Iniciando etiqueta de configuración */
            
            if (this.id) { component += " id='" + this.id + "'"; } /* Se estableció identificador de Componente */

            if (this.classes.length > 0) {
                component += " class='"; /* Definiendo clases */

                for (var index = 0; index < this.classes.length; index++) {
                    component += this.classes[index] + " ";
                } /* Cargando la clase en el componente */

                component = component.trim() + "'"; /* Cerrando clases */
            } /* Se establecieron clases para el Componente */

            if (this.attributes.length > 0) {
                for (var index = 0; index < this.attributes.length; index++) {
                    var attribute = this.attributes[index]; /* Atributo a agregar */
                    
                    if (attribute.isCorrect()) {
                        component += " " + attribute.getName() + "='" + attribute.getDescription() + "'";
                    }
                } /* Cargando atributo en el componente */ 
            } /* Se establecieron atributos para el Componente */

            component += ">"; /* Cerrando etiqueta de configuración */

            if (this.text) { component += this.text; } /* Se estableció texto de Componente */
            
            if (this.components.length > 0) {
                for (var index = 0; index < this.components.length; index++) {
                    component += this.components[index].createComponent();                    
                } /* Cargando componente hijo en el componente */ 
            } /* Se establecieron componentes hijos en el Componente */

            /* El componente requiere cerrarse su etiqueta */
            if (this.isClosed) { component +=  "</" + this.type + ">";}
            
            return component; /* Retornando configuración del componente */
        } /* Creando componente */
        
        catch (err) { console.error('Uncaught TypeError: ' + err); } /* Error generado */
    }
};