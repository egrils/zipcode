const shape = require('../spec/test/fixtures');

function restoreCode(barcode) {
    const validate_code = validateCode(barcode);
    if (validate_code === 'barcode is not valid'){
        return 'barcode is not valid';
    }else {
        const barcode_array = buildBarcodeArray(validate_code);
        const separate_barcode = separateBarcode(barcode_array);
        const transform_code = transformCode(separate_barcode,shape);
        const format_code = formatCode(transform_code);

        return format_code;
    }
}

function validateCode(barcode) {
    if (barcode.length === 32 || barcode.length === 52) {
        return barcode;
    } else {
        return "barcode is not valid";
    }
}

function buildBarcodeArray(legalBarcode) {
    const barcodeArray = legalBarcode.split('');
    barcodeArray.splice(0,1);
    barcodeArray.splice(barcodeArray.length-1,1);

    return barcodeArray.reduce((prev, next) => prev + next);
}

function separateBarcode(barcodes) {
    let flag = 0;
    let a = 0;
    const codeArray  = barcodes.split('');
    const length = codeArray.length;
    for(let barcode of codeArray){
        if (flag <= length){
            if (flag % 5 === 0){
                codeArray.splice(flag+a,0,'-');
                a ++
            }
        }
        flag ++;
    }
    codeArray.splice(0,1);
    codeArray.splice(codeArray.length-1,1);

    const separateBarcode = codeArray.join('');

    return separateBarcode;
}

function transformCode(separateBarcode,shapeCodes) {
    const codeArray = separateBarcode.split('-');

    return codeArray.map(shapeCode => {
        for (let item of shapeCodes) {
            if (item.shapeCode === shapeCode) {
                return item.num;
            }
        }
    });

}

function formatCode(transformCode) {
    transformCode.splice(transformCode.length-1,1);

    if (transformCode.length === 9){
        transformCode.splice(5,0,'-');
    }

    return transformCode.join('');
}


module.exports = {validateCode,buildBarcodeArray,separateBarcode,transformCode,formatCode,restoreCode};