const { config } = require("aws-sdk");
const AmazonDaxClient = require("amazon-dax-client");

const region = "eu-west-1";

config.update({ region });
const dax = new AmazonDaxClient({
  endpoints: [
    "dax-notes-app.8ki7mk.clustercfg.dax.euw1.cache.amazonaws.com:8111",
  ],
  region,
});

exports.handler = (event, context, callback) => {
  dax.getItem(
    {
      TableName: "td_notes_test",
      Key: {
        user_id: {
          S: event.user_id.toString(),
        },
        timestamp: {
          N: event.timestamp.toString(),
        },
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
