# :rocket: Requester

Consume messages (Request) from RabbitMQ, execute requests and put the response in other queue.

## Install

```bash
$ brew install node
$ npm install pm2 -g
$ brew install yarn
$ npm install eslint eslint-config-airbnb --global
```

## Configuration

All configuration is ready in `config/config.js` file. This config file use environment variables loaded by pm2 using file `dev_ecosystem.config.js` (see section `Process management PM2`)

*Note: In production these environment variables will be already loaded in production machines*

Example:

```javascript
module.exports = {
    "rabbitConnection": {
        "port": process.env.RABBITMQ_PORT,
        "host": process.env.RABBITMQ_HOST,
        "vhost": process.env.RABBITMQ_VHOST,
        "login": process.env.RABBITMQ_USER,
        "password": process.env.RABBITMQ_PASSWORD,
        "noDelay": true,
        "connectionTimeout": 10000,
        "heartbeat": 60
    },
    "statsdConnection": {
        "host": process.env.STATSD_HOST,
        "port": process.env.STATSD_PORT
    },
    "exchange": {
        "name": "exchange-name",
        "routingKeyIn": "rounting-name",
        "routingKeyOut": "routing-name",
        "options": {
            "type" : "topic",
            "passive": false,
            "durable": false,
            "autoDelete": false
        }
    },
    "publisher": {
        "options": {
            "contentType": "text/plain"
        }
    },
    "originQueue": {
        "name": "queue-name",
        "options": {
            "passive": true,
            "durable": false,
            "exclusive": false,
            "autoDelete": false,
            "closeChannelOnUnsubscribe": false
        }
    }
}

```

## Code Style Code Style airbnb

See https://github.com/airbnb/javascript

Setup airbnb in webstorm/phpstorm:

https://www.themarketingtechnologist.co/eslint-with-airbnb-javascript-style-guide-in-webstorm/

## Check possible bugs in your dependencies

```bash
npm run-script checkDependencies
```

## Start application

```bash
$ yarn install
$ npm start # Alias: pm2 start pm/dev_ecosystem.config.js (see packaje.json)
```

## Execute tests

```bash
npm test
```

## Commands overview

Examples environment `dev` (similar to environment `prod`)

```bash
# Install dependencies:
$ yarn install

# Execute tests
$ npm test

# Run cluster in environment dev:
$ pm2 start pm/dev_ecosystem.config.js

# Status cluster
$ pm2 status

# Kill workers cluster
$ pm2 kill

# Check bugs in the dependencies
$ npm run-script checkDependencies

# ...

```

## Process management PM2

```bash
$ npm install pm2 -g            # Install PM2 (see Install section)
```

### More about PM2

- [Application Declaration via JS files](http://pm2.keymetrics.io/docs/usage/application-declaration/)
- [Watch & Restart](http://pm2.keymetrics.io/docs/usage/watch-and-restart/)
- [PM2 API](http://pm2.keymetrics.io/docs/usage/pm2-api/)
- [Deployment workflow](http://pm2.keymetrics.io/docs/usage/deployment/)
- [PM2 on Heroku/Azure/App Engine](http://pm2.keymetrics.io/docs/usage/use-pm2-with-cloud-providers/)
- [PM2 auto completion](http://pm2.keymetrics.io/docs/usage/auto-completion/)
- [Using PM2 in ElasticBeanStalk](http://pm2.keymetrics.io/docs/tutorials/use-pm2-with-aws-elastic-beanstalk/)
- [PM2 Tutorial Series](https://futurestud.io/tutorials/pm2-utility-overview-installation)

## PERFORMANCE RABBITMQ

- The number of consumers that can consume the message is too low (I assume you use a pool of consumers)
- The network is too slow
- The queues and messages are replicated between too many nodes of Rabbit MQ and go do disk (its possible to use rabbit mq like this)
- The consumer can't really handle a message and it gets constantly re-queued

## CHANGELOG

[CHANGELOG](CHANGELOG.md)
