import React from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Bind } from 'lodash-decorators';
import { Button, InputItem } from 'antd-mobile';
import Icon from '@components/icon/Icon';
import style from './Login.less';

interface ILoginProps { }

interface ILoginState {
    loading: boolean;
    numError: boolean;
    pwdError: boolean;
    disabled: boolean;
}

interface ILoginQuery {
    userNum: string;
    password: string;
}

class LoginComponent extends React.Component<ILoginProps, ILoginState> {
    private LoginQuery: ILoginQuery = {
        userNum: '',
        password: ''
    };

    constructor(props: ILoginProps, context?: any) {
        super(props, context);
        this.state = {
            loading: false,
            numError: false,
            pwdError: false,
            disabled: true
        };
    }

    @Bind()
    private onNumInput(value: string): void {
        this.LoginQuery.userNum = value;
        this.resetButtonDisabled();
    }

    @Bind()
    private onPwdInput(value: string): void {
        this.LoginQuery.password = value;
        this.resetButtonDisabled();
    }

    @Bind()
    private resetButtonDisabled(): void {
        this.setState({
            disabled: this.LoginQuery.userNum && this.LoginQuery.password ? false : true
        });
    }

    @Bind()
    private onSubmit(): void {
        this.setState({
            loading: true,
            disabled: true
        }, () => {
            setTimeout(() => {
                this.setState({
                    loading: false,
                    disabled: false
                });
                router.push('/');
            }, 3000);
        });
    }

    public render(): React.ReactNode {

        return (
            <div className={style.loginContent}>
                <div className={style.banner} />
                <div className={style.btnbox}>
                    <InputItem
                        type="text"
                        clear={true}
                        maxLength={30}
                        error={this.state.numError}
                        onChange={this.onNumInput}
                        placeholder="???????????????"
                    >
                        <Icon type="icon_signal" />??????
                    </InputItem>
                    <InputItem
                        type="password"
                        clear={true}
                        maxLength={30}
                        error={this.state.pwdError}
                        onChange={this.onPwdInput}
                        placeholder="???????????????"
                    >
                        <Icon type="lock" />??????
                    </InputItem>
                    <Button
                        type="primary"
                        loading={this.state.loading}
                        disabled={this.state.disabled}
                        onClick={this.onSubmit}
                    >
                        ??????
                    </Button>
                </div>
                <div className={style.regLink}>
                    <Link to="/register">?????????????????????????????????????????????~</Link>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
