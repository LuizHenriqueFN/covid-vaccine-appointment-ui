# covid-vaccine-appointment-ui
Este repositório contém o frontend do sistema de agendamento de vacina para COVID-19. Desenvolvido em Angular, permite que os usuários agendem suas vacinas, consultem os agendamentos existentes e recebam notificações sobre suas reservas.

_This repository contains the frontend of a COVID-19 vaccine appointment system. Developed in Angular, it allows users to schedule their vaccines, view existing appointments, and receive notifications about their bookings._

#### Descrição:

Diante do cenário atual, existe uma demanda gigante de pessoas para tomar a vacina
para o COVID-19. E com isso nossa cidade está precisando de um simples sistema para
realizar os agendamentos. O processo consiste na criação de um portal onde será
possível agendar pacientes para tomar a vacina, construir uma página para consulta dos
agendamentos feitos por dia e horário.

#### Regras de uso:

- O agendamento deve ser feito em uma página por um formulário.

- A disponibilidade das vagas são de 20 por dia.

- Cada horário só tem a disponibilidade de 2 agendamentos para o mesmo horário.

- Deve ser criada uma página para consultar os agendamentos.

- O resultado dos agendamentos deve ser agrupado por dia e hora do
agendamento.

- O intervalo de tempo entre um agendamento e outro é de 1 hora.

#### Regras de negócio:

- O paciente deve informar seu nome, data de nascimento e dia e horário para o
agendamento.

- Deverá ser checado se o formulário foi preenchido.

- Os dados do paciente/agendamentos devem ser armazenados em memória e
dentro de um BehaviorSubject.

- Exibir mensagem de agendamento criado com sucesso dentro de um
modal/popup, usando um service para controlar o estado do modal.

- Dentro da página para consultar os agendamentos deve ser possível visualizar a
listagem de agendamentos feitos e informar se o agendamento foi realizado ou
não, e qual a conclusão do atendimento (se foi realizado).

- Quando o usuário der F5 ou recarregar a página os dados não podem ser
perdidos, devem ser salvadas no localStorage.

- Criar um ícone de notificação que será responsável por mostrar a quantidade de
agendamentos do usuário e deverá ser atualizado sempre que um novo
agendamento for realizado.

#### Regras de Execução:

- Uso de observables no Angular.

- Utilizar DatePicker do Angular Material.

- Evitar any no typescript.

- Usar Pipe para tratamento de datas.

- Separar responsabilidades de Template, Componente e Services.

- Implementar componente de Loading nas chamadas a API.

- Banco de dados: SQL Server Express

- Versão dotnet core: 6

- Versão do angular: 17 ou 18

- As camadas do backend devem seguir o padrão adotado no treinamento:
 
1. WebApi:

     - Implementar os controllers que disponibilizam as APIs para o frontend.

     - Criar endpoints para criar, ler, atualizar e deletar (CRUD)
  
2. Business.Interface

     - Criar as interfaces de todos os serviços de negócios.
   
3. Business

     - Implementar as regras de negócio necessárias.
   
4. Entities:

     - Criar as entidades de negócio, bem como os DTOs e Models necessários para a aplicação.

5. Validators:

     - Criar as validações de negócio para garantir a integridade dos dados.

     - Utilizar o fluentvalidation ou realizar validações “manuais”.
   
6. Repository.Interface

     - Criar as interfaces de todos os repositórios.
   
7. Repository

     - Mapear as entidades para o banco de dados utilizando Entity Framework.

     - Implementar os repositórios e suas consultas.
   
     - Não utilizar migrations.
   
8. Implementação de testes unitários em sua respectiva camada:

     - UnitTest: Utilizar a classe Moq para abstrair os retornos dos repositórios.

---
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.