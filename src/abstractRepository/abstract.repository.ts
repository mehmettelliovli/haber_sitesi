import { Model, FilterQuery, UpdateQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { AbstractDocument } from './abstract.document';

@Injectable()
export abstract class AbstractRepository<TDocument extends AbstractDocument> {
  constructor(protected model: Model<TDocument>) {}

  async find(
    filterQuery?: FilterQuery<TDocument>,
    option?: any,
  ): Promise<TDocument[]> {
    return this.model.find(filterQuery, option).lean<TDocument[]>(true);
  }

  async create(createDto: Omit<TDocument, '_id'>): Promise<TDocument> {
    const createdDocument = new this.model({ ...createDto });
    return await createdDocument.save();
  }

  async findOneAndDelete(
    filterQuery: FilterQuery<TDocument>,
  ): Promise<TDocument> {
    return await this.model.findOneAndDelete(filterQuery);
  }

  async findOneAndUpdate(
    filterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
  ): Promise<TDocument> {
    return await this.model.findOneAndUpdate(filterQuery, update, {
      new: true,
    });
  }

  async findById(id: string): Promise<TDocument> {
    return this.model.findById(id);
  }

  async findOne(
    filterQuery: FilterQuery<TDocument>,
    option?: any,
  ): Promise<TDocument> {
    const document = await this.model
      .findOne(filterQuery, option)
      .lean<TDocument>(true);
    return document;
  }
}
