/** @param {string} url @returns {Promise<string>} */
export async function getFileText(url) {
    const response = await fetch(url);
    return await response.text();
}
