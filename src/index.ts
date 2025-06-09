import * as core from '@actions/core';
import { runBlame } from './handlers/blame';
import { runOhMyDocs } from './handlers/ohMyDocs';
import { COMMANDS_AVAILABLE } from './constants';

async function run() {
  const command = core.getInput('command');
  const issueID = core.getInput('issue_id');
  const pullRequestID = core.getInput('pull_request_id');
  const apiKey = core.getInput('blamegpt_api_key');

  if (!command) {
    core.setFailed('command is required.');
    return;
  }

  if (command === 'ohmydocs' && !pullRequestID) {
    core.setFailed('pull_request_id is required for ohmydocs command.');
    return;
  }

  if (command === 'blame' && !issueID) {
    core.setFailed('issue_id is required for blame command.');
    return;
  }

  if (!apiKey) {
    core.setFailed('blamegpt_api_key is required.');
    return;
  }

  core.info(`Running command: ${command}`);
  try {
    switch (command) {
      case 'blame':
        await runBlame(issueID, apiKey);
        break;
      case 'ohmydocs':
        await runOhMyDocs(issueID, apiKey);
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
