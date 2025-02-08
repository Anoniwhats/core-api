import cors from "cors";
import dotenv from "dotenv";
import express from "express";

import router from "./presentation/routes/routes"; // Adicione `.js` ao final dos imports locais!

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api", router);

app.listen(PORT, () => {
	console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
