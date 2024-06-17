import React, { useState, useEffect } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import "./index.css";

function CadetAssistant() {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(
    process.env.REACT_APP_GOOGLE_API_KEY
  );

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  const generationConfig = {
    temperature: 0.1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  const chatSession = model.startChat({
    generationConfig,
    // safetySettings: Adjust safety settings
    // See https://ai.google.dev/gemini-api/docs/safety-settings
    history: [
      {
        role: "user",
        parts: [
          {
            text: "You are a Chat bot to help junior cadets of school level. go though these lessons and summaries and if you cant answer to a question refer to the http://cadet.gov.lk/ for more informations.\n\nrefer to these information and answer questions accordingly.\n\nDisaster management is,\nIt is a systematic approach to disaster related uncertainties.\n\nFactors affecting sudden disasters\nEnvironmental factors\nTechnical factors\nHuman activity\nPolitical parties\n\nSteps to be taken to manage the disaster when it is identified\nAvoiding disaster\nDisaster reduction\nResilience (coping with adversity)\nAssignment to another party (insurance)\n\nThe present Disaster Management Act\nSri Lanka Disaster Management Act No. 30 of 2005\n\nAgencies to contact in case of emergency\nDisaster Management Authority\nMinistry of Disaster Management and Human Resources\nDisaster Management Centre\nDivisional Secretariat\nVillage Service Officers\nSchool Safety Committees\n\nIdentified disasters to be managed under the Disaster Management Act\nFloods, landslides, earthquakes, fires, epidemics, tornadoes, lightning, explosions, air accidents, industrial hazards, civil or internal conflicts, chemical accidents, radiological accidents, nuclear accidents\n\nNatural causes of landslides\nGeological movements\nheavy rain\nPrecipitous slopes of mountain ranges\nStructure of rocks and its weathering\nPoor drainage pattern\nDecrease in vegetation cover\n\n2.⁠ ⁠What are the basic qualifications required to join as a senior cadet ?\n\nHeight not less than 150cm\nChest not less than 75cm\nNot less than 14 years of age\n\n 3.⁠ ⁠What are the uniforms of a cadet\n\nCeramonial kit\nPT kit\nDrill kit\nOverall kit\n\n04.Who was the first in sri lanka to start cadet training for school children and What was the starting year ?\n\nIn june 1881 at the Royal College Principal by Mr.John B.Kal\n\n05.What is the starting year of volunteer infantry unit of sri lanka ?\n\nIn 1st April 1881\n\n06.What is the motto of the cadet crops ?\n\nNever Be Unprepared\n\n01.What are the types of cadets in the international cadet crops ?\n\n1.Senior cadet\n2.Junior cadet\n3.Band cadet\n4.Police cadet",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You're asking great questions! I can help you with some of them, but for more detailed information, you should definitely check out the website you provided: http://cadet.gov.lk/\n\nHere are the answers I can provide:\n\n**1. What are the types of cadets in the international cadet crops?**\n\nWhile the website you provided focuses on Sri Lankan cadets, you're right to ask about international variations.  The types of cadets can vary depending on the country and organization.  Here are some common types:\n\n* **Junior Cadets:** These are typically younger cadets, often in middle or high school. They focus on basic skills like drill, first aid, and teamwork.\n* **Senior Cadets:** These are older cadets, often in high school or college. They may have more advanced training in leadership, military skills, and community service.\n* **Band Cadets:** These cadets focus on music and play instruments in the cadet band.\n* **Police Cadets:** These cadets are associated with police forces and learn about law enforcement, community policing, and safety.\n\n**2. What are the basic qualifications required to join as a senior cadet?**\n\nThe website you provided mentions the qualifications for joining as a cadet in Sri Lanka.  These are:\n\n* **Height:** Not less than 150cm\n* **Chest:** Not less than 75cm\n* **Age:** Not less than 14 years of age\n\n**3. What are the uniforms of a cadet?**\n\nThe website mentions the following uniforms:\n\n* **Ceremonial Kit:** This is the formal uniform worn for parades and special occasions.\n* **PT Kit:** This is the uniform worn for physical training and sports activities.\n* **Drill Kit:** This is the uniform worn for drill practice.\n* **Overall Kit:** This is a more casual uniform worn for everyday activities.\n\n**4. Who was the first in Sri Lanka to start cadet training for school children and what was the starting year?**\n\nAccording to the information you provided, Mr. John B. Kal, the Principal of Royal College, started cadet training for school children in **June 1881**.\n\n**5. What is the starting year of the volunteer infantry unit of Sri Lanka?**\n\nThe information you provided states that the volunteer infantry unit of Sri Lanka started on **1st April 1881**.\n\n**6. What is the motto of the cadet corps?**\n\nThe motto of the cadet corps is **\"Never Be Unprepared.\"**\n\n**Remember:** For more detailed information about the Sri Lankan cadet program, visit the website: http://cadet.gov.lk/ \n",
          },
        ],
      },
      {
        role: "user",
        parts: [
          {
            text: "always get answers only from the above text. if you cant find answers reffer to the website provided",
          },
        ],
      },
      {
        role: "model",
        parts: [
          {
            text: "You got it! I'll stick to the provided text and the website for my answers.  Let's see what questions you have. \n",
          },
        ],
      },
    ],
  });
  // const prompt = "Write a story about a magic backpack.";

  // AIzaSyA2CeTxTa-CCFeyR2r4yXOzCI58lmkNmek
  let message = "";
  let reposnse = "";
  const Chat = async () => {
    const loader = document.getElementById("loader");
    loader.style.display = "block";
    reposnse = "";
    const result = await chatSession.sendMessage(message);
    console.log(result.response.text());

    reposnse = result.response.text();
    typeWriter();
  };

  // setInterval(() => {
  //   console.log(message);
  // }, 100);
  var i = 0;
  var speed = 40;
  function convertToListItems(text) {
    const listItemPattern = /\* \*\*/g;
    var listItemHTML = text.replace(listItemPattern, "<li>");
    const listendpattern = /:\*\*/g;
    listItemHTML = listItemHTML.replace(listendpattern, "</li>");

    return `<ul>${listItemHTML}</ul>`;
  }
  function convertBold(text) {
    const listItemPattern = /\*\*/g;
    var listItemHTML = text.replace(listItemPattern, "<b>");
    const listendpattern = /:\*\*/g;
    listItemHTML = listItemHTML.replace(listendpattern, "</b>");

    return listItemHTML;
  }

  function typeWriter() {
    loader.style.display = "none";

    // Function to convert URLs in text to anchor tags
    function convertUrlsToLinks(reposnse) {
      const urlPattern =
        /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;
      return reposnse.replace(
        urlPattern,
        '<a href="$1" target="_blank">$1</a>'
      );
    }

    var convertedText = convertUrlsToLinks(reposnse);
    convertedText = convertToListItems(convertedText);
    convertedText = convertBold(convertedText);
    console.log(reposnse);
    console.log(convertedText);
    if (i < convertedText.length) {
      document.getElementById("chat").innerHTML =
        convertedText.substring(0, i + 1) +
        '<span class="typing-cursor"></span>';
      i++;
      setTimeout(typeWriter, speed);
    } else {
      document.getElementById("chat").innerHTML = convertedText;
    }
  }

  return (
    <div className="section is-large">
      <h1 className="title">Cadet AI</h1>
      <div className="container">
        <div class="field">
          <input
            className="input"
            onChange={(e) => {
              message = e.target.value;
            }}
            onKeyDown={(e) => {
              if (!message == "") {
                if (e.code == "Enter") {
                  console.log("Success")
                  Chat();
                } else{
                  console.log("empty or otherwise")
                }
              }
            }}
          ></input>
        </div>

        <div class="control">
          <button class="button glass-btn" onClick={Chat}>
            Submit
          </button>
        </div>
      </div>

      <div className="glass">
        <div>
          <center>
            <div class="loader2" id="loader"></div>
          </center>
        </div>
        <p className="para content is-white" id="chat"></p>
      </div>
      <div class="notification is-danger">
  The free version of the AI only allows you to ask <strong>15 questions per minute</strong>. Carefull when you are using the quota
</div>
    </div>
  );
}

export default CadetAssistant;
