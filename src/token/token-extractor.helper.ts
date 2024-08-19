import { Injectable, UnauthorizedException } from '@nestjs/common';
//import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TokenExtractor {
  /*private readonly jwtSecret: string;

  constructor(
    private readonly configService: ConfigService,
    private jwtService: JwtService,
  ) {
    this.jwtSecret = this.configService.get<string>('jwt.secret');
  }*/
  constructor(private jwtService: JwtService) {}

  extractUserId(token: string) {
    if (!token) {
      throw new UnauthorizedException('Token not found');
    }

    const splitToken = token.split(' ')[1];
    let decodedToken;
    try {
      decodedToken = this.jwtService.verify(splitToken);
    } catch (err) {
      console.log('Token verification failed:', err);
      return false;
    }
    const userId = decodedToken.UserId;
    return userId;
  }
}
