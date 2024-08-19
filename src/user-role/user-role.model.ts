import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserRoleService } from './user-role.service';
import { UserRoleController } from './user-role.controller';
import { userRoleSchema } from './schema/user-role.schema';
import { UserRoleRepository } from './user-role.repository';
import { CreateUserRoleDto } from './dto/create-user-role.dto';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'UserRole', schema: userRoleSchema }]),
    UserRoleModule,
  ],
  controllers: [UserRoleController],
  providers: [UserRoleService, UserRoleRepository, CreateUserRoleDto],
  exports: [UserRoleService],
})
export class UserRoleModule {}
