import React, {Component} from 'react';
import { RowContainer } from "./style"
import PropTypes from "prop-types"

class Row extends Component {
    render() {
        const {
            rowKey,
            settings,
            nestedData,
            rowClass,
            gridStyle,
            nestedlevel,
            rowindex,
            parentIndex,
            data = {},
            active
        } = this.props

        return (
            <RowContainer
                className={`grid border-top items-center ${nestedData && active && nestedlevel === 0 && "bg-color-light-blue"}`}
                style={gridStyle}
                key={rowKey}
            >
                {
                    settings.map( (a, index) => {
                        const { allData, key } = a
                        const rowKey = Array.isArray(key) ? nestedlevel > key.length ? key[key.length - 1] : key[nestedlevel] : key
                        const renderLevel = a.nestedlevel ? nestedlevel === a.nestedlevel : true
                        const Comp = a.component ? a.component : "div"
                    return (
                             <div
                                 key={`${index}${key}`}
                                 className={`${rowClass} ${nestedlevel > 0 && index === 0 ? "ml-8" : "ml-4"}`}
                             >
                                 <div className="flex items-center">
                                      {
                                         index === 0 &&
                                             (<div className="mr-1">
                                                 { `${ parentIndex || parentIndex === 0 ? `${parentIndex + 1 }.${ rowindex + 1}` : rowindex + 1 }.` }
                                             </div>)
                                      }
                                      {
                                          renderLevel &&
                                          (<Comp
                                              className="flex items-center"
                                              data={allData ? data : data[rowKey]}
                                              nestedlevel={nestedlevel}
                                              rowindex={rowindex}
                                          >
                                              {data[rowKey]}
                                          </Comp>)
                                      }
                                 </div>
                             </div>
                            )
                    })
                }
            </RowContainer>
        );
    }
}

Row.propTypes = {
    rowClass: PropTypes.string,
    data: PropTypes.object,
}

Row.defaultProps = {
    rowClass: "",
    data: {}
}

export default Row;
