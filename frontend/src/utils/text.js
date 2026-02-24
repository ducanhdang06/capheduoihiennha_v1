
/**
 * Take Vietnamese text and make it searchable
 */
export function normalizeVietnamese(text = "") {
    return text
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}