function incomingMessage(msg) {
    appendMessage(
        `<div class="media w-50 mb-3">
            <div class="media-body ml-3">
            <div class="bg-light rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-muted">${msg.text}</p>
            </div>
            <p class="small text-muted">${msg.user} | ${msg.date}</p>
            </div>
        </div> `
    );
}

function appendOwnMessage(msg) {
    appendMessage(
    `<div class="media w-50 ml-auto mb-3">
        <div class="media-body">
            <div class="bg-primary rounded py-2 px-3 mb-2">
                <p class="text-small mb-0 text-white">${msg}</p>
            </div>
            <p class="small text-muted">${new Date().getHours()}:${new Date().getMinutes()}</p>
        </div>
    </div>`
    );
}

function appendMessage(msg) {
    $('#chatBox').append(msg);
    $("#chatBox").scrollTop($("#chatBox")[0].scrollHeight);
}

function newUser(user) {
    $('#users').append(
        `<a class="list-group-item list-group-item-action text-grey rounded-0" id="user${user}">
            <div class="media-body ml-4">
                <div class="d-flex align-items-center justify-content-between mb-0">
                    <h6 class="mb-0">${user}</h6>
                </div>
            </div>
        </a>`
    );
}

function removeUser(user) {
    $(`#user${user}`).remove();
}