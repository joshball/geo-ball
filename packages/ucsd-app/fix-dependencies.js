const fs = require('fs')

const fixDependencies = () => {
    const pkgLockJson = fs.readFileSync('package-lock.json')
    const pkgLock = JSON.parse(pkgLockJson)
    const getLockDep = (dep) => {
        const lockDep = pkgLock.dependencies[dep];
        if (!lockDep) {
            throw new Error(`No dependency for [${dep}] in lock file`);
        }
        return '^' + lockDep.version    ;
    }

    const pkgJson = fs.readFileSync('package.json')
    const pkg = JSON.parse(pkgJson)
    for (var devDep in pkg.devDependencies) {
        pkg.devDependencies[devDep] = getLockDep(devDep);
    }
    for (var dep in pkg.dependencies) {
        pkg.dependencies[dep] = getLockDep(dep);
    }
    console.log(pkg.devDependencies)
    console.log(pkg.dependencies)
    fs.writeFileSync('package.json', JSON.stringify(pkg))
}

if (require.main === module) {
    fixDependencies()
} else {
    module.exports = fixDependencies
}