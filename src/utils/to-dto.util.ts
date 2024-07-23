import { plainToInstance, ClassConstructor, ClassTransformOptions } from 'class-transformer';

export const toDto = <T, V>(cls: ClassConstructor<T>, plain: V, options: ClassTransformOptions = {}): T => {
  return plainToInstance(cls, plain, { excludeExtraneousValues: true, ...options });
};