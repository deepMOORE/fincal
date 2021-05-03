document.querySelector('.mat-disc-but').addEventListener('click', function (event) {
    event.preventDefault();

    let fv = getVariable('.simple-fv');
    let pv = getVariable('.simple-pv');
    let n = getVariable('.simple-n');
    let r = getVariable('.simple-r');

    n = n / 360;
    r = r / 100;

    let nullableVariable = findNan(fv, pv, n, r);

    let result = null;
    switch (nullableVariable) {
        case 'fv': {
            result = 'FV = ' + round(pv * (1 + r*n))
            break;
        }
        case 'pv': {
            result = 'PV = ' + round(fv / (1 + r*n))
            break;
        }
        case 'r': {
            result = 'r = ' + round(((fv / pv - 1) / n) * 100)
            break;
        }
        case 'n': {
            result = 'n = ' + round(((fv / pv - 1) / n) * (1 / r))
            break;
        }
    }

    document.querySelector('.result-mat-disc').innerHTML = result
});

document.querySelector('.mat-disc-kom').addEventListener('click', function (event) {
    event.preventDefault();

    let fv = getVariable('.simple-fv-kom');
    let pv = getVariable('.simple-pv-kom');
    let n = getVariable('.simple-n-kom');
    let d = getVariable('.simple-d-kom');

    n = n / 360;
    d = d / 100;

    let nullableVariable = findNan(fv, pv, n, d);

    let result = null;
    switch (nullableVariable) {
        case 'fv': {
            result = 'FV = ' + round(pv / (1 - d*n))
            break;
        }
        case 'pv': {
            result = 'PV = ' + round(fv * (1 - n*d))
            break;
        }
        case 'r': { // r это d лень переделывать бля
            result = 'd = ' + round(((1 - pv / fv) / n) * 100)
            break;
        }
        case 'n': {
            result = 'n = ' + round(((1 - pv / fv)) * (1 / d))
            break;
        }
    }

    document.querySelector('.result-kom-disc').innerHTML = result
});

document.querySelector('.ss-simple-but').addEventListener('click', function (event) {
    event.preventDefault();

    let fv = getVariable('.ss-simple-fv');
    let pv = getVariable('.ss-simple-pv');
    let n = getVariable('.ss-simple-n');
    let r = getVariable('.ss-simple-r');

    n = n / 360;
    r = r / 100;

    let nullableVariable = findNan(fv, pv, n, r);

    let result = null;
    switch (nullableVariable) {
        case 'fv': {
            result = 'FV = ' + round(pv * Math.pow((1 + r), n))
            break;
        }
        case 'pv': {
            result = 'PV = ' + round(fv / Math.pow((1 + r), n))
            break;
        }
        case 'r': {
            result = 'r = ' + round((Math.pow(fv / pv, 1 / n) - 1) * 100)
            break;
        }
        case 'n': {
            result = 'n = ' + round((Math.log(fv / pv)) / (1 + r))
            break;
        }
    }

    document.querySelector('.result-ss-simple').innerHTML = result
});

document.querySelector('.ss-n-but').addEventListener('click', function (event) {
    event.preventDefault();

    let fv = getVariable('.ss-n-fv');
    let pv = getVariable('.ss-n-pv');
    let j = getVariable('.ss-n-j');
    let n = getVariable('.ss-n-n');

    n = n / 360;
    j = j / 100;

    let nullableVariable = findNan(fv, pv, n, j);

    let result = null;
    switch (nullableVariable) {
        case 'fv': {
            result = 'FV = ' + round(pv * Math.exp(j * n))
            break;
        }
        case 'pv': {
            result = 'PV = ' + round(fv / Math.exp(j * n))
            break;
        }
        case 'r': {
            result = 'j = ' + round((Math.log(fv / pv)) / n)
            break;
        }
        case 'n': {
            result = 'n = ' + round((Math.log(fv / pv)) / j)
            break;
        }
    }

    document.querySelector('.result-ss-n').innerHTML = result
});

document.querySelector('.ss-p-but').addEventListener('click', function (event) {
    event.preventDefault();

    let ns = document.querySelector('.ss-p-n').value.split(';');
    let ds = document.querySelector('.ss-p-d').value.split(';');

    let fv = getVariable('.ss-p-fv');
    let pv = getVariable('.ss-p-pv');

    if (ns.length !== ds.length) {
        return;
    }

    let nullableVariable = findNanTwoVar(fv, pv);

    let mult = 1;
    for (let i = 0; i < ds.length; i++) {
        mult *= (1 + (ns[i] / 360) * (ds[i] / 100));
    }

    let result = null;
    switch (nullableVariable) {
        case 'fv': {
            result = 'FV = ' + round(pv *mult)

            break;
        }
        case 'pv': {
            result = 'PV = ' + round(fv / mult)
            break;
        }
    }

    document.querySelector('.result-ss-p').innerHTML = result
});

function round(x) {
    return Math.round(x * 100) / 100;
}

function findNanTwoVar(fv, pv) {
    if (isNaN(fv)) {
        return 'fv';
    }

    if (isNaN(pv)) {
        return 'pv';
    }
}

function findNan(fv, pv, n, r) {
    if (isNaN(fv)) {
        return 'fv';
    }

    if (isNaN(pv)) {
        return 'pv';
    }

    if (isNaN(n)) {
        return 'n';
    }

    if (isNaN(r)) {
        return 'r';
    }
}

function getVariable(boxName) {
    return parseFloat(document.querySelector(boxName).value);
}