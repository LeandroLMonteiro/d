import { Estilo, generalParameters } from '../config/generalParameters';
import { ValidationError } from '../errors/ValidationError';


export class ValidationService {
    static validateNomeLength(nome: string, maxLength = generalParameters.maxNomeLength) {
        if (nome.length > maxLength) {
            throw ValidationError.createDataError(
                `Nome excede o limite máximo de ${maxLength} caracteres`,
                nome
            );
        }
    }

    static validateAbreviacoes(palavras: string[], abreviacoes: Record<string, string>) {
        if (!Array.isArray(palavras) || !abreviacoes) {
            throw ValidationError.createDataError(
                'Dados inválidos para validação',
                'Formato de dados incorreto'
            );
        }

        const palavrasNaoEncontradas = palavras.filter(palavra => 
            !abreviacoes[palavra] && !palavra.match(/^[0-9]+$/)
        );

        if (palavrasNaoEncontradas.length > 0) {
            throw ValidationError.createDataError(
                'Palavras não encontradas no dicionário de abreviações',
                palavrasNaoEncontradas
            );
        }
    }

    static validateInput(texto: string) {
        if (!texto?.trim()) {
            throw ValidationError.createDataError(
                'A descrição não pode estar vazia',
                ''
            );
        }
    }

    static validateEstiloVazio(estilo: Estilo) {
        if (!estilo) {
            throw ValidationError.createDataError(
                'Estilo de nomenclatura não selecionado',
                'Selecione um estilo válido'
            );
        }
    }
}