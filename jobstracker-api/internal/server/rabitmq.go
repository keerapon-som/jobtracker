package server

import (
	"fmt"
	"jobtrackker/internal/utils/rabbitmq"
	"time"

	"github.com/streadway/amqp"
)

type rabbitmqserver struct {
	ch *amqp.Channel
}

type RabbitMQServer interface {
	OpenChannal()
	CloseChannal()
	Publish(name string, body string)
	Consume(name string, receiveCh chan string)
	ConsumeTillNoMessage(name string)
}

func NewRabbitMQServer() RabbitMQServer {
	return &rabbitmqserver{
		ch: nil,
	}
}

func (r *rabbitmqserver) OpenChannal() {
	rb := rabbitmq.NewRabbitMQ()
	var err error
	r.ch, err = rb.Connect().Channel()
	if err != nil {
		panic(err)
	}
}

func (r *rabbitmqserver) CloseChannal() {
	r.ch.Close()
}

func (r *rabbitmqserver) Publish(name string, body string) {
	q, err := r.ch.QueueDeclare(
		name,
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		fmt.Println(err)
	}
	err = r.ch.Publish(
		"",
		q.Name,
		false,
		false,
		amqp.Publishing{
			ContentType: "text/plain",
			Body:        []byte(body),
		},
	)
	if err != nil {
		fmt.Println(err)
	}
}

func (r *rabbitmqserver) Consume(name string, receiveCh chan string) {
	q, err := r.ch.QueueDeclare(
		name,
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		fmt.Println(err)
	}
	msgs, err := r.ch.Consume(
		q.Name,
		"",
		false, // autoAck is now false
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		fmt.Println(err)
	}

	for d := range msgs {
		if len(receiveCh) == cap(receiveCh) {
			fmt.Println("Channel is full, just pause until it's empty")

			// Wait until the channel is empty
			for len(receiveCh) == cap(receiveCh) {
				time.Sleep(1 * time.Second)
			}
		}
		receiveCh <- string(d.Body) // Blocking send
		fmt.Println("Received a message:------------ ", string(d.Body))
		// After successfully sending to the channel, acknowledge the message
		err := d.Ack(false) // Acknowledge this message
		if err != nil {
			fmt.Println("Error acknowledging message:", err)
		} else {
			fmt.Println("Message acknowledged: ", string(d.Body))
		}

		fmt.Println("Received a message: ", string(d.Body))
	}
}

func (r *rabbitmqserver) ConsumeTillNoMessage(name string) {
	q, err := r.ch.QueueDeclare(
		name,
		false,
		false,
		false,
		false,
		nil,
	)
	if err != nil {
		fmt.Println(err)
	}

	for {
		// Try to get a message
		msg, ok, err := r.ch.Get(q.Name, true) // true = auto-acknowledge
		if err != nil {
			fmt.Println(err)
		}

		if !ok {
			fmt.Println("No more messages in the queue.")
			break
		}

		// Print the message
		fmt.Printf("Received a message: %s\n", msg.Body)

		// Optional: Add a delay to simulate processing
		time.Sleep(500 * time.Millisecond)
	}

	fmt.Println(" [x] Finished consuming all available messages.")

}
