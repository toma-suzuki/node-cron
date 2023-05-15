import cron from 'node-cron';

cron.schedule(`*/1 * * * *`, async () => {
  const date = new Date();
  const batchApiKey = process.env.BATCH_API_KEY ?? '';

  console.log(`[${date.toLocaleString()}] launch cron batch...`);

  await fetch('https://js-discordtaskbot.up.railway.app/remind-batch', {
    method: 'GET',
    headers: {
      key: batchApiKey,
    },
  })
    .then((res) => {
      if (res.status == 200) {
        console.log(`[${date.toLocaleString()}] success launch batch!!`);
      } else {
        console.log(`[${date.toLocaleString()}] failed launch batch...`);
      }
    })
    .catch((err) => {
      console.log(
        `[${date.toLocaleString()}] failed launch batch... error: `,
        err
      );
    });
});
