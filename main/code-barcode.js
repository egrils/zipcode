const cd = require('../spec/test/fixtures');

function transCodeToBarcode(code) {
    const legalCode = validateCode(code);
    if (legalCode === 'code is not valid'){
        return 'code is not valid';
    }else {
        const formatcode = formatCode(legalCode);
        const checkedcodes = addCheckCode(formatcode);
        const transformbarcodes = transformBarcodes(checkedcodes,cd);
        const barcodes = printBarcodes(transformbarcodes);

        return barcodes;
    }
}

function validateCode(code) {
    if (code.length === 5 || code.length === 9 || code.length === 10) {
        return code;
    } else {
        return "code is not valid";
    }
}

function formatCode(legalCode) {
    if (legalCode.length === 5) {
        return legalCode;

    } else {
        const codeSplit = legalCode.split('-');
        return codeSplit.join('');
    }
}

function addCheckCode(formatCode) {
    const codeArray = formatCode.split('').map(code => parseInt(code));
    const sum = codeArray.reduce((prev, next) => prev + next);
    const checkCode = 10 - sum % 10;
    codeArray.push(checkCode);
    return codeArray;
}

function transformBarcodes(checkedCodes, shapeCodes) {
    return checkedCodes.map(num => {
        for (let item of shapeCodes) {
            if (item.num === num) {
                return item.shapeCode;
            }
        }
    });
}

function printBarcodes(transformBarcodes) {
    return `|${transformBarcodes.join('')}|`;
}


module.exports = {validateCode, formatCode, addCheckCode, transformBarcodes, printBarcodes,transCodeToBarcode};