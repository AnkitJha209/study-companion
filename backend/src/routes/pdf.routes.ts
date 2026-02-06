import { Router } from "express";
import multer from 'multer'
import { storeAndIngestPDF } from "../controllers/pdf.controller";
export const pdfRoutes = Router()
const upload = multer({storage: multer.memoryStorage()})


pdfRoutes.post('/upload-ingest-pdf', upload.single('file'), storeAndIngestPDF)