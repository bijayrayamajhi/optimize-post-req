import { connectDb } from "./config/db.config.js";
import kafkaConfig from "./config/kafka.config.js";
import { postConsumer } from "./post-consumer.js";

export const init = async () => {
  try {
    await kafkaConfig.connect();
    await connectDb();
    await postConsumer();
  } catch (error) {
    console.log("Error initializing services: ", error);
    process.exit(1);
  }
};
