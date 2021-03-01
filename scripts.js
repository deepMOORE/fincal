document.querySelector('.mat-disc-but').addEventListener('click', function (event) {
    event.preventDefault();

    let fv = parseFloat(document.querySelector('.simple-fv').value);
    let pv = parseFloat(document.querySelector('.simple-pv').value);
    let n = parseFloat(document.querySelector('.simple-n').value);
    let r = parseFloat(document.querySelector('.simple-r').value);

    n = n / 360;
    r = r / 100;

    let nullableVariable = findNullable(fv, pv, n, r);

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

    let fv = parseFloat(document.querySelector('.simple-fv-kom').value);
    let pv = parseFloat(document.querySelector('.simple-pv-kom').value);
    let n = parseFloat(document.querySelector('.simple-n-kom').value);
    let d = parseFloat(document.querySelector('.simple-d-kom').value);

    n = n / 360;
    d = d / 100;

    let nullableVariable = findNullable(fv, pv, n, d);

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

function round(x) {
    return Math.round(x * 100) / 100;
}

function findNullable(fv, pv, n, r) {
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