const codeEditor = CodeMirror.fromTextArea(document.getElementById("code"), {
    styleActiveLine: true,
    lineNumbers: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    autoCloseTags: true,
    mode: "javascript",
    theme: "dracula"
})
codeEditor.setSize("100%", 400);

const editor = document.getElementById("editorCurrentLine");
const editorContent = document.getElementById("editorContent");
const cursorLine = "<span id=\"cursor\">&nbsp;</span>"

editor.addEventListener('paste', (event) => {
    let paste = (event.clipboardData || window.clipboardData).getData('text');
    const string = editor.innerHTML.replace(cursorLine, paste + cursorLine);
    currentCommand += paste;
    console.log(string, event.data);
    editor.innerHTML = string;
    event.preventDefault();
});

var content = "Welcome to Genez.io! Type 'genezio deploy' to deploy your function!</br>";
var currentCommand = "";

editor.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        console.log("Execute command", currentCommand);
        content += "$ " + currentCommand + "</br>";

        if (currentCommand === "genezio deploy") {
            const sourceCode = codeEditor.getValue();
            console.log("source code", sourceCode);

            fetch('https://os2zxsiug9.execute-api.us-east-1.amazonaws.com/Dev/uploadCode', {
                method: "PUT", // or "PUT" with the url changed to, e.g "https://reqres.in/api/users/2"
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(
                    { code: btoa(sourceCode) }
                )
            }).then((response) => {
                return response.json();
            }).then((response) => {
                console.log(response);
                console.log(response.id);
                content += "</br>Your code was succesfully deployed! You can try your new API by making a GET request at URL https://os2zxsiug9.execute-api.us-east-1.amazonaws.com/Dev/api/" + response.id + ".</br></br> You can do this from this terminal by running the command `curl https://os2zxsiug9.execute-api.us-east-1.amazonaws.com/Dev/api/" + response.id + "`.</br></br>";
                editor.innerHTML = content;
                editor.innerHTML += "$ " + cursorLine;
                editor.scrollTop = editor.scrollHeight;
            });
        } else if (currentCommand.startsWith("curl")) {
            const components = currentCommand.split(" ");
            console.log(components);
            if (components.length !== 2) {
                content += "</br>curl: Try 'curl [url]'.</br>";
                editor.innerHTML = content;
                editor.innerHTML += "$ " + cursorLine;
            } else {
                console.log("Make request at", components[1]);
                fetch(components[1])
                    .then((response) => response.json())
                    .then((response) => {
                        content += JSON.stringify(response) + "</br>";
                        editor.innerHTML = content;
                        editor.innerHTML += "$ " + cursorLine;
                        editor.scrollTop = editor.scrollHeight;
                    });
            }
        } else {
            content += "Command not found! Type 'help to see the available commands. </br>";
            editor.innerHTML = content;
            editor.innerHTML += "$ " + cursorLine;
        }

        e.preventDefault();
        currentCommand = "";
        editor.scrollTop = editor.scrollHeight;
        return;
    } else if (e.key === "Backspace") {
        if (currentCommand.length === 0) {
            e.preventDefault();
            return;
        }
        const index = editor.innerHTML.indexOf(cursorLine) - 1;
        console.log("Replace", editor.innerHTML.replace(editor.innerHTML[index] + cursorLine, cursorLine));
        editor.innerHTML = editor.innerHTML.replace(editor.innerHTML[index] + cursorLine, cursorLine);
        currentCommand = currentCommand.slice(0, -1)
        e.preventDefault();
        return;
    } else if (e.metaKey === true || e.key.length > 1) {
        return;
    }
    const string = editor.innerHTML.replace(cursorLine, event.key + cursorLine);
    currentCommand += event.key;

    editor.innerHTML = string;

    e.preventDefault();
});

const baseURL = document.getElementById("baseUrl");
baseURL.addEventListener("keydown", function (e) {
    if (e.key === "Backspace") {
        if (baseURL.value === "https://api.genez.io/") {
            e.preventDefault();
        }
    }
});