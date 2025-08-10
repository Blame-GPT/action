import * as core from '@actions/core';
import * as github from '@actions/github';
import { runBlame } from './handlers/blame';
import { runOhMyDocs } from './handlers/ohMyDocs';
import { runReview } from './handlers/review';
import { runRevert } from './handlers/revert';
import { COMMANDS_AVAILABLE } from './constants';

async function run() {
  const command = core.getInput('command');
  const issueID = core.getInput('issue_id');
  const pullRequestID = core.getInput('pull_request_id');
  const apiKey = core.getInput('blamegpt_api_key');
  
  const repoOwner = github.context.repo.owner;
  const repoName = github.context.repo.repo;

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

  if (command === 'review' && !pullRequestID) {
    core.setFailed('pull_request_id is required for review command.');
    return;
  }

  if (command === 'revert' && !pullRequestID) {
    core.setFailed('pull_request_id is required for revert command.');
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
        await runBlame(issueID, apiKey, repoOwner, repoName);
        break;
      case 'ohmydocs':
        await runOhMyDocs(issueID, apiKey, repoOwner, repoName);
        break;
      case 'review':
        await runReview(pullRequestID, apiKey, repoOwner, repoName);
        break;
      case 'revert':
        await runRevert(pullRequestID, apiKey, repoOwner, repoName);
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
