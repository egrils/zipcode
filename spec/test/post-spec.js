const main = require('../../main/barcode-code');
const shapeCodes = require('./fixtures');

describe('post',()=>{

    describe('restoreCode',() => {
        it('should restore code',() => {
            const code = main.restoreCode('|:::||::|:|::||::|::|:|:|:::|:|::||::|::|:|:|::::|||');
            const expectString = '12345-2345';
            expect(code).toEqual(expectString);
        });
        it('should restore code',() => {
            const code = main.restoreCode('|:::||::|:|::||::|::|:|:|::|:|:|');
            const expectString = '12345';
            expect(code).toEqual(expectString);
        });
        it('should restore code',() => {
            const code = main.restoreCode('|:::||::|:|::||::|::|:|:|::|:|:|||');
            const expectString = 'barcode is not valid';
            expect(code).toEqual(expectString);
        });
    });

    describe('validateCode',() => {
        it('should validate barcode to legal',() => {
            const legalCode = main.validateCode('|:::||::|:|::||::|::|:|:|::|:|:|');
            const expectString = '|:::||::|:|::||::|::|:|:|::|:|:|';
            expect(legalCode).toEqual(expectString);
        });
        it('should validate barcode to illegal',() => {
            const legalCode = main.validateCode('|:::||::|:|::||::|::|:|:|::|:|:|||');
            const expectString = 'barcode is not valid';
            expect(legalCode).toEqual(expectString);
        });
    });

    describe('buildBarcodeArray',() => {
        it('should build barcodeArray',() => {
            const barcodeArray = main.buildBarcodeArray('|:::||::|:|::||::|::|:|:|:::|:|::||::|::|:|:|::::|||');
            const expectArray = ':::||::|:|::||::|::|:|:|:::|:|::||::|::|:|:|::::||';
            expect(barcodeArray).toEqual(expectArray);
        });
        it('should build barcodeArray',() => {
            const barcodeArray = main.buildBarcodeArray('|:::||::|:|::||::|::|:|:|::|:|:|');
            const expectArray = ':::||::|:|::||::|::|:|:|::|:|:';
            expect(barcodeArray).toEqual(expectArray);
        });
    });

    describe('separateBarcode',() => {
        it('should separate barcode',() => {
            const barcodeArray = main.separateBarcode(':::||::|:|::||::|::|:|:|:::|:|::||::|::|:|:|::::||');
            const expectArray = ':::||-::|:|-::||:-:|::|-:|:|:-::|:|-::||:-:|::|-:|:|:-:::||';
            expect(barcodeArray).toEqual(expectArray);
        });
        it('should build barcodeArray',() => {
            const barcodeArray = main.separateBarcode(':::||::|:|::||::|::|:|:|::|:|:');
            const expectArray = ':::||-::|:|-::||:-:|::|-:|:|:-:|:|:';
            expect(barcodeArray).toEqual(expectArray);
        });
    });

    describe('tansformCode',() => {
        it('should tansform barcode to code',() => {
            const barcodeArray = main.transformCode(':::||-::|:|-::||:-:|::|-:|:|:-::|:|-::||:-:|::|-:|:|:-:::||',shapeCodes);
            const expectArray = [1,2,3,4,5,2,3,4,5,1];
            expect(barcodeArray).toEqual(expectArray);
        });
        it('should build barcodeArray',() => {
            const barcodeArray = main.transformCode(':::||-::|:|-::||:-:|::|-:|:|:-:|:|:',shapeCodes);
            const expectArray = [1,2,3,4,5,5];
            expect(barcodeArray).toEqual(expectArray);
        });
    });

    describe('formatCode',() => {
        it('should format code',() => {
            const formatCode = main.formatCode([1,2,3,4,5,2,3,4,5,1]);
            const expectArray = '12345-2345';
            expect(formatCode).toEqual(expectArray);
        });
        it('should format code',() => {
            const formatCode = main.formatCode([1,2,3,4,5,5]);
            const expectArray = '12345';
            expect(formatCode).toEqual(expectArray);
        });
    });

});