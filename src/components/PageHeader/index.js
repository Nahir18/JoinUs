import React, {Component} from 'react';
import BreadCrumbs from "../Breadcrumbs"
import NavContentBtn from "../NavContentButton";
import styled from "styled-components";

const PageTitle = styled.div`
    min-height: 28px;
`

class PageHeader extends Component {
    render() {
        const { pageData, section, children, links, bredCrumbsConfig } = this.props
        return (
            <div className="flex-container">
              <BreadCrumbs
                bredCrumbsConfig={bredCrumbsConfig}
                section={section}
                {...this.props}
              />
                <div className="flex mb-6 mt-4">
                    <PageTitle className="text-2xl font-bold">
                        { pageData ? pageData : " " }
                    </PageTitle>
                </div>
                <div
                    className="bg-white flex-container hidden m-b-24"
                    style={{"borderRadius": "4px"}}
                >
                    <NavContentBtn
                        {...this.props}
                        links={links}
                    />
                    {children}
                </div>
            </div>
        );
    }
}

export default PageHeader;
