import { JwtPayload } from "jsonwebtoken";

declare global{
    namespace Express{
        interface Request{
            user:JwtPayload
        }
    }
}

// Error extends AppError