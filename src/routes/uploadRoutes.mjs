import express from "express";
import multer from "multer";
import { Router } from "express";
import { uploadImage } from "../config/cloudinary.mjs";
import { saveFileUrlToSupabase } from "../services/uploadService.mjs";
// import { insertImageController } from "../controllers/uploadController.mjs";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // Límite de 10MB
  },
});

router.post("/uploads", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    const observaciones = req.body.observaciones;
    if (!file) return res.status(400).json({ error: "No se recibió archivo" });

    // Subir a Cloudinary
    const imageUrl = await uploadImage(file.buffer);
    // Guardar URL en Supabase
    await saveFileUrlToSupabase(imageUrl, observaciones);

    res.json({
      message: "Archivo subido correctamente",
      fileUrl: imageUrl,
      observaciones,
    });
  } catch (error) {
    console.error("Error al subir archivo:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;
