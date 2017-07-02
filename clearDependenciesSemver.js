let fs = require('fs');

let wipeDependencies = function () {
  let file = fs.readFileSync('package.json');
  let content = JSON.parse(file);

  for (let devDep in content.devDependencies) {
    content.devDependencies[devDep] = '*';
  }

  for (let dep in content.dependencies) {
    content.dependencies[dep] = '*';
  }

  fs.writeFileSync('package.json', JSON.stringify(content));
};

wipeDependencies();