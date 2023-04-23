import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ApiResponse, ViacepRequest } from 'src/utils/types';

@Injectable()
export class ViacepApi {
  private api = axios.create({
    baseURL: 'http://viacep.com.br/ws/',
  });

  async getCep(cep: string): Promise<ApiResponse<ViacepRequest>> {
    try {
      const cepRes = await this.api.get<ViacepRequest>(`${cep}/json`);
      if (cepRes.data.erro)
        return { error: { message: 'Erro ao validar CEP' } };
      return { data: cepRes.data };
    } catch (e) {
      return {
        error: { message: 'Erro ao validar CEP' },
      };
    }
  }
}
