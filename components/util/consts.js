export default {
    question: {
        content_max_len: 200
    },
    team: {
        description_max_len: 200
    },
    messages: {
        success: "Success",
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

        QnAQuestionComponent: {
            modes: {edit: 'edit', view: 'view'},
            formConfig: {
                modes: {add: 'add', edit: 'edit'},
                fields: {
                    id: {name: 'id', label: 'Id'},
                    name: {name: 'name', label: 'Title'},
                    sub_title: {name: 'sub_title', label: 'Sub Title'},
                    content: {name: 'content', label: 'Content'},
                    tags: {name: 'tags', label: 'Tags'}
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
            }
        }
    }
}
