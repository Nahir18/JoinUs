import React, {Component} from 'react';
import Header from "./header";
import Row from "./row"
import PropTypes from "prop-types"

class AppList extends Component {
    render() {
        const { data, settings, nestedKey } = this.props

        const gridRowsSize = `${settings.map(a => a.size ? `${a.size}` : "auto")}`.replace(/,/gi, " ")
        const gridStyle = {"gridTemplateColumns": gridRowsSize}

        const TableRows = (nestedKey) => {
            const result = []

            for (let i = 0; i < data.length; i++) {
                const rowData = data[i]
                const rowKey = settings[i].key
                result.push(
                    <div
                        key={rowKey}
                    >
                        {
                            <div>
                              {/* todo почему тут этот класс?*/}
                                <div className="bg-color-light-blue">
                                    <Row
                                        className="color-light-blue"
                                        settings={settings}
                                        data={rowData}
                                        rowIndex={i}
                                        gridStyle={gridStyle}
                                        rowClass="font-bold my-4 mx-4 flex justify-start"
                                    />
                                </div>
                                {
                                    nestedKey && rowData.length > 0 && rowData[nestedKey].map( (a, index) => {
                                        return (
                                        <Row
                                            settings={settings}
                                            data={a}
                                            nestedLevel={1}
                                            rowIndex={index}
                                            parentIndex={i}
                                            gridStyle={gridStyle}
                                            rowClass="my-4 flex justify-start font-semibold"
                                        />
                                    )})
                                }
                            </div>
                        }
                    </div>
                )
            }
            return result
        }

        return (
            <div className="bg-white flex-container border-radius-4 m-b-16">
                <Header
                    settings={settings}
                    gridStyle={gridStyle}
                />
                <div>
                    { TableRows(nestedKey) }
                </div>
            </div>
        );
    }
}

AppList.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.array,
  nestedKey: PropTypes.string,
};

AppList.defaultProps = {
  data: [],
  settings: []
}

export default AppList;