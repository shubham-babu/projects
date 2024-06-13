import { Injectable } from '@nestjs/common';
const jwt = require('jsonwebtoken');
@Injectable()
export class AuthService {
  validateToken(token: string) {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    console.log(decoded);
    return decoded.userId;
  }
}
