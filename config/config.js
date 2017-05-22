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
        "routingKeyIn": "routing-name",
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
            "passive": true,  // boolean, default false. If set, the server will not create the queue. The client can use this to check whether a queue exists without modifying the server state.
            "durable": false, // boolean, default false. Durable queues remain active when a server restarts. Non-durable queues (transient queues) are purged if/when a server restarts. Note that durable queues do not necessarily hold persistent messages, although it does not make sense to send persistent messages to a transient queue.
            "exclusive": false, // boolean, default false. Exclusive queues may only be consumed from by the current connection. Setting the 'exclusive' flag always implies 'autoDelete'.
            "autoDelete": false, // boolean, default true. If set, the queue is deleted when all consumers have finished using it. Last consumer can be cancelled either explicitly or because its channel is closed. If there was no consumer ever on the queue, it won't be deleted.
            "closeChannelOnUnsubscribe": false //  a boolean when true the channel will close on unsubscribe, default false.
        }
    }
}
