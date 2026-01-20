import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRouter from './modules/auth/auth.routes';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(helmet());

// Load routes here
app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/users', userRouter);

export { app };
