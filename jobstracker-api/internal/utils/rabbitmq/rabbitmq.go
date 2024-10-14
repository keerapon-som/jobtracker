package rabbitmq

import (
	"sync"

	"github.com/streadway/amqp"
)

type RabbitMQ interface {
	Connect() *amqp.Connection
}

func NewRabbitMQ() RabbitMQ {
	return &rabbitmq{}
}

type rabbitmq struct {
}

var (
	conn *amqp.Connection
	once sync.Once
	err  error
)

func Init(url string) {
	once.Do(func() {
		conn, err = amqp.Dial(url)
		if err != nil {
			panic(err)
		}
	})
}

func Close() {
	conn.Close()
}

func (r *rabbitmq) Connect() *amqp.Connection {
	return conn
}
