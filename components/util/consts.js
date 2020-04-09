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
        }
    }
}
