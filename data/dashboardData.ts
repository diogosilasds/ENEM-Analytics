// Este arquivo agora atua como um agregador (Composition Root) para a camada de dados.
// Ele re-exporta os dados dos módulos individuais para manter a compatibilidade com o serviço.

export { criarTemplateVazio } from './utils';
export { historicoHumanas, metadataHumanas } from './modules/humanas';
export { historicoLinguagens, metadataLinguagens } from './modules/linguagens';
export { historicoMatematica, metadataMatematica } from './modules/matematica';
export { historicoNatureza, metadataNatureza } from './modules/natureza';
export { historicoRedacao, metadataRedacao } from './modules/redacao';