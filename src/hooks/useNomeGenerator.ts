import { useState } from "react";
import { TextService } from "../backend/services/TextService";
import { ValidationService } from "../backend/services/ValidationService";
import { ValidationError } from "../backend/errors/ValidationError";
import { NamingConverter } from "../backend/models/NamingConverter";
import { Alerta, Estilo } from "../backend/config/generalParameters";

function formatarMensagemErro(error: unknown): string {
  if (error instanceof ValidationError) {
    return `${error.message}${
      error.details.length ? ": " + error.details.join(", ") : ""
    }`;
  }
  if (typeof error === "object" && error !== null && "message" in error) {
    return (error as { message: string }).message;
  }
  return String(error);
}

function gerarNomeLogica(
  descricao: string,
  estilo: Estilo,
  preposicoesArtigos: string[],
  abreviacoes: Record<string, string>
): string {
  ValidationService.validateInput(descricao);
  ValidationService.validateEstiloVazio(estilo);

  const textoLimpo = TextService.limparTexto(descricao.toLowerCase());
  const palavras = textoLimpo.split(/\s+/).filter(Boolean);

  const palavrasFiltradas = TextService.removerPreposicoes(
    palavras,
    preposicoesArtigos
  );
  ValidationService.validateAbreviacoes(palavrasFiltradas, abreviacoes);

  const palavrasAbreviadas = TextService.aplicarAbreviacoes(
    palavrasFiltradas,
    abreviacoes
  );
  const nome = NamingConverter.converterParaEstilo(
    palavrasAbreviadas,
    estilo 
  );

  ValidationService.validateNomeLength(nome);
  return nome;
}

interface UseNomeGeneratorResult {
  alerta: Alerta;
  gerarNome: (descricao: string, estilo: Estilo) => void;
  limpar: () => void;
  copiarSugestao: () => Promise<void>;
}

export function useNomeGenerator(
  preposicoesArtigos: string[],
  abreviacoes: Record<string, string>,
  estilo: Estilo
): UseNomeGeneratorResult {
  const [alerta, setAlerta] = useState<Alerta>({
    type: undefined,
    message: "",
  });

  function gerarNome(descricao: string, estilo: Estilo) {
    try {
      const nome = gerarNomeLogica(
        descricao,
        estilo,
        preposicoesArtigos,
        abreviacoes
      );
      setAlerta({ type: "success", message: nome });
    } catch (error) {
      setAlerta({ type: "error", message: formatarMensagemErro(error) });
    }
  }

  function limpar() {
    setAlerta({ type: undefined, message: "" });
  }

  async function copiarSugestao(): Promise<void> {
    if (alerta.type === "success" && alerta.message) {
      try {
        await navigator.clipboard.writeText(alerta.message);
        setAlerta({
          type: "success",
          message: `Sugestão ${alerta.message} copiada para a área de transferência.`,
        });
      } catch (err) {
        setAlerta({
          type: "error",
          message: "Erro ao copiar sugestão para a área de transferência.",
        });
      }
    }
  }

  return { alerta, gerarNome, limpar, copiarSugestao };
}
