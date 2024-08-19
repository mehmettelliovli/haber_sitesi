import { Injectable } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from 'src/auth/auth.service';
import { UserRoleService } from 'src/user-role/user-role.service';
import { Role } from 'src/role/guard/role.enum';

@Injectable()
export class RegisterService {
  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
    private readonly rolesService: UserRoleService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { user, auth } = registerDto;

    const createdUser = await this.usersService.createUser(user);

    await this.authService.register({
      ...auth,
      userId: createdUser.payload._id,
    });

    await this.rolesService.createUserRole({
      role: Role.USER,
      userId: createdUser.payload._id,
    });

    return createdUser;
  }
}
