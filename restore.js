const fs = require('fs');
const { execSync } = require('child_process');

const files = [
  'src/App.tsx',
  'src/components/Header.tsx',
  'src/components/PriorityList.tsx',
  'src/components/ActiveSectorView.tsx',
  'src/index.css'
];

files.forEach(file => {
  try {
    const content = execSync(`git show 1eb2c11:${file}`);
    fs.writeFileSync(file, content);
    console.log(`Successfully restored ${file}`);
  } catch (err) {
    console.error(`Error restoring ${file}:`, err.message);
  }
});
