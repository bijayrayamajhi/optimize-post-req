import kafkaConfig from "./config/kafka.config.js";

export const init = async () => {
  try {
    await kafkaConfig.connect();
    await kafkaConfig.createTopic("post");
  } catch (error) {
    console.log("Error initializing kafka: ", error);
    process.exit(1);
  }
};
