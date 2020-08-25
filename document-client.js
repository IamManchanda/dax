const { config, DynamoDB } = require("aws-sdk");
const AmazonDaxClient = require("amazon-dax-client");

const region = "eu-west-1";

config.update({ region });
const dax = new AmazonDaxClient({
  endpoints: [
    "dax-notes-app.8ki7mk.clustercfg.dax.euw1.cache.amazonaws.com:8111",
  ],
  region,
});
const documentClient = new DynamoDB.DocumentClient({
  service: dax,
});

exports.handler = (event, context, callback) => {
  documentClient.get(
    {
      TableName: "td_notes_test",
      Key: {
        user_id: event.user_id,
        timestamp: parseInt(event.timestamp),
      },
    },
    (err, data) => {
      if (err) {
        callback(err);
      } else {
        callback(null, data);
      }
    },
  );
};
