import React from 'react';
import PropTypes from 'prop-types';
import BreadCrumbs from "@Components/Breadcrumbs"
import NavContentBtn from "@Components/NavContentButton"
import styled from "styled-components";
import {
    PAGE_LINK_PROGRAMS,
    NEW_LEVEL,
    PAGE_LINK_LEVEL,
    NEW_PROGRAM,
    PAGE_NAME_NEW_PROGRAM,
    PAGE_NAME_NEW_LEVEL, PAGE_LINK_STAGE_PAGE, NEW_STAGE, PAGE_NAME_NEW_STAGE
} from "../../pages/programs/Constants";

const ContentArea = styled.div`
    border-radius: 4px;
`
const PageTitle = styled.div`
    min-height: 28px;
`

const HeaderTitle = (props) => {
    const { children, bredCrumbsConfig, section, links } = props
    const { location: { pathname } } = props
    const pathNames = pathname.split("/").filter(x => x)
    const title = (section) => {
        switch (section) {
            case PAGE_LINK_PROGRAMS:
                return pathNames[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathNames[1]
            case PAGE_LINK_LEVEL:
                return pathNames[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Уровень "${pathNames[4]}"`
            case PAGE_LINK_STAGE_PAGE:
                return pathNames[4] === NEW_STAGE ? PAGE_NAME_NEW_STAGE : `Этап "${pathNames[4]}"`
        }
    }
    return (
        <div className="flex-container">
            <BreadCrumbs
                bredCrumbsConfig={bredCrumbsConfig}
                {...props}
            />
            <div className="flex mb-6 mt-4">
                <PageTitle className="text-2xl font-bold">
                    { title(section) }
                </PageTitle>
            </div>
            <ContentArea
                className="bg-white flex-container hidden m-b-24"
            >
                <NavContentBtn
                    {...props}
                    links={links}
                />
                {children}
            </ContentArea>
        </div>

    );
};

HeaderTitle.propTypes = {
    children: PropTypes.array,
    bredCrumbsConfig: PropTypes.array,
    section: PropTypes.string,
    links: PropTypes.array,
};

export default HeaderTitle;