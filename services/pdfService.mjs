import PDFDocument from "pdfkit-table";
// import fetch from "node-fetch"; // Necesario en Node.js
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const capitalizeWords = (str) => {
  if (!str) return ""; // Manejo de casos nulos/undefined
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const generarListaBuenaFe = async (
  jugadores,
  clubNombre,
  clubDireccion,
  clubTelefono,
  categoria,
  tecnico,
  ayudante,
  ligaLogoPath,
  clubLogoPath
) => {
  const doc = new PDFDocument({ margin: 30, size: "A4" });
  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  const loadImage = async (source) => {
    try {
      let buffer;

      // Cargar desde URL (WebP, PNG, JPEG)
      if (typeof source === "string" && source.startsWith("http")) {
        const response = await fetch(source);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);

        // Convertir WebP a PNG
        if (
          source.endsWith(".webp") ||
          response.headers.get("content-type") === "image/webp"
        ) {
          buffer = await sharp(buffer).png().toBuffer(); // Convierte a PNG
        }

        // Cargar desde archivo local
      } else {
        const absolutePath = path.resolve(__dirname, source);
        if (!fs.existsSync(absolutePath))
          throw new Error("Archivo no encontrado");
        buffer = fs.readFileSync(absolutePath);

        // Convertir WebP local si es necesario
        if (absolutePath.endsWith(".webp")) {
          buffer = await sharp(buffer).png().toBuffer();
        }
      }

      return buffer;
    } catch (error) {
      console.error("Error en loadImage:", error.message);
      return null;
    }
  };

  // Cargar y posicionar logos
  try {
    // Logo de la Liga (local)
    doc.y = 25;
    const ligaLogo = await loadImage(ligaLogoPath);
    if (ligaLogo) {
      doc.image(ligaLogo, 50, 5, { width: 50, height: 60 }); // Posición izquierda
    }

    // Escudo del Club (URL)
    const clubLogo = await loadImage(clubLogoPath);
    if (clubLogo) {
      doc.image(clubLogo, doc.page.width - 100, 5, { width: 60 }); // Posición derecha
    }
  } catch (error) {
    console.error("Error cargando logos:", error);
  }

  // Encabezado principal
  doc.fontSize(16).text(clubNombre, { align: "center" }).moveDown(0.5);

  doc
    .fontSize(16)
    .text("Lista de Buena Fe", { align: "center", underline: true })
    .moveDown(0.5);

  // Sección de información
  doc
    .fontSize(14)
    .text(`Categoría: ${categoria}`, 250, 85)
    .text(`Técnico: ${tecnico}`, 50, 85)
    .text(`Ayudante: ${ayudante}`, 50, 105)
    .text(`Teléfono: ${clubTelefono}`, doc.page.width - 230, 85, {
      align: "center",
    })
    .text(`Dirección: ${clubDireccion}`, doc.page.width - 400, 105, {
      align: "right",
    });

  // Fecha de generación
  // doc
  //   .fontSize(12)
  //   .text(
  //     `Generado el: ${new Date().toLocaleDateString("es-ES", {
  //       dateStyle: "long",
  //     })}`,
  //     { align: "center" }
  //   )
  //   .moveDown(2);
  const jugadoresConRenglonesVacios = [...jugadores];
  const alturaDisponible = 700; // Altura aproximada disponible para la tabla (ajusta según tu PDF)
  const alturaPorFila = 20; // Altura aproximada de cada fila (ajusta según tu fuente y padding)
  const renglonesPorPagina = Math.floor(alturaDisponible / alturaPorFila);

  // Configuración de la tabla
  // Agregar renglones vacíos hasta completar la página
  if (jugadoresConRenglonesVacios.length < renglonesPorPagina) {
    const renglonesFaltantes =
      renglonesPorPagina - jugadoresConRenglonesVacios.length;
    for (let i = 0; i < renglonesFaltantes; i++) {
      jugadoresConRenglonesVacios.push({
        nombre: "",
        apellido: "",
        dni: "",
        fecha_nac: "",
      });
    }
  }

  const table = {
    headers: ["#", "NOMBRE", "APELLIDO", "DNI", "FECHA NAC.", "FIRMA"],
    rows: jugadoresConRenglonesVacios.map((jugador, index) => [
      // index + 1 <= jugadores.length ? index + 1 : "", // Solo numera jugadores reales
      index + 1, // Siempre muestra el número de fila
      jugador.nombre ? capitalizeWords(jugador.nombre) : "",
      jugador.apellido ? capitalizeWords(jugador.apellido) : "",
      jugador.dni ? Number(jugador.dni).toLocaleString("es-AR") : "",
      jugador.fecha_nac
        ? new Date(jugador.fecha_nac).toLocaleDateString("es-ES", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        : "",
      " ", // Espacio para firma
    ]),
  };

  // Generar tabla
  await doc.table(table, {
    columnsSize: [30, 100, 100, 90, 100, 60],
    prepareHeader: () => doc.font("Helvetica-Bold").fontSize(12),
    prepareRow: () => doc.font("Helvetica").fontSize(10),
    options: {
      columnSpacing: 5,
      padding: [10, 10, 10, 10],
    },
    x: 50,
    y: 130,
  });

  // =============================================
  // SEGUNDA HOJA: Planilla de Cierre (Tabla con bordes)
  // =============================================

  doc.addPage(); // Añadir página

  // Cargar y posicionar logos
  try {
    // Logo de la Liga (local)
    const ligaLogo = await loadImage(ligaLogoPath);
    if (ligaLogo) {
      doc.image(ligaLogo, 50, 5, { width: 50, height: 60 }); // Posición izquierda
    }

    // Escudo del Club (URL)
    const clubLogo = await loadImage(clubLogoPath);
    if (clubLogo) {
      doc.image(clubLogo, doc.page.width - 100, 5, { width: 60 }); // Posición derecha
    }
  } catch (error) {
    console.error("Error cargando logos:", error);
  }

  // Titulo de la planilla
  doc
    .fontSize(20)
    .text("Planilla de cierre", { align: "center", underline: true })
    .moveDown(1);

  // Categoría
  doc
    .fontSize(14)
    .text(`Categoría: ${categoria}`, { align: "left" })
    .moveDown(0.5);

  // Tabla planilla de cierre
  // Configuración de tabla expulsados
  const tablaExpulsados = {
    title: "EXPULSADOS:", // Título integrado
    headers: [
      { label: "N°", width: 30 },
      { label: "Nombre", width: 100 },
      { label: "Apellido", width: 100 },
      { label: "DNI", width: 90 },
      { label: "Observaciones", width: 150 },
    ],
    rows: Array(8).fill(["\n", "\n", "\n", "\n", "\n"]),
    options: {
      columnSpacing: 5,
      padding: [15, 5, 15, 5],
      headerBorder: [0, 0, 2], // Línea inferior gruesa en encabezados
      border: { width: 1, color: "#000000" }, // Bordes negros para todas las celdas
    },
  };

  // Generar tabla con estilo mejorado
  await doc.table(tablaExpulsados, {
    prepareHeader: () =>
      doc.font("Helvetica-Bold").fontSize(12).fillColor("#333333"),
    prepareRow: () => doc.font("Helvetica").fontSize(10),
    divider: {
      header: { disabled: false, width: 2, color: "#000000" },
      horizontal: { disabled: false, width: 1, color: "#666666" },
    },
  });

  doc.moveDown(1);
  // Dibujar título "RESULTADOS"

  const tablaResultados = {
    title: "RESULTADOS:", // Título integrado
    headers: [
      { label: "Local", width: 100 },
      { label: "Categoría", width: 80 },
      { label: "Visitante", width: 100 },
    ],
    rows: Array(8).fill(["\n", "\n", "\n"]),
    options: {
      columnSpacing: 5,
      padding: [5, 5, 5, 5],
      headerBorder: [0, 0, 2], // Línea inferior gruesa en encabezados
      border: { width: 1, color: "#000000" }, // Bordes negros para todas las celdas
    },
  };

  // Generar tabla con estilo mejorado
  await doc.table(tablaResultados, {
    prepareHeader: () =>
      doc.font("Helvetica-Bold").fontSize(12).fillColor("#333333"),
    prepareRow: () => doc.font("Helvetica").fontSize(10),
    divider: {
      header: { disabled: false, width: 2, color: "#000000" },
      horizontal: { disabled: false, width: 1, color: "#666666" },
      vertical: { width: 1, color: "#cccccc" },
    },
  });

  doc.moveDown(1);
  // Dibujar título "INFORME ARBITRAL"
  doc
    .fontSize(14)
    .text("INFORME ARBITRAL:", 30, doc.y, { underline: true })
    .moveDown(0.5);

  // Dibujar instrucciones
  doc
    .fontSize(12)
    .text("* Complete los datos con letra clara y legible", 30, doc.y)
    .moveDown(1);

  // Dibujar líneas para escribir
  const lineHeight = 15; // Altura de cada línea
  const startY = doc.y; // Posición Y inicial

  for (let i = 0; i < 9; i++) {
    doc
      .moveTo(30, startY + i * lineHeight)
      .lineTo(doc.page.width - 30, startY + i * lineHeight)
      .stroke("#666666"); // Línea horizontal
  }

  // Ajustar posición Y después de las líneas
  doc.y = startY + 8 * lineHeight + 20; // Espacio adicional

  // Firmas
  doc
    .moveDown(1)
    .fontSize(12)
    .text("__________________________", doc.page.width - 400, doc.y - 20)
    .text("Firma y DNI del Árbitro", { align: "center", indent: -200 });

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
  });
};

