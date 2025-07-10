import { NamingConverter } from '../models/NamingConverter';

export type Estilo = keyof typeof NamingConverter.strategies

export type StatusType = 'success' | 'error' | 'warning' | undefined;

export interface Alerta { type: StatusType; message: string };

export const generalParameters = {
    maxNomeLength: 30,
    estiloPadrao: 'snake_case' as Estilo,
    desabilitarEstilo: false
};
