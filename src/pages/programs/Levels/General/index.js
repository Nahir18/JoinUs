import React, {Component} from 'react';
import memoizeOne from "memoize-one";
import Form from "@Components/Forms/index"
import PropTypes from "prop-types"
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { fieldMap, rules} from "./formConfig";
import { FormContainer } from "../../item/General/style"
import axios from "axios";
import { ADAPTATION_STAGE, ADAPTATION_BLOCK, DEFAULT_URL } from "../../../../components/APIList";
import {NEW_STAGE} from "../../Constants";

const withSetDisabledFieldsConfigAndSplitByColumns = memoizeOne((config, readOnlyFields = []) => readOnlyFields
    .reduce((acc, c) => {
        const index = acc.findIndex(({ id }) => id === c)
        if (index >= 0) {
            acc[index] = { ...acc[index], disabled: true }
        }
        return acc
    }, [...config])
    .reduce((acc, f) => {
        const { formColumn = 0 } = f
        acc[formColumn].push(f)
        return acc
    }, [[], []]))

class StagesGeneral extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        }
        this.handleInputChange = this.handleInputChange.bind(this)
    }

    pathNames = () => {
        const { location: { pathname } } = this.props
        return pathname.split("/").filter(x => x)
    }

    isNewStage = () => {
        const { pathNames } = this
        return pathNames()[4] === NEW_STAGE
    }

    componentDidMount() {
        const { isNewStage, pathNames } = this
        if (!isNewStage()) {
            axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}/${pathNames()[5]}/`)
                .then(
                    ({data}) => {
                        this.setState({
                            isLoaded: true,
                            data: data
                        })
                    },
                    (error) => {
                        this.setState({
                            isLoaded: true,
                            error
                        })
                    }
                )
        }
    }

    handleInputChange (value, id) {
        const { data } = this.state
        if (!isNaN(value)) {
            this.setState({
                data: {...data, [id]: value}
            })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    saveStage = async () => {
        const { data: {id, stage_name, tier, point, status, create_date, id_employee, duration_day, level} } = this.state
        const { isNewStage, pathNames } = this
        const idStage = isNewStage() ? "/" : `/${pathNames()[5]}/`
        const newData = isNewStage() ? {
            stage_name,
            tier,
            create_date,
            duration_day,
            status: 0,
            point: 0,
            id_employee: 0
        } : {
            id,
            stage_name,
            tier,
            point,
            status,
            create_date,
            id_employee,
            duration_day,
            level
        }
        await axios[isNewStage() ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_STAGE}${idStage}`, newData)
            .then(
                ({data}) => {
                    this.setState({
                        isLoaded: true,
                        data: data
                    })
                    if (isNewStage()) {
                        axios.post(`${DEFAULT_URL}/${ADAPTATION_BLOCK}/`, {
                            adaptationStage: data.id,
                            json: []
                        })
                    }
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    })
                }
            )
    }

    inputDataOfStage = (value) => {
        this.setState(({ data }) => ({ data: { ...data, ...value } }))
    }

    tierUp = () => {
        const { data: { tier }, data } = this.state
        this.setState({
            data: { ...data, tier: tier ? Number(tier) + 1 : 1}
        })
    }
    tierDown = () => {
        const { data: { tier }, data } = this.state
        this.setState({
            data: { ...data, tier: tier > 1 ? tier - 1 : tier}
        })
    }

    render() {
        const { history: { goBack } } = this.props
        const { data } = this.state
        const { tierUp, tierDown } = this
        const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(tierUp, tierDown, this.handleInputChange))
        return (
            <>
                <div className="p-l-24 p-r-24 p-t-24 flex flex-col h-full">
                    <WithValidationHocRenderPropAdapter
                        onInput={this.inputDataOfStage}
                        onSubmit={this.saveStage}
                        value={data}
                        rules={rules}
                    >
                        {(formProps) => {
                            const { onInput, onSubmit } = formProps
                            return (
                                <div className="h-full flex flex-col justify-between">
                                    <FormContainer>
                                        <Form
                                            {...formProps}
                                            fields={firstForm}
                                            value={data}
                                            onInput={onInput}
                                        />
                                        <Form
                                            {...formProps}
                                            fields={SecondForm}
                                            value={data}
                                            onInput={onInput}
                                        />
                                    </FormContainer>
                                    <div
                                        className="flex justify-end p-b-24"
                                    >
                                        <button
                                            name="cancel"
                                            type="submit"
                                            onClick={() => goBack()}
                                            className="grey btn width-m m-r-16"
                                        >
                                            Отмена
                                        </button>
                                        <button
                                            name="save"
                                            type="submit"
                                            className="blue btn width-m"
                                            onClick={onSubmit}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            )}}
                    </WithValidationHocRenderPropAdapter>
                </div>
            </>
        );
    }
}

StagesGeneral.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
};

export default StagesGeneral;
