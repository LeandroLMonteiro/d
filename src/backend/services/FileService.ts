import { ValidationError } from '../errors/ValidationError';

export class FileService {
    static async carregarJSON(caminho: string): Promise<any> {
        try {
            const response = await fetch(caminho);
            if (!response.ok) {
                throw ValidationError.createFileError(
                    'Falha ao carregar arquivo',
                    caminho
                );
            }
            const data = await response.json();
            if (!data || typeof data !== 'object') {
                throw ValidationError.createDataError(
                    'Formato de arquivo inválido',
                    caminho
                );
            }
            return data;
        } catch (error) {
            if (error instanceof ValidationError) throw error;
            throw ValidationError.createFileError(
                'Erro ao processar arquivo',
                caminho
            );
        }
    }

}