from confluent_kafka import Producer
import uuid
import json
producer_config={'bootstrap.servers':'localhost:9092'}
producer=Producer(producer_config)

def delivery_report(err,msg):
    if err:
        print(f"delivery failed:{err}")
    else:
        print(f"delivery success: {msg.value().decode('utf-8')}")
        print(f"topic:{msg.topic()} partition:{msg.partition()} offset:{msg.offset()}")

order={
    "order_id":str(uuid.uuid4()),
    "user":"vishal kamath",
    "item":"hp laptop",
    "quantity":3
}

value=json.dumps(order).encode("utf-8")

# sending to kafka
producer.produce(topic="orders",value=value,callback=delivery_report)
producer.flush()