import * as jwt from 'jsonwebtoken';
import v4 from 'uuid';
import { Helpers } from './Helpers';

interface PayloadData {

    id: number;
    uuid: string;
    expiration?: number;
}

class TokenGenerator {

    static sign(payload: PayloadData): string {

        const { id, uuid, expiration } = payload;
        // const hoursExpirations = 0;
        const hoursExpirations = expiration ? expiration : parseInt(process.env.DEFAULT_VALUE_TOKEN_EXPIRATION_TIME);

        return jwt.sign({ id, uuid }, process.env.SECRET_KEY, 
            { 
                expiresIn: hoursExpirations * 60 * 60, 
                jwtid: Helpers.generateMd5(`${id}${uuid}`),
                issuer: process.env.ISSUER_TOKEN
            }
        );
    }

    static verify(token: string): boolean | string {

        try {
            
            // Verificar se token é valido
            token = token.split(' ').pop();     
            const decoded  = jwt.verify(token, process.env.SECRET_KEY);
            
            // Verificar se token esta na lista negra.
            return decoded !== 'undefined';
        } catch(err) {

            if (err.expiredAt) {
                
                return 'Expired Token!';
            }

            return false
        }
        
        
    }
}

export { TokenGenerator };