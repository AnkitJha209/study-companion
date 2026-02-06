import { Request, Response } from "express";
import { pdfUpload } from "../utils/pdfUploader";

export const storeAndIngestPDF = async (req: Request, res: Response) => {
    try {
        const file = (req as any).file;
        if (!file) {
            res.status(400).json({
                success: false,
                message: "No pdf file uploaded",
            });
            return;
        }

        if (file.mimetype !== "application/pdf") {
            res.status(400).json({
                success: false,
                message: "Only PDF files are allowed",
            });
            return
        }

        const pdfBuffer: Buffer = file.buffer;

        const { fileName, fileUrl } = await pdfUpload(pdfBuffer);
    } catch (error) {}
};
