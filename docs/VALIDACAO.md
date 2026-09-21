# Validação da primeira versão

Executada em 21/09/2026 no Windows, Node 24.16.0 e npm 11.13.0.

## Verificações automatizadas

- TypeScript e ESLint aprovados.
- Quatro testes de domínio aprovados: entradas inválidas, unidades/taxas, independência dos saldos e correção da classificação.
- `expo install --check`: sem divergências.
- Expo Doctor: 21/21 verificações aprovadas.
- Bundles Android/iOS (Hermes) e web gerados; rotas reconhecidas pelo Router.
- Metro iniciou em `http://localhost:8081`. O ambiente restrito impediu o download opcional de React Native DevTools; a CLI usou uma versão alternativa e o app carregou normalmente.

## Testes pela interface web

- Home → câmera → ilustração → preview → análise → resultado.
- Lata de alumínio com confiança identificada como simulada.
- Correção para papelão atualizou resultado e unidade para kg.
- Quantidade negativa bloqueada, com registro desabilitado.
- 4,5 kg resultaram em 9 CATS; carteira passou de 8 para 17 estimados, mantendo 20 confirmados.
- Registro manual de 50 latas adicionou mais 20 estimados; fração de unidade rejeitada.
- Página educativa sobre o rio abriu e retornou à área Aprender.
- Segundo ponto de coleta atualizou endereço, horário e materiais.
- Inspeção visual em 390 px; conferência adicional em 320 px.

## Limites

Não houve acesso a aparelho físico ou simulador nativo. Não foram validados em hardware: permissão e captura da câmera, retorno dos ajustes, teclado, VoiceOver/TalkBack ou renderização nativa do mapa. Bundling não equivale a teste em aparelho.

Antes da apresentação, em Expo Go compatível com SDK 57:

1. Permitir/negar câmera e conferir o fallback.
2. Capturar, refazer, analisar, corrigir e registrar; conferir limpeza do cache.
3. Alternar abas e colocar o app em segundo plano; câmera deve parar quando inativa.
4. Informar kg com vírgula e unidades inteiras; conferir saldos separados.
5. Abrir o mapa nativo e retornar ao esquema offline.
6. Conferir fonte ampliada e leitor de tela.

O Expo Go comum da App Store limitado ao SDK 54 não abre este projeto SDK 57. O README descreve a instalação compatível e a apresentação web.
