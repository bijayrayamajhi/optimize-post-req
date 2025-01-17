import express, { Request, Response } from "express";
import kafkaConfig from "../config/kafka.config.js";

export const produceMessage = async (req: Request, res: Response) => {
  const { title, message } = req.body;
  try {
    await kafkaConfig.sendToTopic("post", JSON.stringify({ title, message }));
    return res.status(200).json({
      success: true,
      message: "post created successfully! ",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error producing message",
    });
  }
};
