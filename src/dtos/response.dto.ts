import { Expose } from 'class-transformer';

export class ResponseDto<T = unknown> {
  @Expose()
  status: 'success' | 'error' = 'success';

  @Expose()
  data?: T;

  @Expose()
  error?: {
    code: number;
    message: string;
    data: unknown;
    timestampIso: string;
    method: string;
    path: string;
    referer: string;
  };

  @Expose()
  pagination?: {
    page: number;
    limit: number;
  }

  constructor(data?: T) {
    this.data = data;
  }

  setStatus(status: 'success' | 'error'): void {
    this.status = status;
    if (this.status === 'error') {
      this.error = {} as ResponseDto['error'];
    }
  }
}
