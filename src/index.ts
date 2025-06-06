import * as core from '@actions/core';
import { runBlame } from './handlers/blame';
import { COMMANDS_AVAILABLE } from './constants';

async function run() {
  const command = core.getInput('command');
  const issueID = core.getInput('issue_id');
  const apiKey = core.getInput('blamegpt_api_key');

  if (!command) {
    core.setFailed('Command is required.');
    return;
  }

  if (!issueID) {
    core.setFailed('Issue ID is required.');
    return;
  }

  if (!apiKey) {
    core.setFailed('BlameGPT API key is required.');
    return;
  }

  core.info(`Running BlameGPT command: ${command}`);
  try {
    switch (command) {
      case 'blame':
        await runBlame(issueID, apiKey);
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
