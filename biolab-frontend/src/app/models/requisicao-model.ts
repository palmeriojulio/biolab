import { Exame } from './exame-model';
import { Pessoa } from './pessoa-model';

export class  Requisicao {

  id?: number;
  pessoa?: Pessoa;
  exames?: Exame[];
  formaPagamento?: string;
  nomeMedico?: string;
  crmMedico?: string;
  valorTotalRequisicao?: number;
  dataCriacaoRequisicao?: Date;

}
