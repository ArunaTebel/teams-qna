import _ from "lodash";

export default {
    crudItem: {
        content_max_len: 200
    },
    team: {
        description_max_len: 200
    },
    messages: {
        success: "Success",
        addSuccess: "Successfully Added!",
        updateSuccess: "Successfully Updated!",
        deleteSuccess: "Successfully Deleted!",
        error: "Error occurred",
    },
    components: {

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
        QnACrudItemComponent: {
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
        }
    }
}
