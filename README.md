# Plurall Worker

< DESCRIÇÃO SUCINTA DA RESPONSABILIDADE DESTE WORKER >

## Pré requisitos

- Yarn > v1.x
- Git > v2.x
- Node JS >= v12.x, < v13.x

#### Desejável

- docker-compose

## Instalação

Clone e acesse o diretório do projeto

```bash
git clone <URL DO REPOSITÓRIO DO PROJETO>
cd <DIRETÓRIO DO PROJETO>
```

Instale as dependências utilizando `yarn`

```
yarn install
```

## Dependência externa

Este projeto vem pré configurado com ambiente Docker com os brokers de mensagem suportados

- [Apache Kafka](https://kafka.apache.org/)
- [RabbitMQ](https://www.rabbitmq.com/)
- [ElasticMQ (SQS)](https://github.com/softwaremill/elasticmq/)
- [ActiveMQ](https://activemq.apache.org/)

Para rodar localmente:
```
yarn start:brokers
```

> Recomendo o uso da aplicação [Conduktor](https://www.conduktor.io/) para interação com a fila de pub/sub do Kafka

> O RabbitMQ possui interface de gerenciamento [http://localhost:15672/](http://localhost:15672/). Username: `guest` / Password: `guest`

> O ElasticMQ possui interface para monitoramento [http://localhost:9325/](http://localhost:15672/)

> O ActiveMQ possui interface de gerenciamento [http://localhost:8161/](http://localhost:8161/).

## Executando o projeto no localhost

Crie uma cópia do arquivo modelo `.env.development` para `.env`.

Obs: após criar o `.env` altere as variáveis de ambiente que necessitar.

```bash
cp .env.development .env
```

Inicialize as instâncias dos brokers
```bash
yarn start:brokers
```

Em outra aba do terminal, execute o projeto
```bash
yarn start:dev
```

Após isto, você pode utilizar o Conduktor para realizar as requisições para o Kafka, acessar o administrador do RabbitMQ pela URL http://localhost:15672/ ou utilizar o administrador do ActiveMQ pela URL http://localhost:8161/

Para enviar mensagens para as filas do ElasticMQ, é possível utilizar o `aws-cli`:
```
aws --endpoint-url http://localhost:9324 sqs send-message --queue-url http://localhost:9324/plurall --message-body "Bota na fila Plurall!!!"
```
