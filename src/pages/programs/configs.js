import {
    NEW_PROGRAM,
    NEW_STAGE,
    PAGE_NAME_PROGRAMS,
    PAGE_NAME_GENERAL,
    PAGE_NAME_CONTACTS,
    PAGE_NAME_DOCUMENTS,
    PAGE_NAME_LEVELS,
    PAGE_NAME_NEW_LEVEL,
    PAGE_NAME_NEW_PROGRAM,
    PAGE_NAME_GOALS,
    PAGE_NAME_STAGES,
    PAGE_NAME_BLOCKS,
    PAGE_LINK_PROGRAMS,
    PAGE_LINK_GENERAL,
    PAGE_LINK_LEVELS,
    PAGE_LINK_CONTACTS,
    PAGE_LINK_DOCUMENTS,
    PAGE_LINK_GOALS,
    PAGE_LINK_STAGES,
    PAGE_LINK_BLOCKS, NEW_LEVEL, PAGE_NAME_NEW_STAGE
} from "./Constants";

const programsPageBreadcrumbsConfig = [
    {
        name: PAGE_NAME_PROGRAMS,
        link: PAGE_LINK_PROGRAMS
    },
    {
        name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
        link: ""
    }
]

export const programsBreadcrumbs = [
    {
        page: "New_level",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: "Новый уровень",
                link: "/programs"
            }
        ]
    },
    {
        page: PAGE_LINK_GENERAL,
        config: programsPageBreadcrumbsConfig
    },
    {
        page: PAGE_LINK_LEVELS,
        config: programsPageBreadcrumbsConfig
    },
    {
        page: PAGE_LINK_CONTACTS,
        config: programsPageBreadcrumbsConfig
    },
    {
        page: PAGE_LINK_DOCUMENTS,
        config: programsPageBreadcrumbsConfig
    },
    {
        page: PAGE_LINK_GOALS,
        config: programsPageBreadcrumbsConfig
    }
]
export const levelsBreadcrumbs = [
    {
        page: PAGE_LINK_GENERAL,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Уровень "${pathname[4]}"`,
                link: "/"
            }
        ]
    },
    {
        page: PAGE_LINK_STAGES,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Уровень "${pathname[4]}"`,
                link: "/"
            }
        ]
    },
    {
        page: "newStage",
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: PAGE_NAME_GENERAL,
                link: "/"
            }
        ]
    },
    {
        page: PAGE_LINK_PROGRAMS,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Уровень "${pathname[4]}"`,
                link: "/"
            }
        ]
    },
    {
        page: "blocks",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Блоки",
                link: "/"
            }
        ]
    },
    {
        page: "levels",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Уровни",
                link: "/"
            }
        ]
    },
]
export const StagesBreadcrumbs = [
    {
        page: PAGE_LINK_GENERAL,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_STAGE ? PAGE_NAME_NEW_STAGE : `Этап "${pathname[4]}"`,
                link: "/"
            }
        ]
    },
    {
        page: NEW_STAGE,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Этап "${pathname[4]}"`,
                link: "/"
            }
        ]
    },
    {
        page: PAGE_LINK_BLOCKS,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Этап "${pathname[4]}"`,
                link: "/"
            }
        ]
    },
    {
        page: PAGE_LINK_LEVELS,
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: PAGE_LINK_PROGRAMS
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? PAGE_NAME_NEW_PROGRAM : pathname[1]}`,
                link: (pathname) => `${PAGE_LINK_PROGRAMS}/${pathname[1]}/${pathname[2]}/${PAGE_LINK_GENERAL}`
            },
            {
                name: (pathname) => pathname[4] === NEW_LEVEL ? PAGE_NAME_NEW_LEVEL : `Этап "${pathname[4]}"`,
                link: "/"
            }
        ]
    }
]
