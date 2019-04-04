import test from 'ava';
import { getRawQueryParameterString, getEncodedQueryParameterString } from './QueryParameters';

const qpObj = {
    someString: 'someString',
    emptyString: '',
    blankString: '   ',
    minusOne: -1,
    zero: 0,
    one: 1,
    oneStr: '1',
    trueVal: true,
    false: false,
};

test('QueryParameters.getRawQueryParameterString returns something', t => {
    const qpObj = {
        someString: 'someString',
        emptyString: '',
        blankString: '   ',
        zero: 0,
        one: 1,
        trueVal: true,
        falseVal: false,
    };

    const result = getRawQueryParameterString(qpObj);
    // console.log('RESULT', result);
    // console.log('XXXXXX', 'someString=someString&zero=0&one=1&trueVal=true&falseVal=false');
    // someString=someString&emptyString=&zero=0&one=1&trueVal=true&falseVal=false
    t.is(result, 'someString=someString&zero=0&one=1&trueVal=true&falseVal=false');
});
test('QueryParameters.getEncodedQueryParameterString returns something', t => {
    const qpObj = {
        someString: 'someString',
        pathString: '/some/path/',
        emptyString: '',
        blankString: '   ',
        zero: 0,
        one: 1,
        trueVal: true,
        falseVal: false,
    };

    const result = getEncodedQueryParameterString(qpObj);
    // console.log('RESULT', result);
    // console.log('XXXXXX', 'someString=someString&zero=0&one=1&trueVal=true&falseVal=false');
    // someString=someString&emptyString=&pathString=%2Fsome%2Fpath%2F&zero=0&one=1&trueVal=true&falseVal=false
    t.is(
        result,
        'someString=someString&pathString=%2Fsome%2Fpath%2F&zero=0&one=1&trueVal=true&falseVal=false',
    );
});
