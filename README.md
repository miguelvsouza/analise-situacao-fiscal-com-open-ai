# Análise do Relatório de Situação Fiscal - Integração eCAC + OpenAI

Este projeto foi criado para realizar a análise automatizada do relatório de situação fiscal do eCAC, utilizando a **API Integra Contador** (disponibilizada pela Receita Federal através do Serpro). Após a obtenção dos dados, eles são enviados para a OpenAI, que processa as informações e retorna uma visão macro dos pontos mais relevantes, facilitando o acompanhamento e tomada de decisão.

## Motivação

A necessidade surgiu da demanda interna do projeto em que atuo, que busca uma solução para obter e analisar a constantemente a situação fiscal das empresas dos clientes de forma rápida e organizada.

## Tecnologias Utilizadas

- **Node.js**: Plataforma principal para desenvolvimento backend.
- **TypeScript**: Tipagem estática para maior segurança e organização do código.
- **OpenAI SDK**: Integração com os modelos de IA da OpenAI para análise dos relatórios.
- **API Integra Contador**: Serviço disponibilizado pelo Serpro para comunicação com o sistema eCAC.

## Funcionalidades

1. **Obtenção do Relatório Fiscal**:

   - Conexão com a API Integra Contador para buscar os relatórios fiscais diretamente do sistema eCAC.

2. **Análise Automática**:
   - Envio do relatório fiscal para a OpenAI, que processa as informações e retorna de forma estruturada informações sobre as pendências da empresa analisada.

E por aqui não vou escrever mais nada huahsuhsa
