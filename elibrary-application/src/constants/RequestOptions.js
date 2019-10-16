class RequestOptions {
    static addMethod(method, options) {
        return {
            ...options,
            method: method
        };
    }

    static addDataType(type, options) {
        return {
            ...options,
            dataType: type
        };
    }

    static addJsonDataType(options) {
        return this.addHeader(
            'Content-Type',
            'application/json',
            this.addDataType('json', options)
        );
    }

    static addHeader(headerName, parameter, options) {
        return {
            ...options,
            headers: {
                ...options.headers,
                [headerName]: parameter
            }
        };
    }

    static addBody(content, options) {
        return {
            ...options,
            body: JSON.stringify(content)
        };
    }

    static addToken(token, options) {
        return this.addHeader('Authorization',
            `Bearer ${token}`,
            options);
    }

    static createFileUploadOptions(body, token) {
        let options = this.addToken(token, {});
        return this.addMethod('POST', this.addBody(body, options));
    }

    static createPostOptions(body, token = null) {
        let options = {};
        if (token) {
            options = this.addToken(token, options);
        }
        return this.addJsonDataType(
            this.addMethod('POST',
                this.addBody(body, options)));
    };

    static createGetOptions(token = null) {
        let options = {};
        if (token) {
            options = this.addToken(token, options);
        }
        return this.addMethod('GET', options);
    }

    static createPutOptions(body, token = null) {
        let options = {};
        if (token) {
            options = this.addToken(token, options);
        }
        return this.addJsonDataType(
            this.addMethod('PUT',
                this.addBody(body, options)));
    }

    static createDeleteOptions(token = null) {
        let options = {};
        if (token) {
            options = this.addToken(token, options);
        }
        return this.addMethod('DELETE', options);
    }

    static buildUri(path, params) {
        let esc = encodeURIComponent;
        let query = Object.keys(params)
            .map(key => esc(key) + '=' + esc(params[key]))
            .join('&');
        return `${path}?${query}`;
    }
}

export default RequestOptions;
//export default new RequestOptions();