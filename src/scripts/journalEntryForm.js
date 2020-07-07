

function journalEntryForm(username){
    return `
    <h1>Welcome ${username}</h1>
    <form id="journal-form">
        <label>Date: </label>
        <input type="date" id="form-date">
        <label>Subject: </label>
        <input type="text" id="form-concept">
        <label>Entry: </label>
        <input type="text" id="form-entry">
        <label>Mood: </label>
        <select id="mood-select">
        <option value="happy">Wonderful</option>
        <option value="great">Great</option>
        <option value="meh">Meh</option>
        <option value="tired">Tired</option>
        <option value="down">Down</option>
    </select>
    <button type="button" id="post-journal-entry">Post</button>
        <input type="radio" id="mood-wonderful" name="wonderful" value="wonderful">
        <label for="wonderful">Wonderful</label><br>
        <input type="radio" id="mood-great" name="great" value="great">
        <label for="great">Great</label><br>
        <input type="radio" id="mood-meh" name="meh" value="meh">
        <label for="meh">Meh</label>
        <input type="radio" id="mood-tired" name="tired" value="tired">
        <label for="tired">Tired</label><br>
        <input type="radio" id="mood-down" name="down" value="down">
        <label for="mood">Down</label>
    </form>`
}
export default journalEntryForm;