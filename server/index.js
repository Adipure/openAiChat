import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import { Configuration, OpenAIApi } from "openai";
import openAiRoutes from './routes/openai.js';

/* configuration */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan("common"))
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

/* OpenAI configuration */
const configuration = new Configuration({
    organization: "org-H0B29WKUTlRyYtfIpZKj37da",
    apiKey: process.env.OPEN_API_KEY,
});
export const openai = new OpenAIApi(configuration);
const response = await openai.listEngines();

/* ROUTES */
app.use('/openai', openAiRoutes);

/* SERVER Setup */
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

