import amqp from "amqplib";
import fs from "fs";

const RABBITMQ_URL = process.env.RABBITMQ_URL || "amqp://rabbitmq";
const QUEUE = "claims";
const LOG_FILE = "claims_log.txt";

async function receiveClaims() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();
  await channel.assertQueue(QUEUE);

  console.log("📥 Waiting for claims...");

  channel.consume(QUEUE, msg => {
    if (msg !== null) {
      const claim = JSON.parse(msg.content.toString());
      const logEntry = `Received Claim: ${JSON.stringify(claim)}\n`;

      // Append to file
      fs.appendFile(LOG_FILE, logEntry, err => {
        if (err) {
          console.error("❌ Error writing to file:", err);
        } else {
          console.log("✅ Claim saved to file.");
        }
      });

      console.log("✅ Claim received and under review:", claim);
      channel.ack(msg);
    }
  });
}

receiveClaims().catch(console.error);
