import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { CONTENT_LINKS } from "../../pages/programs/Constants";
import PropTypes from "prop-types"
import {ArrowBack} from "../../pages/Constants";
import { BreadcrumbsDot } from "./style";

const BreadCrumbs = props => {
    const { location: { pathname }, section, bredCrumbsConfig, history: { go , push} } = props
    const pathnames = pathname.split("/").filter(x => x)
    // const newPath = CONTENT_LINKS.filter(a => pathnames.some(e => e === a.link))
    const pageName = pathnames[pathnames.length - 1]
    const { config } = bredCrumbsConfig.find(a => pageName === a.page)
    return (
        <div className="flex ls-02">
            {
                config.map(({name, link}, index) => {
                    const activeLink = config.length === index + 1
                    link = typeof link === "function" ? link(pathnames) : link
                    name = typeof name === "function" ? name(pathnames) : name
                    return (
                        <div
                            // key={name}
                            className="flex items-center">
                            {
                                !!index ? (
                                    <BreadcrumbsDot/>
                                ) : (
                                    <NavLink
                                        key={name}
                                        to={`${link}`}
                                    >
                                        <div
                                            className="mr-3"
                                            dangerouslySetInnerHTML={{__html: ArrowBack}}
                                        />
                                    </NavLink>
                                )
                            }
                            <NavLink
                                to={`/${link}`}
                                onClick={() => (console.log(link))}
                                className={`${activeLink ? "pointer-events-none" : "color-light-blue-2"} capitalize`}
                            >
                                {name}
                            </NavLink>
                        </div>
                    )
                })
            }
        </div>
    );
}

BreadCrumbs.propTypes ={
    location: PropTypes.object,
}

export default withRouter(BreadCrumbs)
