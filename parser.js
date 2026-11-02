// Group 1 = tag (undefined if there are no brackets, "" if they are empty)
// Group 2 = text
const pattern = /\bTODO\b\s*(?:\[([^\]]*)\])?:?\s*(.*)$/i;

/**
 * Parses a line and extracts the tag and the text of its TODO.
 * @param {string} line Line of code to parse.
 * @returns {{ tag: string, text: string } | null} The uppercase tag and the text, or null if the line has no TODO.
 */
function textAnalyzer(line) {
    const result = pattern.exec(line);
    if (result === null) {
        return null;
    }

    let formattedTag = (result[1] ?? "").trim().toUpperCase();
    if (formattedTag === "") {
        formattedTag = "UNTAGGED";
    }

    let formattedText = result[2].trim();
    if (formattedText === "") {
        formattedText = "WITHOUT DESCRIPTION";
    }

    return { tag: formattedTag, text: formattedText };
}

module.exports = {
    textAnalyzer
}
