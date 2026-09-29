# Validação da primeira versão

Executada em 22/09/2026 no Windows, Node 24.16.0 e npm 11.13.0.

## Verificações automatizadas

- TypeScript e ESLint aprovados.
- Quatro testes de domínio aprovados: entradas inválidas, unidades/taxas, independência dos saldos e correção da classificação.
- `expo install --check`: sem divergências.
- Expo Doctor: 21/21 verificações aprovadas.
- Bundles Android/iOS (Hermes) e web gerados; rotas reconhecidas pelo Router.
- Metro iniciou em `http://localhost:8081`. O ambiente restrito impediu o download opcional de React Native DevTools; a CLI usou uma versão alternativa e o app carregou normalmente.

## Testes pela interface web

- Navegação inferior conferida com as cinco áreas: Início, Aprender, Pontos, Carteira e Câmera.
- Home → câmera → ilustração → preview → análise → resultado.
- Lata de alumínio com confiança identificada como simulada.
- Confirmação, quantidade de 50 unidades e estimativa de 20 CATS conferidas.
- Salvamento abriu a carteira com aviso de sucesso e elevou os estimados de 8 para 28 CATS, mantendo 20 confirmados.
- Correção para papelão atualizou resultado e unidade para kg.
- Quantidade negativa bloqueada, com registro desabilitado.
- 4,5 kg resultaram em 9 CATS; carteira passou de 8 para 17 estimados, mantendo 20 confirmados.
- Registro manual de 50 latas adicionou mais 20 estimados; fração de unidade rejeitada.
- Página educativa sobre o rio abriu e retornou à área Aprender.
- Segundo ponto de coleta atualizou endereço, horário e materiais.
- Tela Pontos reuniu apresentação comunitária, quatro temas do território, mapa esquemático e lista de coleta.
- Inspeção visual em 390 px; conferência adicional em 320 px.

## Limites

O responsável pelo projeto confirmou a abertura e visualização do protótipo no celular após entrar na conta no computador e no aparelho. O agente não teve acesso direto a aparelho físico ou simulador nativo. Não foram validados em hardware: permissão e captura da câmera, retorno dos ajustes, teclado, VoiceOver/TalkBack ou renderização nativa do mapa. Bundling não equivale a teste em aparelho.

Antes da apresentação, em Expo Go compatível com SDK 57:

1. Permitir/negar câmera e conferir o fallback.
2. Capturar, refazer, analisar, corrigir e registrar; conferir limpeza do cache.
3. Alternar abas e colocar o app em segundo plano; câmera deve parar quando inativa.
4. Informar kg com vírgula e unidades inteiras; conferir saldos separados.
5. Abrir o mapa nativo e retornar ao esquema offline.
6. Conferir fonte ampliada e leitor de tela.

A abertura no celular foi confirmada pelo responsável; a distribuição exata do cliente utilizado não foi informada. Preserve o ambiente que funcionou. Para outros aparelhos, o README orienta como verificar a compatibilidade com SDK 57.