export const generarFixture = async (fixtures, ligaLogoPath, zona) => {
  const doc = new PDFDocument({ margin: 30, size: "A4", centerContent: true });
  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  const loadImage = async (source) => {
    try {
      let buffer;

      // Cargar desde URL (WebP, PNG, JPEG)
      if (typeof source === "string" && source.startsWith("http")) {
        const response = await fetch(source);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);

        // Convertir WebP a PNG
        if (
          source.endsWith(".webp") ||
          response.headers.get("content-type") === "image/webp"
        ) {
          buffer = await sharp(buffer).png().toBuffer(); // Convierte a PNG
        }

        // Cargar desde archivo local
      } else {
        const absolutePath = path.resolve(__dirname, source);
        if (!fs.existsSync(absolutePath))
          throw new Error("Archivo no encontrado");
        buffer = fs.readFileSync(absolutePath);

        // Convertir WebP local si es necesario
        if (absolutePath.endsWith(".webp")) {
          buffer = await sharp(buffer).png().toBuffer();
        }
      }

      return buffer;
    } catch (error) {
      console.error("Error en loadImage:", error.message);
      return null;
    }
  };

  // Cargar y posicionar logos
  try {
    // Logo de la Liga (local)
    doc.y = 25;
    const logoSize = 40;
    const ligaLogo = await loadImage(ligaLogoPath);
    if (ligaLogo) {
      doc.image(ligaLogo, 50, 5, { width: 60, height: 60 }); // Posición izquierda
      doc.image(ligaLogo, doc.page.width - 100, 5, { width: 60 }); // Posición derecha
    }

    // Título principal
    doc
      .fontSize(12)
      .fillColor("#FF1F13") //rojo
      .font("Helvetica-Bold")
      .text(`LIGA SANTANDER ARGENTINA `, {
        align: "center",
        underline: false,
        lineGap: 8,
      })
      .moveDown(0.1);

    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .fillColor("#000000") // negro
      .text(`TORNEO APERTURA 2025`, {
        align: "center",
        lineGap: 10,
      })
      .moveDown(0.1);

    doc
      .fontSize(8)
      .fillColor("#000000") // negro
      .font("Helvetica-Bold")
      .text(`Fixture - ${zona.toUpperCase()} `, {
        align: "center",
        lineGap: 10,
      })
      .moveDown(1);

    // Agrupar partidos por fecha (jornada)
    const partidosPorFecha = fixtures.reduce((acc, partido) => {
      const fechaKey = partido.fecha || "Sin fecha";
      if (!acc[fechaKey]) {
        acc[fechaKey] = [];
      }
      acc[fechaKey].push(partido);
      return acc;
    }, {});

    // Posición inicial para la tabla
    let yPosition = 80;
    let mensajeFinalAgregado = false;
    let contadorFechas = 0;

    for (const [fecha, partidos] of Object.entries(partidosPorFecha)) {
      // Encabezado de fecha/jornada
      contadorFechas++;
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#FF1F13") // rojo
        .text(`Fecha ${fecha}`, 50, yPosition + 30)
        .moveDown(1);

      yPosition += 20;

      // Línea decorativa bajo el título
      const lineStartX = (doc.page.width - 520) / 2; // Centrar la línea
      doc
        .moveTo(lineStartX, yPosition - 5)
        .lineTo(lineStartX + 520, yPosition - 5)
        .lineWidth(4)
        .stroke("#1E3A8A");

      yPosition += 5;
      // Tabla de partidos para esta jornada
      for (const partido of partidos) {
        // Cargar escudos
        const escudoLocal = await loadImage(partido.equipo_local.escudo);
        const escudoVisitante = await loadImage(
          partido.equipo_visitante.escudo
        );

        // Centrar toda la fila del partido
        const rowWidth = 400; // Ancho total de la fila de partido
        const rowStartX = (doc.page.width - rowWidth) / 2; // Calcular posición X para centrar

        // Fila del partido
        doc.fontSize(7).font("Helvetica").fillColor("#333333");
        doc.text(
          partido.equipo_local.alias.toUpperCase(),
          rowStartX,
          yPosition,
          {
            width: 120,
            align: "right",
            fontSize: 6,
          }
        );

        // Escudo local
        if (escudoLocal) {
          doc.image(escudoLocal, 250, yPosition - 5, {
            width: 16,
            height: 16,
            align: "center",
          });
        }

        // VS
        doc.text("vs", 280, yPosition, { width: 20, align: "center" });

        // Escudo visitante
        if (escudoVisitante) {
          doc.image(escudoVisitante, 310, yPosition - 5, {
            width: 16,
            height: 16,
            align: "center",
          });
        }

        // Nombre visitante
        doc.text(partido.equipo_visitante.alias.toUpperCase(), 350, yPosition, {
          width: 120,
          align: "left",
          fontSize: 6,
        });

        // Espacio entre partidos
        yPosition += 25; // para 8 equipos o menos
        // yPosition += 20; // para 10 equipos o mas

        // Salto de página si es necesario
        if (yPosition > doc.page.height - 50) {
          doc.addPage();
          yPosition = 50; // para cuando son 9 fechas 10 equipos
          // yPosition = 50; // para cuando son 7 fechas 8 equipos
        }
      }

      // Espacio entre jornadas
      yPosition -= 20; // poner en 10 para mas de 8 equipos

      // Saltos de página controlados después de fecha 4 y fecha 8
      if (contadorFechas === 4 || contadorFechas === 8) {
        doc.addPage();
        yPosition = 10;
      }
    }

    // Agregar mensaje final solo una vez al terminar todo el contenido
    if (!mensajeFinalAgregado) {
      // Primero nos aseguramos de tener espacio en la página actual
      if (yPosition > doc.page.height - 100) {
        doc.addPage();
        // centrado al medio de la página
        yPosition = 100;
      } else {
        yPosition += 40; // Espacio antes del mensaje
      }

      // Mensaje de agradecimiento
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#FF1F13")
        .text(
          "¡Gracias por confiar en nuestra liga!",
          doc.page.width / 2 - 150,
          yPosition + 10,
          {
            align: "center",
            width: 300,
          }
        );

      // Logo adicional opcional al final
      if (ligaLogo) {
        doc.image(ligaLogo, doc.page.width / 2 - 30, yPosition + 25, {
          width: 60,
          align: "center",
        });
      }

      // Texto adicional bajo el logo (centrado)
      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor("#333333")
        .text("Temporada 2025", (doc.page.width - 100) / 2, yPosition + 100, {
          align: "center",
          width: 100,
        });

      mensajeFinalAgregado = true;
    }
  } catch (error) {
    console.error("Error cargando logos:", error);
  }

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
  });
};

