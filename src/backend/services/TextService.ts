export class TextService {
    static limparTexto(texto: string) {
        return texto
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/[^a-zA-Z0-9 ]/g, "");
    }

    static removerPreposicoes(palavras: string[], preposicoes: string[]) {
        return palavras.filter(p => !preposicoes.includes(p));
    }

    static aplicarAbreviacoes(palavras: string[], abreviacoes: Record<string, string>) {
        return palavras.map(p => abreviacoes[p] || p);
    }
}