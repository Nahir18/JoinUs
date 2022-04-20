import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import Form from "@Components/Forms/index"
import Button from "@Components/Button";
import { WithValidationHocRenderPropAdapter} from "../../Validator";
import {loginFields, rules} from "./formConfig"
import {PageContainer, ContentContainer, ImgLogo, FormContainer} from "./styles"
import {Logo} from '@Components/NavigationDrawer/icons/constantsIcons'
import {LOCAL_STORAGE_REMEMBER_ME} from "@constants"
import {AuthRequest} from "@Store/UserObject"

const Login = ({ history: { push }}) => {
    const [data, setData] = useState({email: "test@test", password: "test"})
    const [loading, setLoading] = useState(false)

    const inputLoginFields = (value) => setData(value)

    const authorize = async () => {
        try {
            setLoading(true)
            localStorage.setItem(LOCAL_STORAGE_REMEMBER_ME, String(data))
            await AuthRequest(data)
            push("./")
        } catch (e) {
            console.log("login error", e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <PageContainer className="w-full bg-color-light-blue-2">
            <ContentContainer>
                <FormContainer>
                    <ImgLogo dangerouslySetInnerHTML={{__html: Logo}} />
                    <WithValidationHocRenderPropAdapter
                        onInput={inputLoginFields}
                        onSubmit={authorize}
                        value={data}
                        rules={rules}
                    >
                        {(formProps) => {
                            const {formValid, onSubmit, onInput } = formProps
                            return (
                                <>
                                    <Form
                                        {...formProps}
                                        fields={loginFields}
                                        value={data}
                                        onInput={onInput}
                                    />
                                    <Button
                                        className="m-t-20 blue btn width-m m-l-a m-r-a"
                                        name="login"
                                        type="submit"
                                        onClick={onSubmit}
                                        loading={loading}
                                    >
                                        Войти
                                    </Button>
                                </>
                            )
                        }}
                    </WithValidationHocRenderPropAdapter>
                </FormContainer>
            </ContentContainer>
        </PageContainer>
    );
};

Login.propTypes = {

};

export default Login;
