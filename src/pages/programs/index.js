import React from 'react';
import PropTypes from 'prop-types';
import {Route, useParams} from "react-router-dom"
import Goals from "./item/Goals";
import Levels from "./item/levels";
import Contacts from "./item/Contacts";
import Documents from "./item/Documents";
import NewProgram from "./item/General";
import ProgramsList from "./list/ProgramsList";
import LevelsGeneral from "../../pages/programs/Stages/General";
import levelStages from "./Stages/Stages";
import StagesGeneral from "./Levels/General"
import LevelsProgramsList from "./Stages/ProgramsList"
import Blocks from "./Levels/Blocks"
import LevelsList from "./Levels/LevelsList"
import HeaderTitle from "../../components/PageHeaderTitle";
import {programsBreadcrumbs, levelsBreadcrumbs, StagesBreadcrumbs} from "./configs";
import {
    NAV_BUTTON_LINKS,
    LEVELS_LINKS,
    PAGE_LINK_PROGRAMS,
    NEW_LEVEL,
    PAGE_LINK_LEVEL,
    PAGE_LINK_LEVELS,
    PAGE_LINK_STAGE, PAGE_NAME_GENERAL, PAGE_LINK_GENERAL, PAGE_LINK_STAGE_PAGE, STAGES_LINKS, NEW_STAGE, NEW_PROGRAM
} from "./Constants";

const Programs = (props) => {
    const { location: { pathname } } = props
    const pathNames = pathname.split("/").filter(x => x)

    return (
        <div className="flex-container">
            {
                pathname === `/${PAGE_LINK_PROGRAMS}`
                  ?
                    (
                        <Route path="/programs" component={ProgramsList} />
                    )
                  : pathNames[3] === PAGE_LINK_LEVEL || pathNames[4] === NEW_LEVEL
                  ? (
                        <HeaderTitle
                            {...props}
                            bredCrumbsConfig={levelsBreadcrumbs}
                            section={PAGE_LINK_LEVEL}
                            links={pathNames[4] === NEW_LEVEL ? [{
                                name: PAGE_NAME_GENERAL,
                                link: PAGE_LINK_GENERAL
                            }] : LEVELS_LINKS}
                        >
                            <Route exact path="/programs/:programName/:programID/level/:levelName/:levelID/general" component={LevelsGeneral} />
                            <Route exact path="/programs/:programName/:programID/level/:levelName/:levelID/levelStages/newStage" component={StagesGeneral}/>
                            <Route exact path="/programs/:programName/:programID/level/:levelName/:levelID/levelStages" component={levelStages}/>
                            <Route path="/programs/:programName/:programID/level/:levelName/:levelID/programs" component={LevelsProgramsList}/>
                            <Route path="/programs/:programName/:programID/level/New_Level/general" component={LevelsGeneral} />
                        </HeaderTitle>
                    ) : pathNames[3] === PAGE_LINK_STAGE_PAGE ? (
                        <HeaderTitle
                            {...props}
                            bredCrumbsConfig={StagesBreadcrumbs}
                            section={PAGE_LINK_STAGE_PAGE}
                            links={pathNames[4] === NEW_STAGE ?
                                [{
                                    name: PAGE_NAME_GENERAL,
                                    link: PAGE_LINK_GENERAL
                                }] :
                                STAGES_LINKS}
                        >
                            <Route path="/programs/:programName/:programID/stage/:stageName/:stageID/general" component={StagesGeneral} />
                            <Route path="/programs/:programName/:programID/stage/New_Stage/general" component={StagesGeneral} />
                            <Route path="/programs/:programName/:programID/stage/:stageName/:stageID/blocks" component={Blocks} />
                            <Route path="/programs/:programName/:programID/stage/:stageName/:stageID/levels" component={LevelsList} />
                        </HeaderTitle>
                    ) : (
                        <HeaderTitle
                            {...props}
                            bredCrumbsConfig={programsBreadcrumbs}
                            section={PAGE_LINK_PROGRAMS}
                            links={pathNames[1] === NEW_PROGRAM ? [{
                                name: PAGE_NAME_GENERAL,
                                link: PAGE_LINK_GENERAL
                            }] : NAV_BUTTON_LINKS}
                        >
                            <Route path="/programs/general" component={NewProgram}/>
                            <Route path="/programs/:programName/:programID/levels" component={Levels}/>
                            <Route path="/programs/:programName/:programID/contacts" component={Contacts}/>
                            <Route path="/programs/:programName/:programID/documents" component={Documents}/>
                            <Route path="/programs/:programName/:programID/goals" component={Goals}/>
                            <Route path="/programs/:programName/:programID/general" component={NewProgram}/>
                            <Route path="/programs/:programName/general" component={NewProgram}/>
                            <Route path="/programs/new_program/levels" component={Levels}/>
                            <Route path="/programs/new_program/contacts" component={Contacts}/>
                            <Route path="/programs/new_program/documents" component={Documents}/>
                            <Route path="/programs/new_program/goals" component={Goals}/>
                        </HeaderTitle>
                )
            }
        </div>
    );
};

Programs.propTypes = {
    location: PropTypes.object,
};

export default Programs;
