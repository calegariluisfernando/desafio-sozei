import * as jwt from 'jsonwebtoken';
import { v4 } from 'uuid';

interface PayloadData {

    id: number;
    uuid: string;
    expiration?: number;
}

interface TokenDataInterface {

    idToken: string;
    token: string;
}

interface TokenVerifyInterface {

    status: boolean;
    token?: object | string;
    message?: string;
}

class TokenGenerator {

    static sign(payload: PayloadData): TokenDataInterface {

        const { id, uuid, expiration } = payload;
        const hoursExpirations = expiration ? expiration : parseInt(process.env.DEFAULT_VALUE_TOKEN_EXPIRATION_TIME);
        const jwtid = v4();
        const token = jwt.sign({ id, uuid }, process.env.SECRET_KEY, {  expiresIn: hoursExpirations * 60 * 60,  jwtid, issuer: process.env.ISSUER_TOKEN });
        
        const tokenReturn: TokenDataInterface = { idToken: jwtid, token };
        
        return tokenReturn;
    }

    static verify(token: string): TokenVerifyInterface {

        let tokenData: TokenVerifyInterface;
        try {
            
            // Verificar se token é valido
            token = token.split(' ').pop();     
            const decoded  = jwt.verify(token, process.env.SECRET_KEY);
            
            // Verificar se token esta na lista negra.
            tokenData = { status: true, token: decoded };
            return tokenData;
        } catch(err) {

            tokenData = { status: false };
            if (err.expiredAt) {
                
                tokenData = { status: false, message: 'Expired Token!' };
            }

            return tokenData
        }
        
        
    }
}

export { TokenGenerator, TokenDataInterface, TokenVerifyInterface };
