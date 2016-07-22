const main = require('../../main/code-barcode');
const shapeCodes = require('./fixtures');

describe('zipcode',() => {

    describe('transCodeToBarcode',() => {
        it('should trans code To barcode',() => {
            const barcodes = main.transCodeToBarcode('12345-2345');
            const expectString = '|:::||::|:|::||::|::|:|:|:::|:|::||::|::|:|:|::::|||';
            expect(barcodes).toEqual(expectString);
        });

        it('should trans code To barcode',() => {
            const barcodes = main.transCodeToBarcode('12345');
            const expectString = '|:::||::|:|::||::|::|:|:|::|:|:|';
            expect(barcodes).toEqual(expectString);
        });
        it('should trans code To barcode',() => {
            const barcodes = main.transCodeToBarcode('23');
            const expectString = 'code is not valid';
            expect(barcodes).toEqual(expectString);
        });
    });

    describe('validateCode',() => {
        it('should validate code to legal',() => {
            const legalCode = main.validateCode('12345');
            const expectString = '12345';
            expect(legalCode).toEqual(expectString);
        });
        it('should validate code to illegal',() => {
            const legalCode = main.validateCode('23');
            const expectString = 'code is not valid';
            expect(legalCode).toEqual(expectString);
        });
    });
    
    describe('formatCode',() => {
        it('should format code',() => {
            const formatCode = main.formatCode('12345-2345');
            const expectString = '123452345';
            expect(formatCode).toEqual(expectString);
        });
        
        it('should format code',() => {
            const formatCode = main.formatCode('12345');
            const expectString = '12345';
            expect(formatCode).toEqual(expectString);
        });
    });

    describe('addCheckCode',() => {
        it('should add checkCode',() => {
            const checkedCodes = main.addCheckCode('123452345');
            const expectArray = [1,2,3,4,5,2,3,4,5,1];
            expect(checkedCodes).toEqual(expectArray);
        });

        it('should add checkCode',() => {
            const checkedCodes = main.addCheckCode('12345');
            const expectArray = [1,2,3,4,5,5];
            expect(checkedCodes).toEqual(expectArray);
        });
    });
    
    describe('transformBarcodes',() => {
        it('should add checkCode',() => {
            const transformBarcodes = main.transformBarcodes([1,2,3,4,5,2,3,4,5,1],shapeCodes);
            const expectArray = [':::||','::|:|','::||:',':|::|',':|:|:','::|:|','::||:',':|::|',':|:|:',':::||'];
            expect(transformBarcodes).toEqual(expectArray);
        });

        it('should add checkCode',() => {
            const transformBarcodes = main.transformBarcodes([1,2,3,4,5,5],shapeCodes);
            const expectArray = [':::||','::|:|','::||:',':|::|',':|:|:',':|:|:'];
            expect(transformBarcodes).toEqual(expectArray);
        });
    });

    describe('printBarcodes',() => {
        it('should print barcodes',() => {
            const barcodes = main.
            printBarcodes([':::||','::|:|','::||:',':|::|',':|:|:','::|:|','::||:',':|::|',':|:|:',':::||']);
            const expectString = '|:::||::|:|::||::|::|:|:|:::|:|::||::|::|:|:|::::|||';
            expect(barcodes).toEqual(expectString);
        });

        it('should print barcodes',() => {
            const barcodes = main.printBarcodes([':::||','::|:|','::||:',':|::|',':|:|:',':|:|:']);
            const expectString = '|:::||::|:|::||::|::|:|:|::|:|:|';
            expect(barcodes).toEqual(expectString);
        });
    });

});