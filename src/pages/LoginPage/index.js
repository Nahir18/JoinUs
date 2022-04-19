import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Form from "@Components/Forms/index"
import Button from "@Components/Button";
import axios from "axios";
import { WithValidationHocRenderPropAdapter} from "../../Validator";
import {DEFAULT_URL_FOR_FILE} from "../../components/APIList";
import {loginFields, rules} from "./formConfig"
import {PageContainer, ContentContainer, ImgLogo, FormContainer} from "./styles"
import {Logo} from '@Components/NavigationDrawer/icons/constantsIcons'

const Login = props => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)

    const inputLoginFields = (value) => setData(value)

    const authorize = () => {
        axios.post(`${DEFAULT_URL_FOR_FILE}/auth/employee/`,  data, {headers: {'Content-type': 'application/json'}})
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
