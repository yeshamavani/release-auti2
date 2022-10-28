// const https = require('node:https');
// const jsdom = require('jsdom');

// module.exports = async function (data, callback) {
//   const rewritten = await data.commits.map(async commit => {
//     if (commit.title.indexOf('chore(release)') !== -1) {
//       return null;
//     }
//     commit.messageLines = commit.messageLines.filter(message => {
//       if (message.indexOf('efs/remotes/origin') == -1) return message;
//     });
//     commit.messageLines.forEach(message => {
//       commit.issueno = message.includes('GH-') ? message.slice(3) : null;
//     });
//     commit.issueTitle = await getIssueDesc(commit.issueno);
//     return commit;
//   });

//   callback({
//     commits: rewritten.filter(Boolean),
//     range: data.range,
//   });
// };

// function getIssueDesc(issueNo) {
//   return new Promise((resolve, reject) => {
//     console.log('idar hu me');
//     console.log(issueNo);
//     let result = '';
//     const req = https.get(
//       `https://github.com/yeshamavani/release-auti2/issues/${encodeURIComponent(
//         issueNo,
//       )}`,
//       res => {
//         res.setEncoding('utf8');
//         console.log('response reading...');
//         res.on('data', chunk => {
//           result = result + chunk;
//         });
//         res.on('end', () => {
//           console.log('response endd..');
//           const {JSDOM} = jsdom;
//           const dom = new JSDOM(result);
//           const title = dom.window.document.getElementsByClassName(
//             'js-issue-title markdown-title',
//           );
//           let issueTitle = '';
//           for (let i = 0; i < title.length; i++) {
//             if (title[i].nodeName === 'SPAN') {
//               ///console.log(title[i].innerHTML);
//               issueTitle = title[i].innerHTML;
//             }
//           }
//           console.log('titlee---');
//           console.log(issueTitle);
//           resolve(issueTitle);
//         });
//       },
//     );
//     req.on('error', e => {
//       reject(e);
//     });
//     req.end();
//   });
// }
