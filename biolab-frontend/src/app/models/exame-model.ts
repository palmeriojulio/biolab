export class Exame {
  id?: number;
  nome?: string;
  tipo?: string;
  valor?: number;

  constructor(id?: number, nome?: string, tipo?: string, valor?: number) {
    this.id = id;
    this.nome = nome;
    this.tipo = tipo;
    this.valor = valor;
  }
}
