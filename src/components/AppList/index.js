import React, {Component} from 'react';
import Header from "./header";
import Row from "./row"
import PropTypes from "prop-types"
import ScrollBar from "@Components/ScrollBar"
import {ContainerReport, TableContainer} from "./style";
import Preloader from "../Preloader/index";

class AppList extends Component {
    render() {
        const { data, settings, nestedKey, nestedData, className, loading } = this.props

        const gridRowsSize = `${settings.map(a => a.size ? `${a.size}` : "auto")}`.replace(/,/gi, " ")
        const gridStyle = {"gridTemplateColumns": gridRowsSize}

        const TableRows = (nestedKey) => {
            const result = []
            for (let i = 0; i < data.length; i++) {
                const rowData = data[i]
                result.push(
                  <div
                      key={`table-${i}`}
                  >
                    <div
                        className={`${nestedData && "bg-color-light-blue"}`}
                        key={i}
                    >
                      <Row
                        className=""
                        settings={settings}
                        data={rowData}
                        nestedlevel={0}
                        rowindex={i}
                        nestedData={nestedData}
                        gridStyle={gridStyle}
                        rowClass="font-bold my-4 mx-4 flex justify-start"
                      />
                    </div>
                    {
                      nestedKey && rowData[nestedKey] && rowData[nestedKey].length > 0 && rowData[nestedKey].map( (a, index) => {
                        return (
                          <Row
                            settings={settings}
                            key={`${i}-${index}`}
                            data={a}
                            nestedlevel={1}
                            rowindex={index}
                            parentIndex={i}
                            gridStyle={gridStyle}
                            rowClass="my-4 flex justify-start font-semibold"
                          />
                        )})
                    }
                  </div>
                )
            }
            return result
        }

        return (
            <div className={`${className} bg-white flex-container border-bottom border-radius-4 h-full hidden`}>
                <Header
                    settings={settings}
                    gridStyle={gridStyle}
                />
              <ScrollBar>
                <TableContainer className="flex-container relative">
                  {
                    loading
                      ? (<Preloader/>)
                      : (
                        data && data.length > 0
                          ? (TableRows(nestedKey))
                          : (
                            <ContainerReport>
                              Данные не найдены или их нет
                            </ContainerReport>
                          )
                      )
                  }
                </TableContainer>
              </ScrollBar>
            </div>
        );
    }
}

AppList.propTypes = {
  data: PropTypes.array,
  settings: PropTypes.array,
  nestedKey: PropTypes.string,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

AppList.defaultProps = {
  data: [],
  settings: [],
  nestedKey: "",
  className: "",
  loading: false
}

export default AppList;
