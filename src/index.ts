import * as core from '@actions/core';
import { runBlame } from './handlers/blame';
import { COMMANDS_AVAILABLE } from './constants';

async function run() {
  const command = core.getInput('command');
  const issueId = core.getInput('issue');
  const apiKey = core.getInput('blamegpt_api_key');

  core.info(`Running BlameGPT command: ${command}`);
  try {
    switch (command) {
      case 'blame':
        await runBlame(issueId, apiKey);
        break;
      default:
        core.setFailed(
          `Unsupported command: ${command}. The commands  available are: ${COMMANDS_AVAILABLE.join(
            ', '
          )}`
        );
    }
  } catch (err: any) {
    core.setFailed(`Command failed: ${err}`);
  }
}

run();
