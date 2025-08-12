let titles = ["Mobile App Redesign", "Q4 Analytics Dashboard", "Product Launch Campaign"];
let tt = 4;

async function sideBarSwitch() {// {{{}}}
    document.getElementById('content1').addEventListener('click', () => {
        document.getElementById('home').style.display = "block";
        document.getElementById('projects').style.display = "none";
        document.getElementById('tasks').style.display = "none";

    })
    document.getElementById('content2').addEventListener('click', () => {
    
	    document.getElementById('home').style.display = "none";
        document.getElementById('projects').style.display = "block";
        document.getElementById('tasks').style.display = "none";
    })
    document.getElementById('content3').addEventListener('click', () => {
        document.getElementById('home').style.display = "none";
        document.getElementById('projects').style.display = "none";
        document.getElementById('tasks').style.display = "block";
    })
    document.getElementById('rpViewAll').addEventListener('click', () => {
        document.getElementById('home').style.display = "none";
        document.getElementById('projects').style.display = "block";
        document.getElementById('tasks').style.display = "none";
    })
}

async function aiBot() {
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
            //console.log("user : " + ques.message);
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

    const ProjectDetails = async (val) => {
        document.getElementById("chat").innerHTML += `<div id="manText">
                    <p id="manReply" style="white-space: pre-line;">${val}</p>
            </div>`;
        document.getElementById("chat").scrollTo({ top: document.getElementById("chat").scrollHeight, behavior: "smooth" })
        let i = 10;
        while (val[i] != '&') {
            i++;
        }
        let nameOfProject = val.slice(10, i);
        let prompt = val.slice(i + 9, val.length);

    
	    const addProjectOutput = async (val, nameOfProject) => {
            let nval = '';
            for (let i = 0; i < val.length - 1; i++) {
                let txt = '' + val[i] + val[i + 1];
                if (txt == "**") {
                    i++;
                }
                else if (txt == "##") {
                    i += 2;
                }
                else {
                    nval += val[i];
                }
            }
            const rukja = async (nval) => {
                //console.log("A.I. : " + nval);
                
                document.getElementById('wordEditor').innerHTML += `<div id="contentWrite${tt}" class="contentWrite" contenteditable="true" spellcheck="false">${nval}</div>`
                document.getElementById("chat").innerHTML += `<div id="botText">
                <div id="circleBox">
                    <div id="circle2"><i class="ri-robot-2-fill" id="boticn"></i></div>
                </div>
                    <p id="botReply" style="white-space: pre-line;">Your Project is added to the list</p>
            </div>`
                document.getElementById("chat").scrollTo({ top: document.getElementById("chat").scrollHeight, behavior: "smooth" })
                //console.log(`content ${tt} added`);
            }
            rukja(nval);
            
            projects(nameOfProject);
        }
        const generateOutputProject = async (val, nameOfProject) => {
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
                //console.log("user : " + ques.message);
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
                addProjectOutput(AIresponse, nameOfProject);
            } catch (err) {
                console.error(err);
            }
	}

        generateOutputProject(prompt, nameOfProject);
        return nameOfProject;
    }

    async function projects(name) {

        if (name) {
            
            titles[titles.length] = name;
            
            document.getElementById("projectNames").innerHTML += `<div id="PName${titles.length}" class="PName">
                        <div id="PNum">${titles.length}</div>
                        <div id="PDetails${titles.length}" class="PDetails">${titles[titles.length - 1]}<p id="PDetailsdot${titles.length}" class="PDetailsdot">--</p></div>
                    </div>`;

            ++tt;

        }


        let num = 1;
        document.getElementById('newProjectHeader').addEventListener('click', () => {
            document.getElementById('home').style.display = "none";
            document.getElementById('projects').style.display = "block";
            document.getElementById('tasks').style.display = "none";

            document.getElementById("projectNames").innerHTML += `<div id="PName${tt}" class="PName">
                        <div id="PNum">${tt}</div>
                        <div id="PDetails${tt}" class="PDetails">--<p id="PDetailsdot${tt}" class="PDetailsdot">--</p></div>
                    </div>`;
            document.getElementById('wordEditor').innerHTML += `<div id="contentWrite${tt}" class="contentWrite" contenteditable="true" spellcheck="false"></div>`;
            titles[tt - 1] = '--';
            
            ++tt;
            pp();
        })

        const pp = async () => {
            for (let i = 1; i <= titles.length; i++) {
                let p = document.getElementById(`contentWrite${i}`).innerHTML;

                document.getElementById(`PDetailsdot${i}`).innerHTML = p.slice(0, 20) + "...";

                document.getElementById(`PName${i}`).addEventListener('click', () => {
                    document.getElementById(`contentWrite${i}`).style.display = "block";
                    document.getElementById("PT").value = titles[i - 1];
                    for (let j = 1; j <= titles.length; j++) {
                        if (j != i) {
                            document.getElementById(`contentWrite${j}`).style.display = "none";
                        }
                    }
                    //console.log(`we're in the ${i}th container`);

                    document.getElementById('save').addEventListener('click', () => {
                        let naame = document.getElementById('PT').value;
                        titles[i - 1] = naame;
                        let details = document.getElementById(`contentWrite${i}`).innerHTML.slice(0, 20) + "...";
                        //console.log(titles);
                        document.getElementById(`PDetails${i}`).innerHTML = `${titles[i - 1]}<p id="PDetailsdot${i}" class="PDetailsdot">${details}</p></div>`;
                    })
                })
            }
        }

        pp();



    }

    const input = async () => {
        document.getElementById("input").addEventListener('keydown', async (e) => {
            const messageInput = document.getElementById("input").value;
            if (e.key == 'Enter' && messageInput) {
                if (messageInput.slice(0, 9) == 'project :') {
                    //console.log("input")
                    await ProjectDetails(messageInput);
                    document.getElementById("input").value = "";
                    
                }
                else {
                    handleInput(messageInput);
                    document.getElementById("input").value = "";
                    
                }
            }
        })
        document.querySelector(".ri-send-plane-fill").addEventListener('click', async () => {
            const messageInput = document.getElementById("input").value;
            if (messageInput.slice(0, 9) == 'project :') {
                //console.log("input")
                await ProjectDetails(messageInput);
                document.getElementById("input").value = "";
            }
            else {
                handleInput(messageInput);
                document.getElementById("input").value = "";
            }
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
            else if (txt == "##") {
                i += 2;
            }
            else {
                nval += val[i];
            }
        }
        //console.log("A.I. : " + nval);
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
        document.querySelector(".ri-arrow-down-wide-line").addEventListener('click', () => {
            document.getElementById("chatbox").style.transform = "translate(56%,54.5%) scale(0)";
            document.querySelector(".ri-message-3-fill").style.transform = "scale(1.2) rotate(0deg)";
        })

        input();
    }

    main();
    projects();
}
async function calendar() {
    const monthYearElement = document.getElementById('monthYr');
    const datesElement = document.getElementById('dates');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let currentDate = new Date();

    const updateCalendar = () => {
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth();

        const firstDay = new Date(currentYear, currentMonth, 0);
        const lastDay = new Date(currentYear, currentMonth + 1, 0);
        const totalDays = lastDay.getDate();
        const firstDayIndex = firstDay.getDay();
        const lastDayIndex = lastDay.getDay();

        const monthYearString = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        monthYearElement.textContent = monthYearString;

        let datesHTML = '';
        let i = 0, j = 0;
        for (i = firstDayIndex; i > 0; i--) {
            const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
            datesHTML += `<div class="date inactive" id="d${j}">${prevDate.getDate()}</div>`;
            j++;
        }

        for (i = 1; i <= totalDays; i++) {
            const date = new Date(currentYear, currentMonth, i);
            const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
            datesHTML += `<div class="date ${activeClass}" id="d${j}">${i}</div>`;
            j++;
        }

        for (i = 1; i <= 7 - lastDayIndex; i++) {
            const nextDate = new Date(currentYear, currentMonth + 1, i);
            datesHTML += `<div class="date inactive" id="d${j}">${nextDate.getDate()}</div>`;
            j++;
        }
        datesElement.innerHTML = datesHTML;

    }

    prevBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() - 1);
        updateCalendar();
    })
    nextBtn.addEventListener('click', () => {
        currentDate.setMonth(currentDate.getMonth() + 1);
        updateCalendar();
    })

    updateCalendar();
}

sideBarSwitch();
calendar();
aiBot();

//give me one mobile icon class name from remix icon. dont show me how to use it or anything else. just give me the name : ri-file-text-lin or ri-robot-line
