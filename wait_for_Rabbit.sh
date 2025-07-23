#!/bin/sh
# wait-for-rabbit.sh

echo "Waiting for RabbitMQ to be ready..."

until nc -z rabbitmq 5672; do
  sleep 1
done

echo "RabbitMQ is ready. Starting service..."
exec "$@"
