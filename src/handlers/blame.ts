import axios from 'axios';
import * as core from '@actions/core';
import { BLAMEGPT_BLAME_ENDPOINT } from '../constants';

export async function runBlame(issueID: string, apiKey: string) {
  const response = await axios.post(
    BLAMEGPT_BLAME_ENDPOINT,
    { issue_id: parseInt(issueID) },
    {
      responseType: 'stream',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const stream = response.data as NodeJS.ReadableStream;
  stream.on('data', (chunk: Buffer) => {
    const lines = chunk.toString().split('\n');
    for (const line of lines) {
      core.info(line);
    }
  });

  await new Promise((resolve, reject) => {
    stream.on('end', resolve);
    stream.on('error', reject);
  });

  core.info('stream completed.');
}
