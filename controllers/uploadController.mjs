// import { saveFileUrlToSupabase } from "../services/uploadService.mjs";
// import { uploadImage } from "../";

// export const insertImageController = async (req, res) => {
//   const file = req.file;
//   const observaciones = req.body.observaciones;
//   if (!file) return res.status(400).json({ error: "No se recibió archivo" });
//   // console.log("Archivo recibido: ", file);
//   // console.log("Observaciones", observaciones);

//   // Subir a Cloudinary
//   const imageUrl = await uploadImage(file.buffer);

//   // Guardar URL en Supabase
//   await saveFileUrlToSupabase(imageUrl, observaciones);

//   res.json({
//     message: "Archivo subido correctamente",
//     fileUrl: imageUrl,
//     observaciones,
//   });
// };
