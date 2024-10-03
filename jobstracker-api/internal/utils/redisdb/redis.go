package redisdb

import "github.com/go-redis/redis"

var rdb *redis.Client

func Init(Address string, Password string, DB int) {
	rdb = redis.NewClient(&redis.Options{
		Addr:     "localhost:6379",       // Redis server address
		Password: "exampleRedisPassword", // Redis password
		DB:       0,                      // Use default DB
	})
}

func RedisClient() *redis.Client {
	return rdb
}

func Uninit() {
	rdb.Close()
}

// Addr:     "localhost:6379",       // Redis server address
// Password: "exampleRedisPassword", // Redis password
// DB:       0,
