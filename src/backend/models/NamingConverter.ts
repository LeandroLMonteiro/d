import { Estilo } from '../config/generalParameters';
import { ValidationError } from '../errors/ValidationError';
export class NamingConverter {
    static strategies = {
        camelCase: (palavras: string[]) =>
            palavras
                .map((p, i) => i === 0 ? p : p.charAt(0).toUpperCase() + p.slice(1))
                .join(''),
        PascalCase: (palavras: string[]) =>
            palavras
                .map(p => p.charAt(0).toUpperCase() + p.slice(1))
                .join(''),
        snake_case: (palavras: string[]) => palavras.join('_'),
        'kebab-case': (palavras: string[]) => palavras.join('-'),
        UPPER_SNAKE_CASE: (palavras: string[]) => palavras.map(p => p.toUpperCase()).join('_'),
        'dot.case': (palavras: string[]) => palavras.join('.')
    };

    static converterParaEstilo(
        palavras: string[],
        estilo: Estilo
    ) {
        const strategy = NamingConverter.strategies[estilo];
        if (!strategy) throw ValidationError.createDataError(
            `Estilo de nomenclatura "${estilo}" não suportado.`,
            `Estilos disponíveis: ${Object.keys(NamingConverter.strategies).join(', ')}`
            );
        return strategy(palavras);
    }
}