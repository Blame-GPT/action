## How to install? 

```yaml
- uses: actions/setup-node@v4
  with:
    node-version: '20' # or any

# To find culprit PR for an issue
- uses: blamegpt/action@v1
  with:
    command: 'blame'
    issue_id: ${{ github.event.issue.number }}
    blamegpt_api_key: ${{ secrets.BLAMEGPT_API_KEY }}

# To review a PR and catch bugs before they happen
- uses: blamegpt/action@v1
  with:
    command: 'review'
    pull_request_id: ${{ github.event.pull.number }}
    blamegpt_api_key: ${{ secrets.BLAMEGPT_API_KEY }}

# To find documentation changes for a PR
- uses: blamegpt/action@v1
  with:
    command: 'ohmydocs'
    pull_request_id: ${{ github.event.pull.number }}
    blamegpt_api_key: ${{ secrets.BLAMEGPT_API_KEY }}
```

## Reviewing PRs to catch bugs before they happen

This tool helps review pull requests and identify potential issues before they make it to production, saving you time and preventing issues.

## Why is my shiny new feature not on production yet?

Oh... we have deploy blockers!!

This tool finds the pull requests begging to be reverted so you can go back to shipping.


(Blame the PR, not your coworker. Probably.)


## Finding the PR causing a deploy blocker
<img src="https://github.com/user-attachments/assets/213890a8-9575-4fb8-82df-5a130e53880b" height=500>

