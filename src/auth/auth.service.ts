import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserRoleService } from 'src/user-role/user-role.service';
import { AuthRepository } from './auth.repository';
import { HashPassword } from './helper/hash-password.helper';
import { PasswordValidator } from './helper/password-validator.helper';
import { CustomException } from 'src/exceptions/custom-exception';
import { ErrorCodes } from 'src/exceptions/error-codes';
import { ErrorMessages } from 'src/exceptions/error-messages';
import { ResponseCodes } from 'src/responses/response-codes';
import { ResponseMessages } from 'src/responses/response-messages';
import { CustomResponse } from 'src/responses/custom-responses';
import { Auth } from './schema/auth.schema';
import { IResult } from './interface/result.interface';

@Injectable()
export class AuthService {
  constructor(
    private authRepository: AuthRepository,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly userRoleService: UserRoleService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<IResult<string>> {
    try {
      const auth = await this.authRepository.findOne({ email });
      const validatedPassword = await PasswordValidator.validatePassword(
        password,
        auth.password,
      );
      if (auth && validatedPassword) {
        const user = await this.userService.findByEmail(email);
        if (!user) {
          throw new CustomException(
            ErrorCodes.UNAUTHORIZED_ACCESS,
            ErrorMessages.UNAUTHORIZED_ACCESS,
            403,
          );
        }
        const userRoles = await this.userRoleService.getUserRoles(
          String(auth.userId),
        );
        const payload = {
          email: auth.email,
          password: auth.password,
          userId: auth.userId,
          userRoles: userRoles.payload,
        };
        const access_token = await this.jwtService.signAsync(payload);
        return CustomResponse(
          ResponseMessages.AUTHORIZATION_SUCCESSFUL,
          ResponseCodes.AUTHORIZATION_SUCCESSFUL,
          access_token,
        );
      } else {
        throw new CustomException(
          ErrorCodes.EMAIL_OR_PASSWORD_WRONG,
          ErrorMessages.EMAIL_OR_PASSWORD_WRONG,
          404,
        );
      }
    } catch (err) {
      return err;
    }
  }

  async register(authDto: CreateAuthDto): Promise<IResult<Auth>> {
    try {
      const { email, password, userId } = authDto;
      const hashedPassword = await HashPassword.hashPassword(password);
      const payload = await this.authRepository.create({
        email,
        password: hashedPassword,
        userId,
      });
      return CustomResponse(
        ResponseMessages.USER_CREATED,
        ResponseCodes.USER_CREATED,
        payload,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.AUTH_NOT_CREATED,
        ErrorMessages.AUTH_NOT_CREATED,
        404,
      );
    }
  }

  async updateAuth(
    authId: string,
    updateAuthDto: UpdateAuthDto,
  ): Promise<IResult<Auth>> {
    try {
      const { email, password } = updateAuthDto;
      const hashedPassword = await HashPassword.hashPassword(password);
      const payload = await this.authRepository.findOneAndUpdate(
        { _id: authId },
        { email, password: hashedPassword },
      );

      if (!payload) {
        throw new CustomException(
          ErrorCodes.AUTH_NOT_FOUND,
          ErrorMessages.AUTH_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.AUTH_UPDATED,
        ResponseCodes.AUTH_UPDATED,
        payload,
      );
    } catch (err) {
      throw err;
    }
  }

  async getAllAuths() {
    try {
      const allAuths = await this.authRepository.find();
      return CustomResponse(
        ResponseMessages.AUTH_FOUND,
        ResponseCodes.AUTH_FOUND,
        allAuths,
      );
    } catch (err) {
      throw new CustomException(
        ErrorCodes.AUTH_NOT_FOUND,
        ErrorMessages.AUTH_NOT_FOUND,
        404,
      );
    }
  }

  async getAuth(authId: string) {
    try {
      const auth = await this.authRepository.findById(authId);
      if (!auth) {
        throw new CustomException(
          ErrorCodes.AUTH_NOT_FOUND,
          ErrorMessages.AUTH_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.AUTH_FOUND,
        ResponseCodes.AUTH_FOUND,
        auth,
      );
    } catch (err) {
      throw err;
    }
  }

  async deleteAuth(authId: string) {
    try {
      const auth = await this.authRepository.findOneAndDelete({ _id: authId });
      if (!auth) {
        throw new CustomException(
          ErrorCodes.AUTH_NOT_FOUND,
          ErrorMessages.AUTH_NOT_FOUND,
          404,
        );
      }
      return CustomResponse(
        ResponseMessages.AUTH_DELETED,
        ResponseCodes.AUTH_DELETED,
        auth,
      );
    } catch (err) {
      throw err;
    }
  }
}
//