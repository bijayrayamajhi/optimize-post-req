import kafkaConfig from "./config/kafka.config.js";
import Post from "./model/post.model.js";

export const postConsumer = async () => {
  const messages: any[] = [];
  let processing = false;

  const processMessages = async () => {
    if (messages.length > 0 && !processing) {
      console.log("hi from processMessages function");
      processing = true;
      const batchToProcess = [...messages];
      messages.length = 0;
      try {
        await Post.insertMany(batchToProcess, { ordered: false });
        console.log("bulk insertion completed: ");
      } catch (error) {
        console.log("Error in bulk insertion: ", error);
        messages.push(...batchToProcess); // reenter the messages to array so that it can be processed in upcomming process
      } finally {
        processing = false;
      }
    }
  };

  try {
    await kafkaConfig.subscribeTopic("post");
    await kafkaConfig.consume(async (message) => {
      messages.push(message);
      console.log("message received: ", message);

      //perform bulk insertion
      if (messages.length > 5) {
        console.log("i am here..");
        processMessages();
      }
    });
  } catch (error) {
    console.log("Error consuming messages: ", error);
  }
};
