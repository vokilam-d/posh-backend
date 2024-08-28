import { Expose } from 'class-transformer';
import { TokenPairDto } from './token-pair.dto';

export class RefreshDto implements Pick<TokenPairDto, 'refreshToken'> {
  @Expose()
  refreshToken: string;
}
