const crypto = require('crypto');
const algorithm = 'aes-256-ctr';
const secretKey = 'vVHS6sdmpNWjRRIqCc7rdxs01lwHzfr9';
const iv = crypto.randomBytes(16); 

module.exports = {

    decrypt: (hash) => {

        const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(hash.cpt, 'hex'));

        const decrpyted = Buffer.concat([decipher.update(Buffer.from(hash.rest, 'hex')), decipher.final()]);

        return JSON.parse(decrpyted.toString());
    }

}