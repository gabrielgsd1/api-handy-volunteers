export type ApiResponse<T> = {
  error?: {
    message: string;
  };
  data?: T;
};

export type ViacepRequest = {
  erro?: boolean;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
};
