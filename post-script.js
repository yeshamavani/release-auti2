const https = require('node:https');
const jsdom = require('jsdom');
module.exports = async function (data, callback) {
  const rewritten = [];
  //for (let i = 0; i < data.commits.length; i++) {
  for (const commit of data.commits) {
    //const commit = data.commits[i];
    if (commit.title.indexOf('chore(release)') !== -1) {
      continue;
    }
    commit.messageLines = commit.messageLines.filter(message => {
      if (message.indexOf('efs/remotes/origin') === -1) return message;
    });

    commit.messageLines.forEach(message => {
      commit.issueno = message.includes('GH-') ? message.slice(3) : null;
    });

    const issueDesc = await getIssueDesc(commit.issueno).then(res => {
      return res;
    });
    commit.issueTitle = issueDesc;

    // commit.committerDate = new Date(commit.committerDate).toLocaleDateString(
    //   'en-us',
    //   {
    //     weekday: 'long',
    //     year: 'numeric',
    //     month: 'short',
    //     day: 'numeric',
    //   },
    // );
    rewritten.push(commit);
  }
  callback({
    commits: rewritten.filter(Boolean),
    range: data.range,
  });
};

function getIssueDesc(issueNo) {
  return new Promise((resolve, reject) => {
    let result = '';
    const req = https.get(
      `https://github.com/yeshamavani/release-auti2/issues/${encodeURIComponent(
        issueNo,
      )}`,
      res => {
        res.setEncoding('utf8');
        res.on('data', chunk => {
          result = result + chunk;
        });
        res.on('end', () => {
          const {JSDOM} = jsdom;
          const dom = new JSDOM(result);
          const title = dom.window.document.getElementsByClassName(
            'js-issue-title markdown-title',
          );
          let issueTitle = '';
          //for (let i = 0; i < title.length; i++) {
          for (const ele of title) {
            if (ele.nodeName === 'SPAN') {
              issueTitle = ele.innerHTML;
            }
          }
          resolve(issueTitle);
        });
      },
    );
    req.on('error', e => {
      reject(e);
    });
    req.end();
  });
}
