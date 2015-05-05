
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
        /* Agregando atributo */
        if (attribute instanceof  HTMLAttribute) { this.attributes.push(attribute); } 
        
        else {
            console.error("Pack Tools Component: el objeto atributo no es de tipo HTMLAttribute.");
        } /* El atributo a agregar no es de tipo HtmlAttribute */
    },
    
    /* Nos permite establecer el texto del Componente a crear */
    setText : function (text) { this.text = text; },
    
    /* Nos permite agregar componentes hijos al Componente */
    addComponent : function (component) {
        /* Agregando componente */
        if (component instanceof  HTMLComponent) { this.components.push(component); } 
        
        else {
            console.error("Pack Tools Component: el objeto componente no es de tipo HTMLComponent.");
        } /* El atributo a agregar no es de tipo HtmlAttribute */
    },
    
    /* Nos permite generar el componente final a Agregar */
    createComponent : function () {
        if (this.type) {
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
        
        else {
            console.error("Pack Tools Component: No ha establecido el tipo de etiqueta del Componente.");
        } /* No ha establecido tipo de etiqueta del Componente */
    }
};