import * as React from 'react';

class DataUtils {
    static Stringify = (data: any) => JSON.stringify(data, null, 4);
    static UrlEncode = (data: any) => encodeURIComponent(data);
}

interface IDebuggerView {
    formData: any;
    Raw: string;
    Encoded: string;
    Form: string;
}

class DebuggerQueryParametersViews implements IDebuggerView {
    formData: any;
    constructor(formData: any) {
        this.formData = formData;
    }
    get Raw(): string {
        return DataUtils.Stringify(this.formData);
    }
    get Encoded(): string {
        return DataUtils.Stringify(this.formData);
    }
    get Form(): string {
        return DataUtils.Stringify(this.formData);
    }
}

class DebuggerBodyParametersViews implements IDebuggerView {
    formData: any;
    constructor(formData: any) {
        this.formData = formData;
    }
    get Raw(): string {
        return DataUtils.Stringify(this.formData);
    }
    get Encoded(): string {
        return DataUtils.Stringify(this.formData);
    }
    get Form(): string {
        return DataUtils.Stringify(this.formData);
    }
}

class DebuggerHeadersViews implements IDebuggerView {
    formData: any;
    constructor(formData: any) {
        this.formData = formData;
    }
    get Raw(): string {
        return DataUtils.Stringify(this.formData);
    }
    get Encoded(): string {
        return DataUtils.Stringify(this.formData);
    }
    get Form(): string {
        return DataUtils.Stringify(this.formData);
    }
}
