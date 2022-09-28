const releaseNotes = require('git-release-notes');
const simpleGit = require('simple-git/promise');

async function generateReleaseNotes() {
  try {
    const OPTIONS = {
      branch: 'master',
    };
    const RANGE = await build();
    // build().then(res => {
    //   RANGE = res;
    // });
    console.log(RANGE);
    const TEMPLATE = 'html';

    // releaseNotes(OPTIONS, RANGE, TEMPLATE)
    //   .then(changelog => {
    //     console.log(`Release Notes between ${RANGE}\n\n${changelog}`);
    //   })
    //   .catch(ex => {
    //     console.error(ex);
    //     process.exit(1);
    //   });

    const changelog = await releaseNotes(OPTIONS, RANGE, TEMPLATE);
    console.log(`Release Notes between ${RANGE}\n\n${changelog}`);
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}

async function build() {
  const git = simpleGit();
  // const tags = (await git.tag()).replace(/[\r\n]/gm, '');
  const tags = (await git.tag()).split('\n');
  tags.pop();

  const startTag = tags.slice(-2)[0];
  const endTag = tags.slice(-1)[0];
  console.log(startTag);
  console.log(endTag);
  console.log(tags);
  console.log(`${startTag}..${endTag}`);
  return `${startTag}..${endTag}`;
}

generateReleaseNotes().catch(ex => {
  console.error(ex);
  process.exit(1);
});
