import { Model, Document } from 'mongoose';

export class GenericDao<T extends Document> {
    constructor(private readonly schema) {}

    async save(entity: T): Promise<T> {
        return this.schema.create(entity);
    }

    async findByUserId(userId: string): Promise<T | null> {
        return this.schema.findOne({ user: userId }).exec();
    }

    async findByUserEmail(email: string): Promise<T | null> {
        return this.schema.findOne({ email }).exec();
    }

    async findById(id: string): Promise<T | null> {
        return this.schema.findById(id).exec();
    }

    async find(query: Record<string, unknown>): Promise<T[]> {
        return this.schema.find(query).exec();
    }

    async update(id: string, updatedData: Partial<T>): Promise<T | null> {
        return this.schema.findByIdAndUpdate(id, updatedData, { new: true }).exec();
    }

    async delete(id: string): Promise<T | null> {
        return this.schema.findByIdAndDelete(id).exec();
    }
}