export const generarFixtureClausura = async (fixtures, ligaLogoPath, zona) => {
  const doc = new PDFDocument({ margin: 30, size: "A4", centerContent: true });
  const buffers = [];
  doc.on("data", buffers.push.bind(buffers));

  const loadImage = async (source) => {
    try {
      let buffer;

      // Cargar desde URL (WebP, PNG, JPEG)
      if (typeof source === "string" && source.startsWith("http")) {
        const response = await fetch(source);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const arrayBuffer = await response.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);

        // Convertir WebP a PNG
        if (
          source.endsWith(".webp") ||
          response.headers.get("content-type") === "image/webp"
        ) {
          buffer = await sharp(buffer).png().toBuffer(); // Convierte a PNG
        }

        // Cargar desde archivo local
      } else {
        const absolutePath = path.resolve(__dirname, source);
        if (!fs.existsSync(absolutePath))
          throw new Error("Archivo no encontrado");
        buffer = fs.readFileSync(absolutePath);

        // Convertir WebP local si es necesario
        if (absolutePath.endsWith(".webp")) {
          buffer = await sharp(buffer).png().toBuffer();
        }
      }

      return buffer;
    } catch (error) {
      console.error("Error en loadImage:", error.message);
      return null;
    }
  };

  // Cargar y posicionar logos
  try {
    // Logo de la Liga (local)
    doc.y = 25;
    const logoSize = 40;
    const ligaLogo = await loadImage(ligaLogoPath);
    if (ligaLogo) {
      doc.image(ligaLogo, 50, 5, { width: 60, height: 60 }); // Posición izquierda
      doc.image(ligaLogo, doc.page.width - 100, 5, { width: 60 }); // Posición derecha
    }

    // Título principal
    doc
      .fontSize(12)
      .fillColor("#FF1F13") //rojo
      .font("Helvetica-Bold")
      .text(`LIGA SANTANDER ARGENTINA `, {
        align: "center",
        underline: false,
        lineGap: 8,
      })
      .moveDown(0.1);

    doc
      .fontSize(8)
      .font("Helvetica-Bold")
      .fillColor("#000000") // negro
      .text(`TORNEO CLAUSURA 2025`, {
        align: "center",
        lineGap: 10,
      })
      .moveDown(0.1);

    doc
      .fontSize(8)
      .fillColor("#000000") // negro
      .font("Helvetica-Bold")
      .text(`Fixture - ${zona.toUpperCase()} `, {
        align: "center",
        lineGap: 10,
      })
      .moveDown(1);

    // Agrupar partidos por fecha (jornada)
    const partidosPorFecha = fixtures.reduce((acc, partido) => {
      const fechaKey = partido.fecha || "Sin fecha";
      if (!acc[fechaKey]) {
        acc[fechaKey] = [];
      }
      acc[fechaKey].push(partido);
      return acc;
    }, {});

    // Posición inicial para la tabla
    let yPosition = 80;
    let mensajeFinalAgregado = false;
    let contadorFechas = 0;

    for (const [fecha, partidos] of Object.entries(partidosPorFecha)) {
      // Encabezado de fecha/jornada
      contadorFechas++;
      doc
        .fontSize(12)
        .font("Helvetica-Bold")
        .fillColor("#FF1F13") // rojo
        .text(`Fecha ${fecha}`, 50, yPosition + 30)
        .moveDown(1);

      yPosition += 20;

      // Línea decorativa bajo el título
      const lineStartX = (doc.page.width - 520) / 2; // Centrar la línea
      doc
        .moveTo(lineStartX, yPosition - 5)
        .lineTo(lineStartX + 520, yPosition - 5)
        .lineWidth(4)
        .stroke("#1E3A8A");

      yPosition += 5;
      // Tabla de partidos para esta jornada
      for (const partido of partidos) {
        // Cargar escudos
        const escudoLocal = await loadImage(partido.equipo_local.escudo);
        const escudoVisitante = await loadImage(
          partido.equipo_visitante.escudo
        );

        // Centrar toda la fila del partido
        const rowWidth = 400; // Ancho total de la fila de partido
        const rowStartX = (doc.page.width - rowWidth) / 2; // Calcular posición X para centrar

        // Fila del partido
        doc.fontSize(7).font("Helvetica").fillColor("#333333");
        doc.text(
          partido.equipo_visitante.alias.toUpperCase(),
          rowStartX,
          yPosition,
          {
            width: 120,
            align: "right",
            fontSize: 6,
          }
        );

        // Escudo local
        if (escudoVisitante) {
          doc.image(escudoVisitante, 250, yPosition - 5, {
            width: 18,
            height: 18,
            align: "center",
          });
        }

        // VS
        doc.text("vs", 280, yPosition, { width: 20, align: "center" });

        // Escudo visitante
        if (escudoLocal) {
          doc.image(escudoLocal, 310, yPosition - 5, {
            width: 18,
            height: 18,
            align: "center",
          });
        }

        // Nombre visitante
        doc.text(partido.equipo_local.alias.toUpperCase(), 350, yPosition, {
          width: 120,
          align: "left",
          fontSize: 6,
        });

        // Espacio entre partidos
        yPosition += 25; // poner 30 8 equipos o menos

        // Salto de página si es necesario
        if (yPosition > doc.page.height - 50) {
          doc.addPage();
          yPosition = 50; // para cuando son 9 fechas 10 equipos
          // yPosition = 50; // para cuando son 7 fechas 8 equipos
        }
      }

      // Espacio entre jornadas
      yPosition -= 20; // poner en 10 para mas de 8 equipos

      // Saltos de página controlados después de fecha 4 y fecha 8
      if (contadorFechas === 4 || contadorFechas === 8) {
        doc.addPage();
        yPosition = 10;
      }
    }

    // Agregar mensaje final solo una vez al terminar todo el contenido
    if (!mensajeFinalAgregado) {
      // Primero nos aseguramos de tener espacio en la página actual
      if (yPosition > doc.page.height - 100) {
        doc.addPage();
        // centrado al medio de la página
        yPosition = 100;
      } else {
        yPosition += 40; // Espacio antes del mensaje
      }

      // Mensaje de agradecimiento
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .fillColor("#FF1F13")
        .text(
          "¡Gracias por confiar en nuestra liga!",
          doc.page.width / 2 - 150,
          yPosition + 10,
          {
            align: "center",
            width: 300,
          }
        );

      // Logo adicional opcional al final
      if (ligaLogo) {
        doc.image(ligaLogo, doc.page.width / 2 - 30, yPosition + 25, {
          width: 60,
          align: "center",
        });
      }

      // Texto adicional bajo el logo (centrado)
      doc
        .fontSize(8)
        .font("Helvetica")
        .fillColor("#333333")
        .text("Temporada 2025", (doc.page.width - 100) / 2, yPosition + 100, {
          align: "center",
          width: 100,
        });

      mensajeFinalAgregado = true;
    }
  } catch (error) {
    console.error("Error cargando logos:", error);
  }

  doc.end();

  return new Promise((resolve) => {
    doc.on("end", () => resolve(Buffer.concat(buffers)));
  });
};
