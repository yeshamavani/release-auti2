const releaseNotes = require('git-release-notes');
const simpleGit = require('simple-git/promise');
const path = require('path');
const {readFile, writeFile, ensureFile} = require('fs-extra');

async function generateReleaseNotes() {
  try {
    const OPTIONS = {
      branch: 'master',
    };
    const RANGE = await getRange();
    const TEMPLATE = './mymarkdown.ejs';

    const changelog = await releaseNotes(OPTIONS, RANGE, TEMPLATE);
    //console.log(`Release Notes between ${RANGE}\n\n${changelog}`);
    const changelogPath = path.resolve(__dirname, 'CHANGELOG.md');
    await ensureFile(changelogPath);
    const currentFile = (await readFile(changelogPath)).toString().trim();
    if (currentFile) {
      console.log('Update %s', changelogPath);
    } else {
      console.log('Create %s', changelogPath);
    }

    await writeFile(changelogPath, changelog);
    await writeFile(changelogPath, currentFile, {flag: 'a+'});
    await addAndCommit().then(() => {
      console.log('here----');
    });
  } catch (ex) {
    console.error(ex);
    process.exit(1);
  }
}

async function getRange() {
  const git = simpleGit();
  const tags = (await git.tag()).split('\n');
  tags.pop();

  const startTag = tags.slice(-2)[0];
  const endTag = tags.slice(-1)[0];
  return `${startTag}..${endTag}`;
}

async function addAndCommit() {
  const git = simpleGit();
  const add = await git.add(['CHANGELOG.md']);
  console.log(`add---- ${add}`);
  const committt = await git.commit('chore(release): changelog file999', {
    '--no-verify': null,
  });
  console.log(`committ=== ${committt}`);
  console.log(`ab push hogi file`);
  const push = await git.push('origin', 'master');
  console.log(`push--- ${push}`);
}

generateReleaseNotes().catch(ex => {
  console.error(ex);
  process.exit(1);
});
