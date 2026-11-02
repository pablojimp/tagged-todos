// Grupo 1 = etiqueta (undefined si no hay corchetes, "" si están vacíos)
// Grupo 2 = texto
const pattern = /\bTODO\b\s*(?:\[([^\]]*)\])?:?\s*(.*)$/i;

/**
 * Analiza una línea y extrae la etiqueta y el texto de su TODO.
 * @param {string} texto Línea de código a analizar.
 * @returns {{ tag: string, text: string } | null} La etiqueta en mayúsculas y el texto, o null si la línea no tiene TODO.
 */
function textAnalyzer(texto) {
    const result = pattern.exec(texto);
    if (result === null) {
        return null;
    }

    let tituloFormateado = (result[1] ?? "").trim().toUpperCase();
    if (tituloFormateado === "") {
        tituloFormateado = "UNTAGGED";
    }

    let descripcionFormateada = result[2].trim();
    if (descripcionFormateada === "") {
        descripcionFormateada = "WITHOUT DESCRIPTION";
    }

    return { tag: tituloFormateado, text: descripcionFormateada };
}

module.exports = {
    textAnalyzer
}
