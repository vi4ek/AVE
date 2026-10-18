import fs from "fs";

const file = "src/compositions/ViralTechAiToolsReel.tsx";
let code = fs.readFileSync(file, "utf8");

// Replace all occurrences of Syne and Outfit with Poppins and Roboto
code = code.replaceAll("'Syne'", "'Poppins', 'Roboto', sans-serif");
code = code.replaceAll("'Outfit'", "'Roboto', 'Poppins', sans-serif");
code = code.replaceAll('"Syne"', "'Poppins', 'Roboto', sans-serif");
code = code.replaceAll('"Outfit"', "'Roboto', 'Poppins', sans-serif");

fs.writeFileSync(file, code, "utf8");
console.log("Successfully switched all fonts in ViralTechAiToolsReel.tsx to Poppins & Roboto!");
