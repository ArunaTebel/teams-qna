import _ from "lodash";

export default {
    crudItem: {
        content_max_len: 200
    },

    messages: {
        success: "Success",
        addSuccess: "Successfully Added!",
        updateSuccess: "Successfully Updated!",
        deleteSuccess: "Successfully Deleted!",
        error: "Error occurred",
    },

    components: {

        QnAHomePageComponent: {
            team: {
                description_max_len: 200
            },
        },

        QnAHorizontalLoaderComponent: {
            events: {loading: 'qna-horizontal-loader-loading'}
        },

        QnACommentListComponent: {
            formConfig: {
                modes: {add: 'add', edit: 'edit'},
                fields: {commentId: {name: 'commentId'}, comment: {name: 'comment'}},
                button: {
                    save: {
                        add: {label: 'Add Comment', color: 'green', icon: 'right arrow'},
                        edit: {label: 'Edit Comment', color: 'blue', icon: 'edit'}
                    },
                },
                textAreaContainer: {
                    add: {class: 'commentTextareaContainer'},
                    edit: {class: 'commentTextareaContainerFocused'},
                },
                validationRules: {
                    comment: {
                        presence: true,
                        length: {
                            minimum: 15,
                            maximum: 500,
                            tooShort: "should at least have %{count} characters",
                            tooLong: "should not exceed %{count} characters",
                        }
                    }
                }
            }
        },

        QnACrudItemStatsComponent: {
            actions: {UP: 'up', DOWN: 'down'},
            activeIconColor: 'teal',
            inactiveIconColor: 'black',
        },

        QnACrudItemComponent: {
            content_max_len: 200,
            sub_content_max_len: 60,
            crudItemTypes: {question: 'Question', answer: 'Answer'},
            modes: {add: 'add', edit: 'edit', view: 'view'},
            formConfig: {
                question: {
                    fields: {
                        id: {
                            name: 'id', label: 'Id', defaultVal: '', getValueFromObj: (question) => {
                                return question.id
                            }
                        },
                        name: {
                            name: 'name', label: 'Title', defaultVal: '', getValueFromObj: (question) => {
                                return question.name
                            }
                        },
                        sub_title: {
                            name: 'sub_title', label: 'Sub Title', defaultVal: '', getValueFromObj: (question) => {
                                return question.sub_title
                            }
                        },
                        content: {
                            name: 'content', label: 'Content', defaultVal: '', getValueFromObj: (question) => {
                                return question.content
                            }
                        },
                        tags: {
                            name: 'tags', label: 'Tags', defaultVal: [], getValueFromObj: (question) => {
                                return _.map(question.tag_details, (tag) => tag.id)
                            }
                        }
                    },
                    button: {
                        save: {
                            add: {label: 'Save', color: 'green', icon: 'right arrow'},
                            edit: {label: 'Update', color: 'blue', icon: 'edit'}
                        },
                    },
                    validationRules: {
                        name: {
                            presence: true,
                            length: {
                                minimum: 15,
                                maximum: 300,
                                tooShort: "should at least have %{count} characters",
                                tooLong: "should not exceed %{count} characters",
                            }
                        },
                        sub_title: {
                            presence: false,
                            length: {
                                minimum: 5,
                                maximum: 250,
                                tooShort: "should at least have %{count} characters",
                                tooLong: "should not exceed %{count} characters",
                            }
                        },
                        content: {
                            presence: true,
                            length: {
                                minimum: 50,
                                maximum: 65000,
                                tooShort: "should at least have %{count} characters",
                                tooLong: "should not exceed %{count} characters",
                            }
                        },
                    }
                },
                answer: {
                    fields: {
                        id: {
                            name: 'id', label: 'Id', defaultVal: '', getValueFromObj: (answer) => {
                                return answer.id
                            }
                        },
                        content: {
                            name: 'content', label: 'Content', defaultVal: '', getValueFromObj: (answer) => {
                                return answer.content
                            }
                        },
                        question: {
                            name: 'question', label: 'Question', defaultVal: '', getValueFromObj: (answer) => {
                                return answer.question
                            }
                        },
                    },
                    button: {
                        save: {
                            add: {label: 'Save', color: 'green', icon: 'right arrow'},
                            edit: {label: 'Update', color: 'blue', icon: 'edit'}
                        },
                    },
                    validationRules: {
                        content: {
                            presence: true,
                            length: {
                                minimum: 50,
                                maximum: 65000,
                                tooShort: "should at least have %{count} characters",
                                tooLong: "should not exceed %{count} characters",
                            }
                        },
                    }
                },
            }
        },

        QnAPaginationComponent: {
            pageSize: {
                default: 10
            }
        },

        QnAActivityLogListComponent: {
            activityTypes: {
                default: 10
            }
        },

        ArchQnAProfilePageComponent: {
            leftMenuTabs: [
                {
                    menuTitle: 'profile',
                },
                {
                    menuTitle: 'activities',
                },
            ],
            activityLogTabs: [
                {
                    logTarget: 'CURRENT_USER',
                    menuTitle: 'My Activity',
                    description: 'All the activities you have performed appear here',
                },
                {
                    logTarget: 'QUESTION_OWNER',
                    menuTitle: 'My Questions',
                    description: 'Activities on your Questions appear here',
                },
                {
                    logTarget: 'ANSWER_OWNER',
                    menuTitle: 'My Answers',
                    description: 'Activities on your Answers appear here',
                },
                {
                    logTarget: 'QUESTION_COMMENTED_USER',
                    menuTitle: 'My Question Comments',
                    description: 'Activities on your Comments on Questions appear here',
                },
                {
                    logTarget: 'ANSWER_COMMENTED_USER',
                    menuTitle: 'My Answer Comments',
                    description: 'Activities on your Comments on Answers appear here',
                },
            ]
        },

        QnASelectUserAvatarComponent: {
            avatarProps: {
                size: {
                    default: 150
                },
                topType: {
                    choices: ["NoHair", "Eyepatch", "Hat", "Hijab", "Turban", "WinterHat1", "WinterHat2", "WinterHat3", "WinterHat4", "LongHairBigHair", "LongHairBob", "LongHairBun", "LongHairCurly", "LongHairCurvy", "LongHairDreads", "LongHairFrida", "LongHairFro", "LongHairFroBand", "LongHairNotTooLong", "LongHairShavedSides", "LongHairMiaWallace", "LongHairStraight", "LongHairStraight2", "LongHairStraightStrand", "ShortHairDreads01", "ShortHairDreads02", "ShortHairFrizzle", "ShortHairShaggyMullet", "ShortHairShortCurly", "ShortHairShortFlat", "ShortHairShortRound", "ShortHairShortWaved", "ShortHairSides", "ShortHairTheCaesar", "ShortHairTheCaesarSidePart"],
                    default: "NoHair",
                },
                accessoriesType: {
                    choices: ["Blank", "Kurt", "Prescription01", "Prescription02", "Round", "Sunglasses", "Wayfarers"],
                    default: "Blank",
                },
                hairColor: {
                    choices: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
                    default: "Black",
                },
                facialHairType: {
                    choices: ["Blank", "BeardMedium", "BeardLight", "BeardMagestic", "MoustacheFancy", "MoustacheMagnum"],
                    default: "Blank",
                },
                facialHairColor: {
                    choices: ["Auburn", "Black", "Blonde", "BlondeGolden", "Brown", "BrownDark", "Platinum", "Red"],
                    default: "Auburn",
                },
                clotheType: {
                    choices: ["BlazerShirt", "BlazerSweater", "CollarSweater", "GraphicShirt", "Hoodie", "Overall", "ShirtCrewNeck", "ShirtScoopNeck", "ShirtVNeck"],
                    default: "BlazerShirt",
                },
                clotheColor: {
                    choices: ["Black", "Blue01", "Blue02", "Blue03", "Gray01", "Gray02", "Heather", "PastelBlue", "PastelGreen", "PastelOrange", "PastelRed", "PastelYellow", "Pink", "Red", "White"],
                    default: "Black",
                },
                eyeType: {
                    choices: ["Close", "Cry", "Default", "Dizzy", "EyeRoll", "Happy", "Hearts", "Side", "Squint", "Surprised", "Wink", "WinkWacky"],
                    default: "Default",
                },
                eyebrowType: {
                    choices: ["Angry", "AngryNatural", "Default", "DefaultNatural", "FlatNatural", "RaisedExcited", "RaisedExcitedNatural", "SadConcerned", "SadConcernedNatural", "UnibrowNatural", "UpDown", "UpDownNatural"],
                    default: "Default",
                },
                mouthType: {
                    choices: ["Concerned", "Default", "Disbelief", "Eating", "Grimace", "Sad", "ScreamOpen", "Serious", "Smile", "Tongue", "Twinkle", "Vomit"],
                    default: "Default",
                },
                skinColor: {
                    choices: ["Tanned", "Yellow", "Pale", "Light", "Brown", "DarkBrown", "Black"],
                    default: "Tanned",
                },
            }
        },

        QnAUserAvatarComponent: {
            size: 45,
        }
    }
}
