const labels={infra:"인프라·운영",model:"모델·추론",practice:"현장 적용"};
const takeawayGrid=document.getElementById("takeaway-grid");
const sessionList=document.getElementById("session-list");
const filter=document.getElementById("filter");

takeawayGrid.innerHTML=takeaways.map((item)=>`<article class="takeaway"><span class="number">${item.number}</span><h3>${item.title}</h3><p>${item.body}</p><small>${item.tags}</small></article>`).join("");

function renderPhoto(photo){
  return `<figure class="session-photo"><a href="./assets/${photo.file}" target="_blank" rel="noopener" aria-label="사진 크게 보기: ${photo.caption}"><img src="./assets/${photo.file}" alt="${photo.alt}" loading="lazy"></a><figcaption>${photo.caption}</figcaption></figure>`;
}

function renderSessions(){
  const selected=filter.value;
  const shown=sessions.filter((session)=>selected==="all"||session.category===selected);
  sessionList.innerHTML=shown.map((session)=>`<article class="session" id="${session.id}">
    <div class="time"><strong>${session.time}</strong><span>${session.duration}</span></div>
    <div class="session-card"><div class="session-meta"><span class="category ${session.category}">${labels[session.category]}</span><span>${session.type}</span><span>SESSION ${String(sessions.indexOf(session)+1).padStart(2,"0")}</span></div>
      <h3>${session.title}</h3><p class="subtitle">${session.subtitle}</p><p class="summary">${session.summary}</p>
      ${renderPhoto(photosBySession[session.id][0])}
      <details><summary>핵심 내용과 사진 펼치기 <span aria-hidden="true">＋</span></summary><div class="details-content"><ul>${session.points.map((point)=>`<li>${point}</li>`).join("")}</ul><div class="question"><span>정리하며 남긴 질문</span><p>${session.question}</p></div>${photosBySession[session.id].length>1?`<div class="more-photos">${photosBySession[session.id].slice(1).map(renderPhoto).join("")}</div>`:""}</div></details>
    </div>
  </article>`).join("");
  if(!shown.length)sessionList.innerHTML='<p class="empty">해당 주제의 세션이 없습니다.</p>';
}
filter.addEventListener("change",renderSessions);
renderSessions();
