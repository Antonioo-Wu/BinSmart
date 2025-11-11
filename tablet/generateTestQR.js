import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
import qrcode from 'qrcode-terminal';

const JWT_SECRET = 'super-secret-token';
const USER_ID = '69014f36dfcd3947c6fe1589'; 

const qrToken = uuidv4();

const sessionJwt = jwt.sign(
  { userId: USER_ID },
  JWT_SECRET,
  { expiresIn: '24h' }
);

const qrData = {
  qrToken,
  sessionJwt
};

const qrString = JSON.stringify(qrData);

console.log('\n📱 Escanea este QR con tu tablet:\n');
qrcode.generate(qrString, { small: true });

console.log('\n📋 Datos del QR:');
console.log('qrToken:', qrToken);
console.log('userId:', USER_ID);
console.log('\n⚠️  IMPORTANTE: Este QR es para pruebas. En producción usa el endpoint /api/qr/generate\n');