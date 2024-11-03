var timeline = [];
var timeline_idx = 0;

const make_upcoming = function(timeline_idx) {
    const upcoming_timing = document.createElement('td');
    upcoming_timing.className = "upcoming-timing";
    upcoming_timing.innerText = timeline[timeline_idx][0];
    if (timeline[timeline_idx][0] == "" || timeline[timeline_idx][0] == "即") {
        upcoming_timing.innerText = "即";
    }

    const upcoming_skill = document.createElement('td');
    upcoming_skill.className = "upcoming-skill";
    upcoming_skill.innerText = timeline[timeline_idx][1];

    const upcoming_note = document.createElement('td');
    upcoming_note.className = "upcoming-note";
    upcoming_note.innerText = timeline[timeline_idx][2];

    const upcoming = document.createElement('tr');
    upcoming.className = "upcoming";
    if (timeline[timeline_idx][0] == "" || timeline[timeline_idx][0] == "即") {
        upcoming.className += " hurry";
    }
    upcoming.append(upcoming_timing);
    upcoming.append(upcoming_skill);
    upcoming.append(upcoming_note);
    return upcoming;
}

const update_list = function(timeline_idx) {
    if (timeline_idx >= timeline.length || timeline_idx < 0) return;
    document.getElementById("main-area").innerHTML = "";
    const next_timing = document.createElement('td');
    next_timing.id = "next-timing";
    next_timing.innerText = timeline[timeline_idx][0];
    if (timeline[timeline_idx][0] == "" || timeline[timeline_idx][0] == "即") {
        next_timing.innerText = "即";
    }

    const next_skill = document.createElement('td');
    next_skill.id = "next-skill";
    next_skill.innerText = timeline[timeline_idx][1];

    const next_note = document.createElement('td');
    next_note.id = "next-note";
    next_note.innerText = timeline[timeline_idx][2];

    const next = document.createElement('tr');
    next.id = "next";
    if (timeline[timeline_idx][0] == "" || timeline[timeline_idx][0] == "即") {
        next.className = "hurry";
    }
    next.append(next_timing);
    next.append(next_skill);
    next.append(next_note);
    document.getElementById("main-area").append(next);
    for (var idx = timeline_idx + 1; idx < Math.min(timeline_idx + 5, timeline.length); idx++) {
        document.getElementById("main-area").append(make_upcoming(idx));
    }
}

const init = function() {
    timeline = [];
    timeline_idx = 0;
    const csv = document.getElementById("input").value;
    const lines = csv.split('\n');
    for (const line of lines) {
        if (line == "") continue;
        const words = line.split(',');
        timeline.push([words[0].trim(), words[1].trim(), words.length >= 3 ? words[2].trim() : ""]);
    }
    update_list(timeline_idx);
    timeline_idx++;
    timeline_idx = Math.min(timeline.length, timeline_idx);
}


document.onkeydown = function(e) {
    console.log(e);
    if (e.key == "ArrowLeft" || e.key == "Backspace") {
        timeline_idx -= 2;
        timeline_idx = Math.max(0, timeline_idx);
        update_list(timeline_idx);
        timeline_idx++;
        timeline_idx = Math.min(timeline.length, timeline_idx);
    } else if (e.key == "Enter" || e.key == " " || e.key == "ArrowRight") {
        update_list(timeline_idx);
        timeline_idx++;
        timeline_idx = Math.min(timeline.length, timeline_idx);
    }
}
