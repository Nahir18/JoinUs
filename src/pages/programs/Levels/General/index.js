import React, {Component} from 'react';
import memoizeOne from "memoize-one";
import Form from "@Components/Forms/index"
import PropTypes from "prop-types"
import { WithValidationHocRenderPropAdapter } from "../../../../Validator";
import { fieldMap, rules} from "./formConfig";
import { FormContainer } from "../../item/General/style"
import axios from "axios";
import { ADAPTATION_STAGE, ADAPTATION_BLOCK, DEFAULT_URL } from "../../../../components/APIList";
import { levelsBreadcrumbs } from "../../configs";
import PageHeader from "../../../../components/PageHeader";
import {STAGES_LINKS, NEW_STAGE} from "../../Constants";

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

    componentDidMount() {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const idStage = pathnames[6] !== NEW_STAGE ? `/${pathnames[3]}` : ""
        if (pathnames[6] !== NEW_STAGE) {
            axios.get(`${DEFAULT_URL}/${ADAPTATION_STAGE}${idStage}`)
                .then(
                    (response) => {
                        this.setState({
                            isLoaded: true,
                            data: response.data
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
        this.setState({
            [id]: value
        });
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    async saveStage () {
        const { location: { pathname } } = this.props
        const { data: {id, stage_name, tier, point, status, create_date, id_employee, duration_day, level} } = this.state
        const pathnames = pathname.split("/").filter(x => x)
        const newStage = pathnames[6] === NEW_STAGE
        const idProgram = newStage ? "/" : `/${pathnames[3]}/`
        const newData = newStage ? {
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
        await axios[newStage ? "post" : "put"](`${DEFAULT_URL}/${ADAPTATION_STAGE}${idProgram}`, newData)
            .then(
                (response) => {
                    const { data } = response
                    this.setState({
                        isLoaded: true,
                        data: data
                    })
                    if (newStage) {
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
    saveDataOfStage = (v) => {
        console.log(v, 56565)
    }

    tierUp = () => {
        const { data: { tier }, data } = this.state
        this.setState({
            data: { ...data, tier: tier ? tier + 1 : 1}
        })
    }
    tierDown = () => {
        const { data: { tier }, data } = this.state
        this.setState({
            data: { ...data, tier: tier > 1 ? tier - 1 : tier}
        })
    }
    pageHeaderTitle = (stage_name) => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newStage = pathnames[6] === NEW_STAGE
        return newStage ? "Новый этап" : stage_name ? `Этап "${stage_name}"` : ""
    }
    pageHeaderLinks = () => {
        const { location: { pathname } } = this.props
        const pathnames = pathname.split("/").filter(x => x)
        const newStage = pathnames[6] === NEW_STAGE
        return newStage ? [{
            name: "Общие",
            link: NEW_STAGE
        }] : STAGES_LINKS
    }

    render() {
        const { history: { goBack } } = this.props
        const { data, data: { stage_name } } = this.state
        const { tierUp, tierDown, pageHeaderTitle, pageHeaderLinks } = this
        const [firstForm, SecondForm] = withSetDisabledFieldsConfigAndSplitByColumns(fieldMap(tierUp, tierDown))
        return (
            <PageHeader
                className="p-l-24 p-r-24 p-t-24 flex flex-col h-full"
                {...this.props}
                pageData={pageHeaderTitle(stage_name)}
                bredCrumbsConfig={levelsBreadcrumbs}
                url="programs"
                links={pageHeaderLinks()}
            >
                <div className="p-l-24 p-r-24 p-t-24 flex flex-col h-full">
                    <WithValidationHocRenderPropAdapter
                        onInput={this.inputDataOfStage}
                        onSubmit={this.saveDataOfStage}
                        value={data}
                        rules={rules}
                    >
                        {(formProps) => {
                            const { onInput } = formProps
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
                                            onClick={() => this.saveStage()}
                                        >
                                            Сохранить
                                        </button>
                                    </div>
                                </div>
                            )}}
                    </WithValidationHocRenderPropAdapter>
                </div>
            </PageHeader>
        );
    }
}

StagesGeneral.propTypes = {
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
};

export default StagesGeneral;
