import React, {useCallback, useState} from 'react';
import PropTypes from 'prop-types';
import Form from "@Components/Forms/index"
import Button from "@Components/Button";
import Input from "@Components/Fields/Input"
import axios from "axios";
import { WithValidationHocRenderPropAdapter} from "../../Validator";
import {DEFAULT_URL_FOR_FILE} from "../../components/APIList";


const loginFields = [
    {
        label: "Email",
        id: "email",
        component: Input,
        placeholder: "Введите Email",
        formColumn: 0,
    },
    {
        label: "Пароль",
        id: "password",
        component: Input,
        placeholder: "Введите пароль",
        formColumn: 0,
    }
]
const rules = {
    email: "required",
    password: "required"
}

const Login = props => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const inputLoginFields = (value) => setData(value)
    const authorize = () => {
        axios.post(`${DEFAULT_URL_FOR_FILE}/auth/employee/`,  data, {headers: {'Content-type': 'application/json'}})
    }
    return (
        <div
            className="flex justify-center items-center flex-col w-full bg-color-light-blue-2"
        >
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
                                className="p-t-14"
                                name="login"
                                type="submit"
                                onClick={onSubmit}
                                loading={loading}
                            >
                                Login
                            </Button>
                        </>
                    )
                }}
            </WithValidationHocRenderPropAdapter>
        </div>
    );
};

Login.propTypes = {

};

export default Login;