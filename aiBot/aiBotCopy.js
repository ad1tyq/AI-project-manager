
const API_KEY = "AIzaSyAgHfEw45M0vwdfBssnGpEfQxzf5xPHu0s";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;



const generateOutput = async (val) => {
    const ques = {
        message: val,
    }
    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            "contents": [{
                "parts": [{ "text": ques.message }]
            }]
        })
    }
    try {
        console.log("user : " + ques.message);
        const before = document.getElementById("chat").innerHTML;
        document.getElementById("chat").innerHTML += `<div id="botText">
                <div id="circleBox">
                    <div id="circle2"><i class="ri-robot-2-fill" id="boticn"></i></div>
                </div>
                    <p id="botReply" style="white-space: pre-line;">Thinking...</p>
                </div>`
        const response = await fetch(API_URL, request);
        document.getElementById("chat").innerHTML = before;
        const data = await response.json();
        if (!response.ok) throw new Error(data.error.message)
        const AIresponse = data.candidates[0].content.parts[0].text;
        handleOutput(AIresponse)
    } catch (err) {
        console.error(err);
    }
}


const input = async () => {
    document.getElementById("input").addEventListener('keydown', (e) => {
        const messageInput = document.getElementById("input").value;
        if (e.key == 'Enter' && messageInput) {
            handleInput(messageInput);
            document.getElementById("input").value = "";
            return messageInput;
        }
    })
    document.querySelector(".ri-send-plane-fill").addEventListener('click', () => {
        const messageInput = document.getElementById("input").value;
        handleInput(messageInput);
        document.getElementById("input").value = "";
        return messageInput;
    })
}


const handleInput = async (val) => {
    document.getElementById("chat").innerHTML += `<div id="manText">
                    <p id="manReply" style="white-space: pre-line;">${val}</p>
            </div>`;
    generateOutput(val)

    document.getElementById("chat").scrollTo({ top: document.getElementById("chat").scrollHeight, behavior: "smooth" })
}


const handleOutput = async (val) => {
    let nval = '';
    for (let i = 0; i < val.length - 1; i++) {
        let txt = '' + val[i] + val[i + 1];
        if (txt == "**") {
            i++;
        }
        else if(txt == "##"){
            i+=2;
        }
        else {
            nval += val[i];
        }
    }
    console.log("A.I. : " + nval);
    document.getElementById("chat").innerHTML += `<div id="botText">
                <div id="circleBox">
                    <div id="circle2"><i class="ri-robot-2-fill" id="boticn"></i></div>
                </div>
                    <p id="botReply" style="white-space: pre-line;">${nval}</p>
            </div>`
    document.getElementById("chat").scrollTo({ top: document.getElementById("chat").scrollHeight, behavior: "smooth" })
}

function main() {
        document.getElementById("icon").addEventListener('click', () => {
            document.getElementById("chatbox").style.transform = "translate(0%,0%) scale(1)";
            document.querySelector(".ri-message-3-fill").style.transform = "scale(1.2) rotate(360deg)";
        })
        document.querySelector(".ri-arrow-down-wide-line").addEventListener('click', ()=>{
            document.getElementById("chatbox").style.transform = "translate(56%,54.5%) scale(0)";
            document.querySelector(".ri-message-3-fill").style.transform = "scale(1.2) rotate(0deg)";
        })

    input();
}
main();
