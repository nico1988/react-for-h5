import React from 'react';
import Link from 'umi/link';
import router from 'umi/router';
import { Bind } from 'lodash-decorators';
import { Button, Checkbox, InputItem, Toast } from 'antd-mobile';
import Icon from '@components/icon/Icon';
import { RegisterAgree } from './Register.agree';
import style from './Register.less';

interface IRegisterProps { }

interface IRegisterState {
    loading: boolean;
    numError: boolean;
    pwdError: boolean;
    pwdChkError: boolean;
    disabled: boolean;
    isAgree: boolean;
}

interface IRegisterQuery {
    userNum: string;
    password: string;
    passwordCheck: string;
}

class LoginComponent extends React.Component<IRegisterProps, IRegisterState> {
    private RegisterQuery: IRegisterQuery = {
        userNum: '',
        password: '',
        passwordCheck: ''
    };

    constructor(props: IRegisterProps, context?: any) {
        super(props, context);
        this.state = {
            loading: false,
            numError: false,
            pwdError: false,
            pwdChkError: false,
            disabled: true,
            isAgree: true
        };
    }

    @Bind()
    private onNumInput(value: string): void {
        this.RegisterQuery.userNum = value;
        this.resetButtonDisabled();
    }

    @Bind()
    private onPwdInput(value: string): void {
        this.RegisterQuery.password = value;
        this.resetButtonDisabled();
    }

    @Bind()
    private onPwdCheckInput(value: string): void {
        this.RegisterQuery.passwordCheck = value;
        this.resetButtonDisabled();
    }

    @Bind()
    private onAgreeChange(): void {
        this.setState({
            isAgree: !this.state.isAgree
        }, this.resetButtonDisabled);
    }

    @Bind()
    private resetButtonDisabled(): void {
        this.setState({
            disabled: this.RegisterQuery.userNum &&
                this.RegisterQuery.password &&
                this.RegisterQuery.passwordCheck &&
                this.state.isAgree ?
                false : true
        });
    }

    /**
     * ????????????
     */
    private seeAgree(): void {
        RegisterAgree();
    }

    @Bind()
    private onSubmit(): void {
        const isFail: boolean = this.RegisterQuery.passwordCheck !== this.RegisterQuery.password;

        this.setState({
            pwdChkError: isFail
        }, () => {
            isFail && Toast.fail('?????????????????????');
        });

        !isFail && this.setState({
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
            <div className={style.registerContent}>
                <div className={style.banner} >
                    ?????????????????????~
                </div>
                <div className={style.btnbox}>
                    <InputItem
                        type="text"
                        clear={true}
                        maxLength={30}
                        error={this.state.numError}
                        onChange={this.onNumInput}
                        placeholder="???????????????"
                    >
                        <Icon type="icon_signal" />????????????
                    </InputItem>
                    <InputItem
                        type="password"
                        clear={true}
                        maxLength={30}
                        error={this.state.pwdError}
                        onChange={this.onPwdInput}
                        placeholder="???????????????"
                    >
                        <Icon type="lock" />????????????
                    </InputItem>
                    <InputItem
                        type="password"
                        clear={true}
                        maxLength={30}
                        error={this.state.pwdChkError}
                        onChange={this.onPwdCheckInput}
                        placeholder="?????????????????????"
                    >
                        <Icon type="lock" />????????????
                    </InputItem>
                    <Button
                        type="primary"
                        loading={this.state.loading}
                        disabled={this.state.disabled}
                        onClick={this.onSubmit}
                    >
                        ????????????
                    </Button>
                    <div className={style.agreeBox}>
                        <Checkbox.AgreeItem
                            defaultChecked={this.state.isAgree}
                            onChange={this.onAgreeChange}
                        >
                            ??????????????????
                        </Checkbox.AgreeItem>
                        <a
                            href="javascript:;"
                            onClick={this.seeAgree}
                            className={style.seeAgree}
                        >
                            <Icon type="icon_shakehands" />????????????
                        </a>
                    </div>
                </div>
                <div className={style.loginLink}>
                    <Link to="/login">???????????????????????????</Link>
                </div>
            </div>
        );
    }
}

export default LoginComponent;
