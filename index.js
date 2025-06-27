import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import informesRoutes from "./routes/informesRoutes.mjs";
import jugadoresRoutes from "./routes/jugadoresRoutes.mjs";
import clubesRoutes from "./routes/clubesRoutes.mjs";
import categoriaRoutes from "./routes/categoriaRoutes.mjs";
import loginRoutes from "./routes/loginRouter.mjs";
import userRoutes from "./routes/userRoutes.mjs";
import tecnicoRoutes from "./routes/tecnicoRoutes.mjs";
import pdfRoutes from "./routes/pdfRoutes.mjs";
import perfilRoutes from "./routes/perfilRoutes.mjs";
import estadisticaRoutes from "./routes/estadisticaRoutes.mjs";
import resultadosRoutes from "./routes/resultadosRoutes.mjs";
import fixtureRoutes from "./routes/fixtureRoutes.mjs";
import torneoRoutes from "./routes/torneoRoutes.mjs";
import pingRoutes from "./routes/pingRoutes.mjs";

dotenv.config();
const app = express();
app.use(
  cors({
    origin: "*",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoutes);
app.use("/api/categorias", categoriaRoutes);
app.use("/api/login", loginRoutes);
app.use("/api/informes", informesRoutes);
app.use("/api/jugadores", jugadoresRoutes);
app.use("/api/clubes", clubesRoutes);
app.use("/api/tecnicos", tecnicoRoutes);
app.use("/api/pdf", pdfRoutes);
app.use("/api/perfil", perfilRoutes);
app.use("/api/estadisticas", estadisticaRoutes);
app.use("/api/resultados", resultadosRoutes);
app.use("/api/fixture", fixtureRoutes);
app.use("/api/torneo", torneoRoutes);
app.use("/api", pingRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

export default app;
