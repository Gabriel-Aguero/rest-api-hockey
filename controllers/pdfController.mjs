import {
  generarListaBuenaFe,
  generarFixture,
  generarFixtureClausura,
} from "../services/pdfService.mjs";
import { getJugadoresByCategory } from "../services/jugadoresService.mjs";
import { getCategoriaById } from "../services/categoriaService.mjs";
import { getClubes } from "../services/clubesService.mjs";
import { getTecnicosByCategory } from "../services/tecnicoService.mjs";
import { getFixtures } from "../services/fixtureService.mjs";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Función para capitalizar cada palabra de un string
const capitalizeWords = (str) => {
  if (!str) return ""; // Manejo de casos nulos/undefined
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const generarPDFController = async (req, res) => {
  try {
    // Obtener datos del club logueado (desde tu middleware de autenticación)
    const { perfil_id } = req.query;
    const { categoria_id } = req.query;

    // 1. Obtener datos del club
    const clubes = await getClubes(perfil_id);
    if (!clubes?.length) {
      return res.status(404).json({ error: "No se encontraron clubes" });
    }
    const club = clubes[0];
    // console.log("Club:", club);
    const escudoUrl = club?.perfiles?.escudo;
    // direccion = club?.direccion.slice(0, 20);

    const nombreCapitalizado = capitalizeWords(club?.nombre);
    // 2. Obtener categoría
    const categoria = await getCategoriaById(categoria_id);
    if (!categoria) {
      return res.status(404).json({ error: "No se encontraron categorías" });
    }

    // 3. Obtener datos del técnico
    const tecnicos = await getTecnicosByCategory(categoria_id, club.nombre);
    if (!tecnicos) {
      return res.status(404).json({ error: "No se encontraron tecnicos" });
    }
    const tecnico = tecnicos[0];
    // console.log("Tecnico:", tecnico);

    // 4. Obtener jugadores
    const jugadores = await getJugadoresByCategory(perfil_id, categoria_id);
    // 2. Obtener paths de logos (ajusta según tu lógica)
    const ligaLogoPath = path.resolve(__dirname, "../../public/logo-liga.png");
    // const clubLogoPath = path.resolve(__dirname, `../../public/logo-liga.png`);

    // 3. Generar PDF
    const pdfBuffer = await generarListaBuenaFe(
      jugadores,
      nombreCapitalizado,
      club.direccion.slice(0, 15),
      club.telefono,
      categoria.nombre,
      capitalizeWords(tecnico.dt),
      capitalizeWords(tecnico.ayudante),
      ligaLogoPath,
      escudoUrl
    );

    // 4. Enviar PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="ListaBuenaFe.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar el PDF" });
  }
};

export const fixturePDFControllerApertura = async (req, res) => {
  try {
    // Obtener datos del club logueado (desde tu middleware de autenticación)
    const { torneoId } = req.query;
    const { zonaId } = req.query;

    // 4. Obtener fixture
    const fixtures = await getFixtures(torneoId, zonaId);
    const zona = fixtures[0].zonas.nombre;

    const ligaLogoPath = path.resolve(__dirname, "../../public/logo-liga.png");

    // 3. Generar PDF
    const pdfBuffer = await generarFixture(fixtures, ligaLogoPath, zona);

    // 4. Enviar PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Fixture-Apertura.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar el PDF" });
  }
};

export const fixturePDFControllerClausura = async (req, res) => {
  try {
    // Obtener datos del club logueado (desde tu middleware de autenticación)
    const { torneoId } = req.query;
    const { zonaId } = req.query;

    // 4. Obtener fixture
    const fixtures = await getFixtures(torneoId, zonaId);
    const zona = fixtures[0].zonas.nombre;

    const ligaLogoPath = path.resolve(__dirname, "../../public/logo-liga.png");

    // 3. Generar PDF
    const pdfBuffer = await generarFixtureClausura(
      fixtures,
      ligaLogoPath,
      zona
    );

    // 4. Enviar PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="Fixture-Clausura.pdf"'
    );
    res.send(pdfBuffer);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar el PDF" });
  }
};
