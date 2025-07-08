import React, { useState, useEffect } from 'react';
import { Estilo, generalParameters } from './backend/config/generalParameters';
import { useConfigData } from './hooks/useConfigData';
import { StatusType } from './backend/config/generalParameters';
import LftHeaderBase from '@lift/design-system-react-web/dist/components/LftHeaderBase';
import LftButton from '@lift/design-system-react-web/dist/components/LftButton';
import LftInputTextArea from '@lift/design-system-react-web/dist/components/LftInputTextArea';
import LftTypography from '@lift/design-system-react-web/dist/components/LftTypography';
import LftInputSelect from '@lift/design-system-react-web/dist/components/LftInputSelect';
import LftListMenuItem from '@lift/design-system-react-web/dist/components/LftListMenuItem';
import { Box, Clipboard } from '@lift/assets/dist/assets/globals/icons';
import LftDivider from '@lift/design-system-react-web/dist/components/LftDivider';
import LftAlert from '@lift/design-system-react-web/dist/components/LftAlert';
import styled from '@emotion/styled';
import { useNomeGenerator } from './hooks/useNomeGenerator';


export const HomeWrapper = styled.div`
  background-color: ${({ theme }) => theme.BackgroundColorPublic01High}};
`;

function App() {

  const [descricao, setDescricao] = useState('');
  const [estilo, setEstilo] = useState<Estilo>(generalParameters.estiloPadrao);
  const { preposicoesArtigos, abreviacoes, erro } = useConfigData();
  
  const { alerta, gerarNome, limpar, copiarSugestao } = useNomeGenerator(
    preposicoesArtigos,
    abreviacoes,
    estilo
  );

  useEffect(() => {
    
  }, [erro]);

  function handleDescricaoChange(e: any) {
    setDescricao(e);
  }

  function handleEstiloChange(e: any) {
    setEstilo(e.value as Estilo);
  }

  return (
      <div className="App">
        <HomeWrapper id='home-wrapper'>

          <LftHeaderBase id="header" hiddenMenuButton={true}></LftHeaderBase>
          
          <LftTypography id="title" variant="h1" component="title" size="medium" >Dicionário de Dados</LftTypography>
                   
          <LftInputTextArea
            label='Descrição'
            lftChange={handleDescricaoChange}
            value={descricao}
            placeholder='Ex: relatório financeiro do departamento de tecnologia'
            maxLength={150}
            rows={3}
            id='descricao-input'
          />

          <LftInputSelect
            label="Estilo de nomenclatura"
            lftChange={handleEstiloChange}
            value={estilo}
            disabled={generalParameters.desabilitarEstilo}
            id="estilo-select"
          >
            <LftListMenuItem id="camelCase" value="camelCase">camelCase</LftListMenuItem>
            <LftListMenuItem id="PascalCase" value="PascalCase">PascalCase</LftListMenuItem>
            <LftListMenuItem id="snake_case" value="snake_case">snake_case</LftListMenuItem>
            <LftListMenuItem id="kebab-case" value="kebab-case">kebab-case</LftListMenuItem>
            <LftListMenuItem id="UPPER_SNAKE_CASE" value="UPPER_SNAKE_CASE">UPPER_SNAKE_CASE</LftListMenuItem>
            <LftListMenuItem id="dot.case" value="dot.case">dot.case</LftListMenuItem>
          </LftInputSelect>

          <LftDivider />
          
          <div id="area-buttons" style={{ display: 'inline-block' }}>
            <LftButton
              id="limpar-button"
              style={{ display: 'inline-block' }} 
              type="button"
              icon={Clipboard}
              actionLevel="tertiary"
              fullWidth={false}
              size="sm"
              tabIndex={0}
              lftClick={() => {
                setDescricao('');
                limpar();
              }}>
                Limpar
            </LftButton>

            <LftButton 
              id="gerar-nome-button"
              style={{ display: 'inline-block' }} 
              type="button"
              icon={Box}
              actionLevel="tertiary"
              size="sm"
              tabIndex={1}
              lftClick={() => gerarNome(descricao, estilo)}>
                Gerar Nome
            </LftButton>

            <LftButton 
              id="copiar-sugestao-button"
              style={{ display: 'inline-block' }} 
              type="button"
              icon={Clipboard}
              actionLevel="tertiary"
              size="sm"
              tabIndex={2}
              lftClick={() => copiarSugestao()}>
                Copiar Sugestão
            </LftButton>
          </div>
          
          <LftDivider />
          
          <div id="alerta" >
            {alerta.message! && (
              <LftAlert closeButton={false} message={alerta.message} status={alerta.type as StatusType}/>
            )}
          </div>

          <LftDivider />
          
        </HomeWrapper>
      </div>
  );
}

export default App;
