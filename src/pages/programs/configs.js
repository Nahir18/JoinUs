import {
    PAGE_NAME_GENERAL,
    PAGE_NAME_STAGES,
    PAGE_NAME_PROGRAMS,
    PAGE_NAME_LEVELS,
    NEW_PROGRAM
} from "./Constants";

export const programsBreadcrumbs = [
    {
        page: "New_level",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: "Новый уровень",
                link: "/programs"
            }
        ]
    },
    {
        page: "general",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: "Общие",
                link: ""
            }
        ]
    },
    {
        page: "levels",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: "Уровни",
                link: "/"
            }
        ]
    },
    {
        page: "contacts",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: "Контакты",
                link: "/"
            }
        ]
    },
    {
        page: "documents",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: "Документы",
                link: "/"
            }
        ]
    },
    {
        page: "goals",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: "Цели",
                link: "/"
            }
        ]
    }
]

export const levelsBreadcrumbs = [
    {
        page: "general",
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === NEW_PROGRAM ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: PAGE_NAME_GENERAL,
                link: "/"
            }
        ]
    },
    {
        page: "levelStages",
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: PAGE_NAME_STAGES,
                link: "/"
            }
        ]
    },
    {
        page: "newStage",
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Общие",
                link: "/"
            }
        ]
    },
    {
        page: "programs",
        config:[
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
            },
            {
                name: (pathname) =>`${pathname[1] === "new_program" ? "Новая програма" : pathname[1]}`,
                link: (pathname) => `programs/${pathname[1]}/${pathname[2]}/general`
            },
            {
                name: "Программы",
                link: "/"
            }
        ]
    },
    {
        page: "blocks",
        config: [
            {
                name: PAGE_NAME_GENERAL,
                link: "programs"
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
                link: "programs"
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
