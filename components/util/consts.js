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
        QnACommentsComponent: {
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
                }
            }
        }
    }
}
