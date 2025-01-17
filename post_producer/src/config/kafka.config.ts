import { Kafka, Admin, logLevel, Producer } from "kafkajs";

class KafkaConfig {
  private kafka: Kafka;
  private admin: Admin;
  private producer: Producer;
  private brokers: string;

  constructor() {
    this.brokers = process.env.KAFKA_BROKERS || "192.168.16.147:9092";
    this.kafka = new Kafka({
      clientId: "post-producer",
      brokers: [this.brokers],
      logLevel: logLevel.ERROR,
    });
    this.producer = this.kafka.producer(); // Corrected this line
    this.admin = this.kafka.admin();
  }

  async connect(): Promise<void> {
    try {
      await this.producer.connect();
      await this.admin.connect();
      console.log("kafka connected");
    } catch (error) {
      console.log("Error connecting to kafka: ", error);
    }
  }

  async createTopic(topic: string): Promise<void> {
    try {
      const topicExists = await this.admin.listTopics();
      if (!topicExists.includes(topic)) {
        await this.admin.createTopics({
          topics: [{ topic, numPartitions: 1 }],
        });
        console.log("topic created: ", topic);
      } else {
        console.log("topic already created: ", topic);
      }
    } catch (error) {
      console.log("Error creating topic: ", error);
    }
  }

  async sendToTopic(topic: string, message: string): Promise<void> {
    try {
      await this.producer.send({
        topic,
        messages: [{ value: message }],
      });
      console.log("message sent to topic: ", topic);
    } catch (error) {
      console.log("Error sending message to topic: ", error);
    }
  }

  async disconnect(): Promise<void> {
    try {
      await this.producer.disconnect();
      await this.admin.disconnect();
      console.log("kafka disconnected ");
    } catch (error) {
      console.log("Error disconnecting kafka: ", error);
    }
  }
}

export default new KafkaConfig();
