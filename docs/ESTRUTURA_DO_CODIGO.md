# Estrutura do código do EcoCatalão

Guia para apresentação acadêmica e estudo da versão 2.1.0, preparado em 2 de outubro de 2026.

## Tecnologias

A linguagem principal é TypeScript. React Native constrói as interfaces, Expo fornece a base de execução e integrações com o aparelho, e Expo Router organiza a navegação. Arquivos `.tsx` incluem interfaces; arquivos `.ts` incluem contratos, dados e regras.

## Pastas do projeto

| Pasta | Responsabilidade |
| --- | --- |
| `src/app` | Telas e navegação das quatro áreas: Comunidade do Catalão, Registro de Resíduo, Pontos de Coleta e Reciclagem |
| `src/components` | Componentes reutilizáveis, fotos, mapas e ilustrações |
| `src/data` | Catálogos de materiais, conteúdos educativos e pontos demonstrativos |
| `src/types` | Contratos que definem a estrutura dos dados |
| `src/services` | Validação e operações dos registros |
| `src/context` | Histórico e operações compartilhados entre as telas |
| `src/storage` | Persistência de registros e fotos por plataforma |
| `src/hooks` | Lógica de localização e permissões |
| `src/constants` | Cores e padrões visuais |
| `assets` | Recursos visuais |
| `tests` | Testes das regras e operações |
| `docs` | Escopo, evidências e pendências de validação |
| `ecocatalao-admin` | Protótipo web administrativo separado, com armazenamento local |

`node_modules` contém dependências instaladas. `.expo` contém dados locais do Expo. `dist` e `dist-v2` são exportações geradas. Essas pastas não são o ponto de partida para estudar o código original.

## Caminho de um registro

1. `src/app/(tabs)/registro.tsx` recebe material, quantidade e/ou peso e foto opcional.
2. `src/context/AppContext.tsx` coordena a operação e o estado compartilhado.
3. `src/services/registrationRepository.ts` coordena gravação, edição, exclusão e tratamento de fotos.
4. `src/services/registrationService.ts` valida e constrói o registro.
5. `src/storage` guarda os dados: SQLite e arquivos no celular; IndexedDB no navegador.
6. Após a gravação, o estado atualiza a interface e apresenta a confirmação.

O registro tem identificador único, material, quantidade e/ou peso, foto opcional, data, situação Aguardando entrega e CATS nulo. A edição preserva identificação e data original. O histórico permite filtros e exclusão confirmada.

## Ordem sugerida de estudo

1. [Visão geral](../README.md).
2. [Navegação](../src/app/(tabs)/_layout.tsx).
3. [Tela inicial](../src/app/(tabs)/index.tsx).
4. [Catálogo de materiais](../src/data/materials.ts).
5. [Contrato do registro](../src/types/registration.ts).
6. [Regras de validação](../src/services/registrationService.ts).
7. [Formulário e histórico](../src/app/(tabs)/registro.tsx).
8. [Estado compartilhado](../src/context/AppContext.tsx).
9. [Repositório](../src/services/registrationRepository.ts) e adaptadores em `src/storage`.
10. [Testes do registro](../tests/registration.test.ts).

## Limites e próximas etapas

O registro é manual; nenhuma rede neural está integrada. A futura classificação deverá sugerir o material e permitir confirmação ou correção pelo morador. Ainda será necessário definir classes, reunir imagens autorizadas, treinar, avaliar e integrar o modelo.

Os pontos são demonstrativos, CATS não é calculado e não há entrega confirmada, login, servidor, backup ou sincronização. O painel administrativo não atualiza o aplicativo móvel.

O [relatório de validação da versão 2.1](VALIDACAO_V2_1.md) registra evidências web e verificações técnicas de 30 de setembro e 1º de outubro. Exportar Android e iOS não equivale a testar em aparelho. Câmera, GPS, SQLite, arquivos e uso offline nativo exigem validação física, seguida de testes com moradores.

Este commit registra uma etapa de desenvolvimento e sua estrutura para revisão acadêmica; não representa aprovação integral para operação comunitária.

## Verificação deste checkpoint

Em 2 de outubro de 2026, passaram a tipagem e a análise de código do aplicativo, seus 15 testes automatizados, a tipagem do painel e os 37 testes do painel. A execução dos testes do painel precisou ocorrer fora da restrição de leitura do ambiente, que impediu o carregamento inicial da configuração.

Não foram repetidas nesta etapa a exportação, a verificação de compatibilidade Expo ou a avaliação visual. As pendências de dependências e testes físicos descritas no relatório da versão 2.1 continuam sem confirmação de resolução.
