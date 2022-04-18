import React, {useState} from 'react';
import PropTypes from 'prop-types';
import Form from "@Components/Forms/index"
import Button from "@Components/Button";
import Input from "@Components/Fields/Input"
import { WithValidationHocRenderPropAdapter} from "../../Validator";


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

const Login = props => {
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    return (
        <div
            className="flex justify-center items-center flex-col w-full bg-color-light-blue-2"
        >
            <WithValidationHocRenderPropAdapter
                onInput={() => console.log("oninput")}
                onSubmit={() => console.log("onsubmit")}
                value={data}
            >
                {(formProps) => {
                    const {formValid, onSubmit, onInput } = formProps
                    return (
                        <>
                            <Form
                                fields={loginFields}
                                value={data}
                                onInput={() => onInput}
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