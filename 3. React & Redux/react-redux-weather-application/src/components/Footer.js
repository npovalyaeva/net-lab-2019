import React, { PureComponent } from 'react';

import whiteLogo from '../resources/logo-white.svg';
import githubLogo from '../resources/github-logo.svg';
import yandexLogo from '../resources/yandex-eng-logo.svg';

export class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <div className="author-strip">
                    <h6>Nadya Povalyaeva, 2019</h6>
                </div>
                <div className="sources-strip">
                    <a href="https://npovalyaeva.github.io/">
                        <img
                            src={whiteLogo}
                            width="40"
                            height="40"
                            className="d-inline-block align-top"
                            alt="SSAW Weather"
                        />
                    </a>
                    <div className="helpful-links">
                        <a href="https://yandex.com/">
                            <img
                                src={yandexLogo}
                                height="30"
                                className="d-inline-block align-top"
                                alt="Yandex"
                            />
                        </a>
                        <a href="https://github.com/">
                            <img
                                src={githubLogo}
                                height="30"
                                className="d-inline-block align-top"
                                alt="GitHub"
                            />
                        </a>
                    </div>
                </div>
            </footer>
        )
    };
}