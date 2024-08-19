import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractRepository } from 'src/abstractRepository/abstract.repository';
import { Auth } from './schema/auth.schema';

@Injectable()
export class AuthRepository extends AbstractRepository<Auth> {
  constructor(@InjectModel(Auth.name) authModel: Model<Auth>) {
    super(authModel);
  }
}
