var params = {
    authorized: true || false,
    latencyMode: NORMAL | LOW,
    name: 'STRING_VALUE',
    recordingConfigurationArn: 'STRING_VALUE',
    tags: {
      '<TagKey>': 'STRING_VALUE',
      /* '<TagKey>': ... */
    },
    type: BASIC | STANDARD
  };
  ivs.createChannel(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });