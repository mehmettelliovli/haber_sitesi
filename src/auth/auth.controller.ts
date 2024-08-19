import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Role } from '../role/guard/role.enum';
import { Roles } from 'src/role/guard/roles.decorator';
import { Public } from './guard/public.metadata';
import { idDto } from 'src/dto/id-dto';
import { RegisterService } from 'src/register/register.service';
import { RegisterDto } from 'src/register/dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private registerService: RegisterService,
  ) {}

  @Public()
  @ApiBody({ type: LoginDto })
  @ApiTags('Auth')
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password);
  }

  @Public()
  @ApiTags('Auth')
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.registerService.register(registerDto);
  }

  @ApiTags('Auth')
  @Roles(Role.USER)
  @Put('/:id')
  async updateAuth(
    @Param() authId: idDto,
    @Body() updateAuthDto: UpdateAuthDto,
  ) {
    return await this.authService.updateAuth(authId.id, updateAuthDto);
  }

  @ApiTags('Auth')
  @Roles(Role.ADMIN)
  @Delete('/:id')
  async deleteAuth(@Param() authId: idDto) {
    return await this.authService.deleteAuth(authId.id);
  }

  @Roles(Role.ADMIN)
  @ApiTags('Admin')
  @Get()
  async getAuths() {
    return await this.authService.getAllAuths();
  }

  @ApiTags('Admin')
  @Roles(Role.ADMIN)
  @Get('/:id')
  async getAuth(@Param() authId: idDto) {
    return await this.authService.getAuth(authId.id);
  }
}
