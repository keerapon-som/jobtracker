package server

import (
	"fmt"
	"jobtrackker/internal/config"
	"jobtrackker/internal/utils/rabbitmq"
	"testing"
	"time"
)

var receiveCh = make(chan string, 1)

func Test_rabbitmqserver_OpenChannal(t *testing.T) {
	config := config.GetConfig()
	rabbitmq.Init(config.RabbitMQ.URL)

	defer rabbitmq.Close()

	ch := NewRabbitMQServer()
	ch.OpenChannal()
	go func() {
		for {
			ch.Publish("zzz", "testxxxx")
			fmt.Println("Publish message")
			time.Sleep(1000 * time.Millisecond)
		}
	}()
	defer ch.CloseChannal()

	go ch.Consume("zzz", receiveCh)
	for msg := range receiveCh {
		fmt.Println("Done process for message : ", msg)
		time.Sleep(2 * time.Second)
	}

	// ch.ConsumeTillNoMessage("test")
}
