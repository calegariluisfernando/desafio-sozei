import * as crypto from 'crypto';

class Helpers {

    static md5(contents: string) {

        return crypto
            .createHash('md5')
            .update(contents)
            .digest('hex');
    }
}

export { Helpers };