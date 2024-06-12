import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const offensiveWordsPath = path.join(__dirname, "offensiveWords.json");
let offensiveWords = [];

// Función para leer el archivo offensiveWords.json y cargar las palabras ofensivas en memoria
export const loadOffensiveWords = async () => {
  try {
    const data = await fs.readFile(offensiveWordsPath, "utf8");
    offensiveWords = JSON.parse(data).words;
  } catch (error) {
    console.error("Error loading offensive words:", error);
    offensiveWords = []; // Establecer a un array vacío en caso de error
  }
};

loadOffensiveWords();

// Llamar a la función de carga de palabras ofensivas al iniciar el servidor

// Función para verificar si un texto contiene palabras ofensivas
export const containsOffensiveWord = (text) => {
  const lowerCaseText = text.toLowerCase();
  return offensiveWords.some((word) => lowerCaseText.includes(word));
};
