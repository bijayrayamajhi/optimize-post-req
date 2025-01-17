import { Kafka, Consumer, logLevel } from "kafkajs";

class kafkaConfig {
  private kafka: Kafka;
  private consumer: Consumer;
  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS || "192.168.16.147:9092";
    this.kafka = new Kafka({
      clientId: "post-consumer",
      brokers: [this.brokers],
      logLevel: logLevel.ERROR,
    });
    this.consumer = this.kafka.consumer({
      groupId: "post-consumer",
    });
  }

  async connect(): Promise<void> {
    try {
      await this.consumer.connect();
      console.log("Kafka connected");
    } catch (error) {
      console.log("Error connecting kafka: ", error);
    }
  }

  async subscribeTopic(topic: string): Promise<void> {
    try {
      await this.consumer.subscribe({
        topic,
        fromBeginning: true,
      });
      console.log("Subscribed to the topic: ", topic);
    } catch (error) {
      console.log(`Error subscribing to topic: ${topic}`, error);
    }
  }

  async consume(callback: (message: any) => void): Promise<void> {
    try {
      await this.consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          console.log("Message received: ", {
            topic,
            partition,
            value: message?.value?.toString(),
          });
          callback(JSON.parse(message?.value?.toString()));
        },
      });
    } catch (error) {
      console.log("Error consuming messages: ", error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.consumer.disconnect();
      console.log("Kafka disconnected");
    } catch (error) {
      console.log("Error disconnecting kafka: ", error);
    }
  }
}

export default new kafkaConfig();
