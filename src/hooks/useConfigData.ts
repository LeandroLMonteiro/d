import { useState, useEffect } from "react";
import { FileService } from "../backend/services/FileService";
import { FILE_PATHS } from "../backend/config/paths";
import { Alerta } from "../backend/config/generalParameters";

export function useConfigData() {
  const [preposicoesArtigos, setPreposicoesArtigos] = useState([]);
  const [abreviacoes, setAbreviacoes] = useState({});
  const [erro, setErro] = useState<Alerta>({ type: undefined, message: "" });

  useEffect(() => {
    async function carregarDados() {
      try {
        const [preposicoes, abreviacoes] = await Promise.all([
          FileService.carregarJSON(FILE_PATHS.PREPOSICOES),
          FileService.carregarJSON(FILE_PATHS.ABREVIACOES),
        ]);
        setPreposicoesArtigos(preposicoes.conteudo);
        setAbreviacoes(abreviacoes.conteudo);
      } catch {
        setErro({
          type: "error",
          message: "Erro ao carregar arquivos de configuração",
        });
      }
    }
    carregarDados();
  }, []);

  return { preposicoesArtigos, abreviacoes, erro };
}
