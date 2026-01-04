import axios from 'axios';

const webhookUrl = 'https://hcn05z5qxdfm.feishu.cn/base/workflow/webhook/event/MV5BaC4RDw8OKmhEG2CcRjz2nGf';

const testPayload = {
  type: 'incoming',
  address: 'TJYeasTPa6gpEEfYYN4WnLLCwfPGdPq1je',
  from: 'TN3W4H6rK2ce4vX9YnFQHwKENnHjoxb3m9',
  to: 'TJYeasTPa6gpEEfYYN4WnLLCwfPGdPq1je',
  amount: '100.000000',
  txHash: 'test_' + Date.now(),
  timestamp: Date.now(),
  blockNumber: 12345678,
};

async function test() {
  console.log('Sending test webhook to:', webhookUrl);
  console.log('Payload:', JSON.stringify(testPayload, null, 2));

  try {
    const response = await axios.post(webhookUrl, testPayload, {
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Source': 'tron-usdt-monitor',
      },
    });

    console.log('\nResponse status:', response.status);
    console.log('Response data:', JSON.stringify(response.data, null, 2));
  } catch (error: any) {
    console.error('\nError:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
}

test();
