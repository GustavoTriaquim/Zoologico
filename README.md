# Zoológico

Este repositório contém uma aplicação voltada à gestão de um zoológico, incluindo organização de animais, recintos e demais elementos relacionados. O projeto é composto por um front-end em React e uma API no back-end responsável por fornecer os dados ao sistema.

O foco deste documento é destacar **as principais dificuldades encontradas durante o desenvolvimento**, com ênfase na implementação da **API REST**, estruturação das rotas e comunicação entre front-end e back-end.

---

## 🎯 Objetivo do Projeto

Construir um sistema simples para simular a administração de um zoológico, permitindo o cadastro e exibição de informações sobre animais, espécies e outras entidades.

A ideia principal foi aplicar conceitos de:

* Estruturação de API REST
* Manipulação de dados
* Consumo de API no front-end
* Organização de projeto full-stack

---

## 💡 Principais Dificuldades Enfrentadas

### 1. Criar a API REST do zero

A maior dificuldade do projeto foi implementar corretamente a **API REST**, garantindo que as rotas fossem bem estruturadas e seguindo boas práticas como:

* Separação entre rotas, controllers e serviços
* Utilização adequada de métodos HTTP (`GET`, `POST`, `PUT`, `DELETE`)
* Tratamento de erros e respostas padronizadas
* Organização dos dados trafegados

Houve um esforço significativo para entender como cada módulo deveria se comunicar e como manter a API escalável caso fosse necessário crescer o projeto.

---

### 2. Definir como os animais e entidades seriam estruturados

Por ser um projeto envolvendo animais, espécies e recintos, foi necessário decidir:

* Como organizar cada entidade
* Quais atributos cada uma teria
* Como o back-end iria armazenar e fornecer essas informações

Mesmo sem usar um banco de dados complexo, apenas modelar os objetos e deixá-los consistentes com a lógica do zoológico já exigiu bastante planejamento.

---

### 3. Garantir a comunicação correta do front-end com o back-end

Outro ponto desafiador foi fazer o front-end consumir corretamente os endpoints criados. Isso incluiu:

* Ajustar URLs e rotas do servidor
* Tratar as respostas da API
* Exibir corretamente os dados retornados
* Lidar com possíveis erros de requisição

Até detalhes simples, como lidar com listas vazias ou respostas mal formatadas, exigiram atenção.

---

### 4. Estruturar o back-end de forma clara e organizada

No início, o back-end estava confuso e com arquivos misturados. Aos poucos foi sendo reestruturado, separando:

* Arquivos de rotas
* Controllers
* Camada de lógica
* Utilidades e middlewares

Com isso, a API ficou mais fácil de entender e manter.

---

### 5. Aprender a lidar com requisições assíncronas

Como a comunicação entre front-end e back-end depende de *promises*, houve também uma curva de aprendizado para:

* Utilizar `async/await` de forma correta
* Tratar erros de rede
* Garantir que o front-end só renderizasse dados completos

---

## 📁 Estrutura Geral do Projeto

```
Zoologico/
├── backend/           # API REST criada para fornecer dados ao front-end
├── public/            # Arquivos públicos do front-end (React)
└── src/               # Aplicação React que consome a API
```

---

## 📌 Conclusão

Apesar de simples, o projeto foi extremamente útil para aprender:

* Como modelar uma API REST
* Como estruturar um back-end organizado
* Como consumir APIs em React
* Como lidar com conceitos essenciais de comunicação entre sistemas

Cada dificuldade encontrada contribuiu diretamente para a evolução do projeto e do entendimento sobre desenvolvimento full-stack.